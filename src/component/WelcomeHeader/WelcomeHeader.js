import React from 'react';
import {Colors} from 'colors/Colors';
import {AppState, Text, View} from 'react-native';
import BusinessClock from 'assets/newDashboardIcons/business-time.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {
  getEmployeeProfileData,
  getEmployeeShift,
  getTodayCheckInTime,
} from 'redux/homeSlice';
import jwt_decode from 'jwt-decode';
import {ERROR} from 'utils/string';
import ShowAlert from 'customComponents/CustomError';
import styles from './WelcomeHeaderStyles';
import Loader from 'component/loader/Loader';
import {getTimeStringFromObject} from 'utils/utils';

const WelcomeHeader = ({navigation}) => {
  const dispatch = useDispatch();
  const {employeeProfile: profileData = {}} = useSelector(state => state.home);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingCheckInDetails, setLoadingCheckInDetails] = useState(false);
  const [checkInOutDetails, setCheckInOutDetails] = useState({
    isCheckedIn: false,
    isCheckedOut: false,
  });
  // console.log('profileData:', profileData);

  const firstName = profileData?.firstName;
  const middleName = profileData?.middleName;
  const lastName = profileData?.lastName;
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const [checkInDetails, setCheckInDetails] = useState({});
  const [todayStatus, setTodayStatus] = useState(null);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  useEffect(() => {
    (async () => {
      try {
        setLoadingProfile(true);

        const userData =
          token &&
          (await dispatch(
            getEmployeeProfileData({
              token,
              employeeID,
              dispatch,
            }),
          ));

        if (userData?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: userData?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }
      } catch (err) {
        console.log('errorProfile:', err);
      } finally {
        setLoadingProfile(false);
      }
    })();
    // }
  }, [token, dispatch, employeeID, navigation]);

  const handleAppStateChange = useCallback(
    async nextState => {
      if (nextState === 'active' || nextState === true) {
        try {
          setLoadingCheckInDetails(true);
          const checkIn = await dispatch(
            getTodayCheckInTime({
              token,
            }),
          );

          const {payload: checkInOutFullDetails} = checkIn;

          const isCheckedOutAtleastOnce = checkInOutFullDetails.length > 1;

          let lastCheckOutTime = '';
          let isFinalCheckOut = false;

          const lastActivity =
            checkInOutFullDetails[checkInOutFullDetails.length - 1];
          if (isCheckedOutAtleastOnce && lastActivity.attendanceState === 1) {
            isFinalCheckOut = true;
            lastCheckOutTime = getTimeStringFromObject(
              new Date(lastActivity?.time),
            );

            // ================
            const checkInDateObj = new Date(checkInOutFullDetails[0]?.time);
            const totalSpentTime = +(
              new Date(lastActivity?.time) - checkInDateObj
            );

            const hours = +Math.floor(totalSpentTime / (1000 * 60 * 60));
            const minutes = +Math.floor(
              (totalSpentTime % (1000 * 60 * 60)) / (1000 * 60),
            );
            const seconds = +Math.floor((totalSpentTime % (1000 * 60)) / 1000);

            setCheckInDetails({
              hours,
              minutes,
              seconds,
              empMachineCode: +checkIn?.payload[0]?.employeeMachineCode,
            });
          } else {
            const checkInDateObj = new Date(checkIn?.payload[0]?.time);
            const totalSpentTime = +(new Date() - checkInDateObj);

            const hours = +Math.floor(totalSpentTime / (1000 * 60 * 60));
            const minutes = +Math.floor(
              (totalSpentTime % (1000 * 60 * 60)) / (1000 * 60),
            );
            const seconds = +Math.floor((totalSpentTime % (1000 * 60)) / 1000);

            setCheckInDetails({
              hours,
              minutes,
              seconds,
              empMachineCode: +checkIn?.payload[0]?.employeeMachineCode,
            });
          }

          const checkInTimeObj = new Date(checkInOutFullDetails[0]?.time);

          const finalCheckInTimeStr = checkInOutFullDetails[0]?.time
            ? getTimeStringFromObject(checkInTimeObj)
            : undefined;

          setCheckInOutDetails(prevDetails => ({
            ...prevDetails,
            checkIn: finalCheckInTimeStr,
            checkOut: lastCheckOutTime,
            isCheckedIn: checkInOutFullDetails?.length > 0,
            isCheckedOut: isCheckedOutAtleastOnce,
            isFinalCheckOut,
          }));
          if (checkIn?.error) {
            ShowAlert({
              messageHeader: ERROR,
              messageSubHeader: checkIn?.error?.message,
              buttonText: 'Close',
              dispatch,
              navigation,
            });
          }

          const employeeShift = await dispatch(
            getEmployeeShift({token, id: employeeID}),
          );
          console.log('employeeShift:::::', employeeShift);

          const checkedInTimeObj = new Date(checkIn.payload[0]?.time);
          const properInTime = employeeShift?.payload?.startTime;

          const [properInHours, properInMinutes, properInSeconds] =
            properInTime.split(':');

          const properCheckInTimeStamp = new Date().setHours(
            properInHours,
            properInMinutes,
            properInSeconds,
          );
          // 2023-08-16T10:04:43

          const checkedInTimeStamp = checkedInTimeObj.getTime();
          const differenceInTime = Math.abs(
            checkedInTimeStamp - properCheckInTimeStamp,
          );

          const lateHours =
            Math.floor(differenceInTime / (1000 * 60 * 60)) > 9
              ? Math.floor(differenceInTime / (1000 * 60 * 60))
              : Math.floor(differenceInTime / (1000 * 60 * 60))
              ? '0' + Math.floor(differenceInTime / (1000 * 60 * 60))
              : '00';
          const lateMinutes =
            Math.floor((differenceInTime % (1000 * 60 * 60)) / (1000 * 60)) > 9
              ? Math.floor((differenceInTime % (1000 * 60 * 60)) / (1000 * 60))
              : Math.floor((differenceInTime % (1000 * 60 * 60)) / (1000 * 60))
              ? '0' +
                Math.floor((differenceInTime % (1000 * 60 * 60)) / (1000 * 60))
              : '00';
          const lateSeconds =
            Math.floor((differenceInTime % (1000 * 60)) / 1000) > 9
              ? Math.floor((differenceInTime % (1000 * 60)) / 1000)
              : Math.floor((differenceInTime % (1000 * 60)) / 1000)
              ? '0' + Math.floor((differenceInTime % (1000 * 60)) / 1000)
              : '00';

          setTodayStatus({
            lateHours,
            lateMinutes,
            lateSeconds,
            isLate: checkedInTimeStamp - properCheckInTimeStamp > 0,
          });

          if (checkIn.error) {
            throw new Error('Time not found.');
          }
        } catch (err) {
          console.log('erroor:', err);
        } finally {
          setLoadingCheckInDetails(false);
        }
      }
    },
    [dispatch, employeeID, token, navigation],
  );

  useEffect(() => {
    AppState &&
      AppState?.addEventListener &&
      AppState?.addEventListener('change', handleAppStateChange);
    return () => {
      AppState &&
        AppState.removeEventListener &&
        AppState?.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (!isGuestLogin) {
      handleAppStateChange(true);
    }
  }, [handleAppStateChange, isGuestLogin]);

  useEffect(() => {
    if (!isGuestLogin && !checkInOutDetails.isFinalCheckOut) {
      if (checkInDetails.hours !== undefined) {
        const timer = setInterval(() => {
          let currentSeconds = checkInDetails.seconds;
          let currentMinutes = checkInDetails.minutes;
          let currentHours = checkInDetails.hours;
          if (currentSeconds === 59 && currentMinutes !== 59) {
            currentSeconds = 0;
            currentMinutes += 1;
          } else if (currentSeconds === 59 && currentMinutes === 59) {
            currentSeconds = 0;
            currentMinutes = 0;
            currentHours += 1;
          } else {
            currentSeconds += 1;
          }

          setCheckInDetails(currentCheckInDetails => ({
            ...currentCheckInDetails,
            hours: currentHours,
            minutes: currentMinutes,
            seconds: currentSeconds,
          }));
        }, 1000);

        return () => {
          clearInterval(timer);
        };
      }
    }
  }, [checkInDetails, isGuestLogin, checkInOutDetails.isFinalCheckOut]);

  const userName = `${firstName ? firstName : ''} ${
    middleName ? middleName + ' ' : ''
  }${lastName ? lastName : ''}`;

  const todayDateObject = new Date();
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, </Text>
        <Text style={styles.nameText}>
          {isGuestLogin ? 'Guest' : userName || 'N/A'}
        </Text>
        {/* <Text style={styles.nameText}> {userName || 'N/A'}</Text> */}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.headingContainer}>
          <BusinessClock height={22} width={22} marginRight={16} />
          <Text style={styles.timeText}>Total Work Time</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {checkInDetails?.hours < 10
              ? `0${checkInDetails?.hours}`
              : checkInDetails?.hours || '00'}{' '}
            :{' '}
            {checkInDetails?.minutes < 10
              ? `0${checkInDetails?.minutes}`
              : checkInDetails?.minutes || '00'}{' '}
            :{' '}
            {checkInDetails?.seconds < 10
              ? `0${checkInDetails?.seconds}`
              : checkInDetails?.seconds || '00'}{' '}
            Hrs
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dayMonthText}>
            {daysOfWeek[todayDateObject.getDay()]},{' '}
            {todayDateObject.toLocaleString('en-US', {month: 'short'})}{' '}
          </Text>
          <Text style={styles.dateYearText}>
            {todayDateObject?.getDate()}, {todayDateObject.getFullYear()}
          </Text>
        </View>
        {checkInDetails?.empMachineCode !== 0 ? (
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>
              Noida Sector 62, Uttar Pradesh
            </Text>
          </View>
        ) : null}
        <View style={styles.lateContainer}>
          <Text
            style={[
              styles.lateText,
              {color: todayStatus?.isLate ? Colors.gold : Colors.green},
            ]}>
            {todayStatus?.isLate ? 'Late' : 'Early'} by{' '}
            {`${!isGuestLogin ? todayStatus?.lateHours || '00' : '00'}:${
              !isGuestLogin ? todayStatus?.lateMinutes || '00' : '00'
            }:${todayStatus?.lateSeconds || '00'}`}{' '}
            hours
          </Text>
        </View>
        <View style={styles.checkInOutContainer}>
          <View>
            <Text style={styles.checkInOutTitle}>Check In Time:</Text>
            <Text style={styles.checkInTime}>
              {checkInOutDetails?.checkIn || 'N/A'}
            </Text>
          </View>
          <View>
            <Text style={styles.checkInOutTitle}>Check Out Time:</Text>
            <Text style={styles.checkOutTime}>
              {checkInOutDetails?.checkOut || 'N/A'}
            </Text>
          </View>
        </View>
      </View>
      {loadingProfile ? <Loader /> : null}
    </View>
  );
};

export default WelcomeHeader;
