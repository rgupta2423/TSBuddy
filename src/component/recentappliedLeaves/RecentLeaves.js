import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {guestLeavesData} from 'guestData';
import styles from './RecentLeavesStyles';
import {FontFamily} from 'constants/fonts';
import {Colors} from 'colors/Colors';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import ApprovedIcon from 'assets/newDashboardIcons/circle-check.svg';
import RejectedIcon from 'assets/newDashboardIcons/ban.svg';
import PendingIcon from 'assets/newDashboardIcons/circle-minus.svg';
import {widthPercentageToDP as wp} from 'utils/Responsive';
import {useIsFocused} from '@react-navigation/native';
import {getLeaveDetails} from 'redux/homeSlice';
import jwt_decode from 'jwt-decode';

const RecentLeaves = ({navigation}) => {
  const [showLeaveType, setShowLeaveType] = useState('leaves');
  const [recent3Leaves, setRecent3Leaves] = useState([]);
  const [recent3WFH, setRecent3WFH] = useState([]);
  const dispatch = useDispatch();

  const {isGuestLogin: isGuestLogin, userToken: token} = useSelector(
    state => state.auth,
  );

  const decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

  const isFocussed = useIsFocused();

  useEffect(() => {
    if (!isGuestLogin) {
      if (isFocussed) {
        try {
          (async () => {
            let leavesCount = 0;
            let wfhCount = 0;

            const leavesData = await dispatch(
              getLeaveDetails({
                token,
                empID: employeeID,
              }),
            );

            const leavesList = [];
            const wfhList = [];

            leavesData.payload?.map(leave => {
              if (leave?.leaveType?.toLowerCase() === 'work from home') {
                wfhList.push(leave);
              } else {
                leavesList.push(leave);
              }
            });

            const sortedWfhList = wfhList?.sort(
              (a, b) => new Date(b?.postingDate) - new Date(a?.postingDate),
            );

            const sortedLeaveList = leavesList?.sort(
              (a, b) => new Date(b?.postingDate) - new Date(a?.postingDate),
            );

            const final3Leaves = sortedLeaveList?.filter(leave => {
              if (
                leave?.leaveType?.toLowerCase() !== 'work from home' &&
                leavesCount < 3
              ) {
                leavesCount++;
                return true;
              }
            });

            setRecent3Leaves(final3Leaves);
            const final3WFH = sortedWfhList?.filter(leave => {
              if (
                leave?.leaveType?.toLowerCase() === 'work from home' &&
                wfhCount < 3
              ) {
                wfhCount++;
                return true;
              }
            });

            setRecent3WFH(final3WFH);
          })();
        } catch (err) {
          console.log('errLeaves:', err);
        }
      }
    }
  }, [isFocussed, isGuestLogin, token, dispatch, employeeID]);

  return (
    <View style={{paddingHorizontal: 18, paddingBottom: wp(6)}}>
      <View style={styles.container}>
        <Text style={styles.recentText}>
          {showLeaveType === 'leaves'
            ? 'Recent Leaves Applied'
            : 'Recent WFH Applied'}
        </Text>
        <Pressable
          onPress={() => {
            setShowLeaveType(leaveType =>
              leaveType === 'leaves' ? 'wfh' : 'leaves',
            );
          }}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            {showLeaveType === 'leaves' ? 'WFH' : 'Leaves'}
          </Text>
        </Pressable>
      </View>
      {isGuestLogin ? (
        guestLeavesData.map((item, index) => {
          return renderItem({item, index});
        })
      ) : (showLeaveType === 'leaves' && recent3Leaves?.length) > 0 ? (
        recent3Leaves.map((item, index) => {
          return renderItem({item, index});
        })
      ) : (showLeaveType === 'wfh' && recent3WFH?.length) > 0 ? (
        recent3WFH.map((item, index) => {
          return renderItem({item, index});
        })
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: FontFamily.RobotoMedium,
              fontSize: 16,
              color: Colors.lightBlue,
              marginVertical: 4,
            }}>
            Recent {showLeaveType === 'leaves' ? 'Leaves' : 'WFH'} not found.
          </Text>
        </View>
      )}
    </View>
  );
};
const renderItem = ({item, index}) => {
  return (
    <View key={index} style={styles.imageView}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>
            {item?.totalLeaveDays > 9 || item?.totalLeaveDays < 1
              ? +item?.totalLeaveDays
              : `0${item?.totalLeaveDays}`}
          </Text>
          <Text>{item?.totalLeaveDays > 1 ? 'Days' : 'Day'}</Text>
        </View>
        <View style={styles.typeDateContainer}>
          <Text
            style={[
              styles.leaveTypeText,
              {
                color:
                  item.status?.toLowerCase() === 'open'
                    ? Colors.gold
                    : item.status?.toLowerCase() === 'dismissed' ||
                      item.status?.toLowerCase() === 'rejected'
                    ? Colors.darkBrown
                    : Colors.darkLovelyGreen,
              },
            ]}>
            {item?.leaveType || 'Earned Leave'}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CalenderIcon height={11} width={11} marginRight={8} />
            <Text style={styles.dateText}>
              {`${new Date(item.fromDate).toLocaleString('default', {
                month: 'short',
              })} ${new Date(item.fromDate).getDate()}, ${new Date(
                item?.fromDate,
              ).getFullYear()}`}
              {'  '}
              to{'  '}
              {`${new Date(item.toDate).toLocaleString('default', {
                month: 'short',
              })} ${new Date(item.toDate).getDate()}, ${new Date(
                item?.toDate,
              ).getFullYear()}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {item.status?.toLowerCase() === 'open' ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <PendingIcon
              fill={Colors.gold}
              height={20}
              width={20}
              marginBottom={4}
            />
            <Text style={{fontSize: 12, color: Colors.gold}}>Pending</Text>
          </View>
        ) : item.status?.toLowerCase() === 'dismissed' ||
          item.status?.toLowerCase() === 'rejected' ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <RejectedIcon
              fill={Colors.darkBrown}
              height={20}
              width={20}
              marginBottom={4}
            />
            <Text style={{fontSize: 12, color: Colors.darkBrown}}>
              {item.status}
            </Text>
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ApprovedIcon
              fill={Colors.darkLovelyGreen}
              height={20}
              width={20}
              marginBottom={4}
            />
            <Text style={{fontSize: 12, color: Colors.darkLovelyGreen}}>
              {item.status || 'Approved'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RecentLeaves;
