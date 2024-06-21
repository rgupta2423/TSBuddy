import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  SafeAreaView,
} from 'react-native';

import Modal from 'react-native-modal';

import {widthPercentageToDP as wp} from 'utils/Responsive';
import styles from './AttendenceStyle';
import {CalendarList} from 'react-native-calendars';
import {Colors} from 'colors/Colors';
import {getAttendencaeData} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {attendenceMonthImages} from 'defaultData';
import {ERROR} from 'constants/strings';
import ShowAlert from 'customComponents/CustomError';
import {
  attendanceDate,
  finalCurrentDate,
  startEndDateFormat,
  todaySelectedDate,
} from 'utils/utils';
import {LeavesSeparate, RegularzitionScreen} from 'navigation/Route';
import Loader from 'component/loader/Loader';
import CombineHeader from 'component/header/CombineHeader';

const DATA = [
  {
    id: '1',
    title: 'Absent',
    color: Colors.reddishTint,
  },
  {
    id: '2',
    title: 'Half Day',
    color: Colors.blue,
  },
  {
    id: '3',
    title: 'Holiday',
    color: Colors.pink,
  },
  {
    id: '4',
    title: 'Present',
    color: Colors.green,
  },
];

const Attendence = ({navigation}) => {
  const {attendenceData: dailyAttendance = []} = useSelector(
    state => state.home,
  );

  const {holidayData: holidaysData = []} = useSelector(state => state.home);

  const [visisbleMonth, setVisibleMonth] = useState(0);
  const [visibleYear, setVisibleYear] = useState(0);
  const [remainingHours, setRemainingHours] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [showDailyStatusModal, setShowDailyStatusModal] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [pressedDayDate, setPressedDayDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [finalWeekTime, setFinalWeekTime] = useState('00:00');

  const {currentDay: todaysDay, finalTodayDate: todaysDate} =
    finalCurrentDate();

  useEffect(() => {
    const pressedDate = dailyAttendance?.find(
      date =>
        new Date(date?.attendanceDate)?.getDate() ===
        new Date(modalDate?.dateString).getDate(),
    );

    const inTimeHours = new Date(pressedDate?.inTime)?.getHours();
    const outTimeHours = new Date(pressedDate?.outTime)?.getHours();
    const inTimeMinutes = new Date(pressedDate?.inTime)?.getMinutes();
    const outTimeMinutes = new Date(pressedDate?.outTime)?.getMinutes();

    const inTime =
      inTimeHours +
      ':' +
      (inTimeMinutes < 10 ? '0' + inTimeMinutes : inTimeMinutes);
    const outTime =
      outTimeHours +
      ':' +
      (outTimeMinutes < 10 ? '0' + outTimeMinutes : outTimeMinutes);

    const pressedDateObj = {
      inTime,
      outTime,
      totalHours: pressedDate?.totalHours,
    };
    setPressedDayDate(pressedDateObj);

    return () => {};
  }, [showDailyStatusModal, dailyAttendance, modalDate?.dateString]);

  const dispatch = useDispatch();
  const {userToken: token, isGuestLogin} = useSelector(state => state.auth);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  // function getDaysInMonth(monthIndex) {
  //   const date = new Date(new Date().getFullYear(), monthIndex, 1);
  //   date.setMonth(date.getMonth() + 1);
  //   date.setDate(date.getDate() - 1);
  //   return date.getDate();
  // }

  const getAttandanceData = useCallback(async () => {
    if (employeeID && token) {
      try {
        if (visisbleMonth > 0 || visibleYear > 0) {
          setLoading(true);
          const attendence = await dispatch(
            getAttendencaeData({
              token,
              employeeID,
              visisbleMonth,
              visibleYear,
            }),
          );
          if (attendence?.error) {
            ShowAlert({
              messageHeader: ERROR,
              messageSubHeader: attendence?.error?.message,
              buttonText: 'Close',
              dispatch,
              navigation,
            });
          }
        }
      } catch (err) {
        console.log('errAttendance:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [dispatch, navigation, employeeID, token, visibleYear, visisbleMonth]);

  useEffect(() => {
    getAttandanceData();
    // const timer = setTimeout(() => {
    //   fetchData();
    // }, 100);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [visisbleMonth, getAttandanceData]);

  const startEndDate = () => {
    let start = attendanceDate(1);
    let end = attendanceDate(7);
    return {start, end};
  };

  useEffect(() => {
    const {start, end} = startEndDate();
    let startDateFormat = startEndDateFormat(start);
    let endDateFormat = startEndDateFormat(end);

    setStartDate(startDateFormat);
    setEndDate(endDateFormat);

    let privMonDAy = new Date();
    privMonDAy.setDate(privMonDAy.getDate() - ((privMonDAy.getDay() + 6) % 7));
    var now = new Date();
    const todayDateIndex = now.getDay();
    const todayDate = now.getDate();

    let weekDays = [];

    for (let i = 1; i < todayDateIndex; i++) {
      let dayValue = todayDate - i;
      weekDays.push(dayValue);
    }

    console.log('weekDays:', todayDateIndex);

    let thisWeekDays = [];

    for (let val of dailyAttendance) {
      let {attendance} = val;
      const attendanceDateValue = new Date(attendance).getDate();
      if (weekDays.includes(attendanceDateValue)) {
        thisWeekDays.push(val);
      }
    }

    let thisWeekHours = 0;
    let thisWeekExtraMinutes = 0;

    for (let day of thisWeekDays) {
      const timeStr = day?.totalHours + '';
      let [hours, minutes] = timeStr?.split('.');

      if (day?.attendanceType !== 'A') {
        if (minutes?.length === 1) {
          minutes = minutes + 0;
        }

        thisWeekHours += +hours;
        thisWeekExtraMinutes += +minutes;
      }
    }

    const remainingWeekHours = Math.floor(thisWeekExtraMinutes / 60);
    let finalMinutes = thisWeekExtraMinutes % 60;

    thisWeekHours += remainingWeekHours;

    // finalWeekTime = `${thisWeekHours}:${finalMinutes}`;
    setFinalWeekTime(
      `${thisWeekHours < 10 ? `0${thisWeekHours}` : thisWeekHours}:${
        finalMinutes < 10 ? `0${finalMinutes}` : finalMinutes
      }`,
    );

    const minutesShouldHaveCompleted = (todayDateIndex - 1) * 9 * 60;
    const minutesCompleted = thisWeekHours * 60 + finalMinutes;

    if (minutesShouldHaveCompleted <= minutesCompleted) {
      const extraTotalMinutes = minutesCompleted - minutesShouldHaveCompleted;
      const extraHours = Math.floor(extraTotalMinutes / 60);
      const extraMinutes = extraTotalMinutes % 60;
      setRemainingHours(
        // totalHoursSpendInWeek ? totalHoursSpendInWeek.toFixed(2) : '00.00',
        {
          isExtra: true,
          extraTime: `${extraHours}:${extraMinutes}`,
        },
      );
    } else {
      const remainingTotalMinutes =
        minutesShouldHaveCompleted - minutesCompleted;
      const hoursLeft = Math.floor(remainingTotalMinutes / 60);
      const minutesLeft = remainingTotalMinutes % 60;
      setRemainingHours({
        isExtra: false,
        extraTime: `-${hoursLeft}:${minutesLeft}`,
      });
    }
  }, [dailyAttendance]);

  let monthMark = {};
  let todayDate = todaySelectedDate();

  monthMark = {
    ...monthMark,
    [todayDate]: {selected: true, selectedColor: Colors.parrotGreenLight},
  };

  let holidayDate;
  holidaysData &&
    holidaysData?.length &&
    holidaysData?.forEach(day => {
      holidayDate = day.holidayDate.split('T')[0];
      if (holidayDate) {
        monthMark[holidayDate] = {
          selectedColor: Colors.pink,
          selected: true,
        };
      }
    });

  dailyAttendance &&
    dailyAttendance.length &&
    dailyAttendance?.forEach(day => {
      let date = day?.attendanceDate?.split('T')[0];
      if (day.attendanceType === 'H') {
        monthMark[date] = {
          selectedColor: Colors.lightBlue,
          selected: true,
        };
      } else if (day.attendanceType === 'A') {
        monthMark[date] = {
          selectedColor: Colors.reddishTint,
          selected: true,
        };
      } else if (day.attendanceType === 'F') {
        monthMark[date] = {
          selectedColor: Colors.parrotGreen,
          dotColor: Colors.green,
          selected: true,
        };
      }
    });

  let mark = monthMark;

  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.renderItemMainContainer}>
        <View
          style={[
            styles.attTypeNotation,
            {
              backgroundColor:
                item.title === 'Absent'
                  ? Colors.reddishTint
                  : item.title === 'Half Day'
                  ? Colors.blue
                  : item.title === 'Present'
                  ? Colors.green
                  : Colors.pink,
              marginRight: wp(1.6),
            },
          ]}
        />
        <Text style={styles.attType}>{item.title}</Text>
      </View>
    );
  }, []);

  const rightClickHandler = () => {
    navigation.navigate(LeavesSeparate);
  };

  return (
    <>
      <CombineHeader
        isFirstComponent={true}
        isLastComponent={false}
        navigation={navigation}
        title="Attendance"
        rightClickHandler={rightClickHandler}
      />
      {/* <CustomHeader
        showDrawerMenu={true}
        title="Attendance"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
        // name="LeavesScreeen"
      /> */}
      <SafeAreaView style={styles.container}>
        <ImageBackground
          resizeMode="stretch"
          // onLoadStart={() => setImageLoading(true)}
          // onLoadEnd={() => setImageLoading(false)}
          source={attendenceMonthImages[visisbleMonth]}
          style={styles.backgroundImg}>
          {showDailyStatusModal ? (
            <Modal
              style={styles.clickedDateModal}
              animationType="slide"
              transparent={true}
              closeOnClick={true}
              visible={showDailyStatusModal}
              onBackdropPress={() => {
                setShowDailyStatusModal(false);
              }}
              onBackButtonPress={() => {
                setShowDailyStatusModal(false);
              }}>
              <View style={styles.modalContainer}>
                <Text style={styles.text1}>
                  In Time: {isGuestLogin ? '00:00' : pressedDayDate?.inTime}
                </Text>
                <Text style={styles.text1}>
                  Out Time: {isGuestLogin ? '00:00' : pressedDayDate?.outTime}
                </Text>
                <View style={styles.imageView}>
                  <Text>
                    Total Hours:{' '}
                    {isGuestLogin ? '00:00' : pressedDayDate?.totalHours}
                  </Text>
                </View>
              </View>
            </Modal>
          ) : null}
          <View style={styles.weeklyReport}>
            {/* {isImageLoading ? renderLoading() : null}    */}
            <View style={styles.secondContainer}>
              <View>
                <Text style={styles.monthText}>{todaysDate}</Text>
                <Text style={styles.dayText}>{todaysDay}</Text>
              </View>
              <View style={styles.reportView}>
                <View style={styles.weekliyTextView}>
                  <Text style={styles.reportText}>Weekly Report</Text>
                  <Text style={styles.reportText}>
                    {startDate} - {endDate}
                  </Text>
                </View>
                <View style={styles.timeSpendView}>
                  <Text style={styles.timeSpendText}>
                    Total Hour Spend {finalWeekTime}
                    <Text
                      style={{
                        color: remainingHours?.isExtra
                          ? Colors.green
                          : Colors.reddishTint,
                      }}>
                      ({remainingHours?.extraTime})
                    </Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.attTypes}>
              <FlatList
                data={DATA}
                horizontal={true}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ImageBackground>
        <View style={styles.calenderContainer}>
          <RenderCalender
            setVisibleMonth={setVisibleMonth}
            setVisibleYear={setVisibleYear}
            mark={mark}
            setShowDailyStatusModal={setShowDailyStatusModal}
            setModalDate={setModalDate}
            navigation={navigation}
            dailyAttendance={dailyAttendance}
            isLoading={isLoading}
            holidaysData={holidaysData}
            visibleYear={visibleYear}
            visisbleMonth={visisbleMonth}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const RenderCalender = ({
  setVisibleMonth,
  setVisibleYear,
  mark,
  setShowDailyStatusModal,
  setModalDate,
  navigation,
  dailyAttendance,
  isLoading,
  holidaysData,
  visisbleMonth,
  visibleYear,
}) => {
  return (
    <>
      <CalendarList
        markingType={'dot'}
        onDayPress={day => {
          const isCurrentDatePressed =
            day.year === new Date().getFullYear() &&
            day.month === new Date().getMonth() + 1 &&
            day.day === new Date().getDate();

          // const dateObj = new Date(day?.dateString);
          // const dayIndex = dateObj.getDay();
          // const isWeekend = dayIndex === 0 || dayIndex === 6;
          const pressedDate = day.day;
          const pressedMonth = day.month;
          const pressedYear = day.year;

          let isHoliday = false;

          holidaysData?.forEach(holiday => {
            const {holidayDate} = holiday;
            const holidayDateObj = new Date(holidayDate);
            const holidayMonth = holidayDateObj.getMonth() + 1;
            const holidayYear = holidayDateObj.getFullYear();
            const holidayDateNum = holidayDateObj.getDate();
            if (
              holidayMonth === pressedMonth &&
              holidayDateNum === pressedDate &&
              holidayYear === pressedYear
            ) {
              isHoliday = true;
            }
          });

          if (isHoliday) {
            return;
          }
          if (Date.now() < day.timestamp || isCurrentDatePressed) {
            return;
          }
          let filterData = dailyAttendance?.filter(element => {
            let date = element?.attendanceDate?.split('T')[0];
            return date === day.dateString;
          });
          let attendanceId = filterData[0]?.attendanceId;
          let attDate = filterData[0]?.attendanceDate;

          if (
            filterData[0]?.attendanceType === 'H' ||
            (filterData[0]?.attendanceType === 'A' &&
              filterData[0].attendanceId)
          ) {
            navigation.navigate(RegularzitionScreen, {
              attendanceId,
              attDate,
            });
          } else {
            setShowDailyStatusModal(true);
            setModalDate(day);
          }
        }}
        // displayLoadingIndicator={true}
        horizontal={true}
        // markingType={'custom'}
        scrollEnabled={true}
        animateScroll={true}
        showScrollIndicator={false}
        pagingEnabled={true}
        onVisibleMonthsChange={months => {
          setVisibleMonth(months[0]?.month);
          setVisibleYear(months[0]?.year);
        }}
        pastScrollRange={100}
        markedDates={mark}
        calendarStyle={styles.calendarStyle}
        theme={{
          'stylesheet.calendar-list.main': {
            calendar: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
          'stylesheet.calendar.header': {
            partialHeader: {
              backgroundColor: Colors.blue,
              paddingHorizontal: 15,
            },

            headerContainer: {
              flexDirection: 'row',
              width: '100%',
              backgroundColor: Colors.green,
              justifyContent: 'center',
            },
            week: {
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: Colors.green,
              fontWeight: 'bold',
              fontSize: 16,
              color: Colors.white,
            },
            header: {
              width: '100%',
              backgroundColor: Colors.green,
              color: Colors.white,
              alignItems: 'center',
            },

            monthText: {
              color: Colors.white,
              fontWeight: 'bold',
              fontSize: 18,
              marginVertical: 10,
              // marginHorizontal: 100,
              textAlign: 'center',
            },
            monthHeader: {
              // width: '120%',
              justifyContent: 'center',
              alignItems: 'center',
            },
            calendarStyle: {
              flex: 1,
              backgroundColor: Colors.white,
            },
          },
        }}
        style={{
          container: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      />
      {isLoading ? <Loader /> : null}
    </>
  );
};

export default Attendence;
