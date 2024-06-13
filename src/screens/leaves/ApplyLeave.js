import {MonthImages} from 'assets/monthImage/MonthImage';
import {Colors} from 'colors/Colors';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import jwt_decode from 'jwt-decode';
import DropDownPicker from 'react-native-dropdown-picker';

import {widthPercentageToDP as wp} from 'utils/Responsive';
import styles from './ApplyLeaveStyle';

import {
  newDropDownOptions,
  none,
  firstFalf,
  secondHalf,
  halfDayStr,
} from 'utils/defaultData';

import {
  applyForLeave,
  applyForUpdateedLeave,
  getAllEmployeesForHR,
  getEmployeesByLeaveApprover,
  getFinalizedLeaveDays,
  getLeaveApprovers,
  getRemainingLeavesByEmpId,
  getResourseLeaveDetails,
  updateLeaveStatus,
} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
// import {guestProfileData} from 'guestData';
import CustomHeader from 'navigation/CustomHeader';
import ShowAlert from 'customComponents/CustomError';
import {ERROR, LEAVE_APPROVER_FAIL_FETCH} from 'utils/string';
import {
  getCurrentFiscalYear,
  getDaysBetweenDates,
  sortArrayOfObjectsOnProperty,
} from 'utils/utils';
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function getMonthIndex(shortForm) {
  const index =
    months.findIndex(
      month => month.toLowerCase() === shortForm?.toLowerCase(),
    ) + 1;
  return index;
}
const invalidDate = 'Invalid Date';
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weekoffsFetchFailed = 'Cannot fetch weekoffs for you. Kindly try later.';
const earnedLeave = 'Earned Leave';

const ApplyLeave = ({navigation, route = {}, fromApproverEnd = false}) => {
  const isApplyingLeave = route?.params?.applyLeave;
  const hasToPop = route?.params?.hasToPop;

  const {
    employeeShift: employeeShiftDataObj,
    leavesData,
    leaveMenuDetails,
    holidayData,
  } = useSelector(state => state.home);
  const {isGuestLogin: isGuestLogin, userToken: token} = useSelector(
    state => state.auth,
  );

  const isHalfDay = route?.params?.halfDay;

  const {openLeavesCount} = route?.params || {};
  const dateOptions = {day: 'numeric', month: 'short', year: 'numeric'};
  const fromResource = route?.params?.fromResource || false;
  const fromWfh = route?.params?.fromWfh;

  const fromOpenLeave = route?.params?.fromOpenLeave || false;
  const resourceEmployeeID = route?.params?.resourceEmployeeID || false;
  const isEditOpenleave = false;

  const resourceData = route?.params;
  const openLeaveData = route?.params;
  const postingDateObj = new Date(resourceData?.postingDate);
  const toDateObj = new Date(resourceData?.toDate);

  const openLeavFromDateObj = new Date(openLeaveData?.fromDate);
  const openLeaveToDateObj = new Date(openLeaveData?.toDate);
  const openLeaveType = openLeaveData?.leaveType;
  const openLeaveNumberOfDays = openLeaveData?.totalLeaveDays;
  const openLeavePostingDateObj = new Date(openLeaveData?.postingDate);
  const openLeaveReason = openLeaveData?.description;
  const openLeaveApplicationId = openLeaveData?.leaveApplicationId;

  const fiscalYear = getCurrentFiscalYear();

  const openLeaveApproverEmail = openLeaveData?.leaveApprover;

  const openLeaveFromDatestr = openLeavFromDateObj.toLocaleDateString(
    'en-US',
    dateOptions,
  );
  const openLeaveTooDatestr = openLeaveToDateObj.toLocaleDateString(
    'en-US',
    dateOptions,
  );

  const openLeavePostingDateStr = openLeavePostingDateObj.toLocaleDateString(
    'en-US',
    dateOptions,
  );

  const postingDateStr = postingDateObj?.toLocaleDateString(
    'en-US',
    dateOptions,
  );

  const toDatestr = toDateObj.toLocaleDateString('en-US', dateOptions);
  const resourceHalfDay = route?.params?.halfDay;

  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  const remainingLeaves = leaveMenuDetails?.remainingLeaves || [];
  const earnedLeaves = remainingLeaves[0] || {};
  const restrictedLeaves = remainingLeaves[1] || {};

  const [allRemainingLeaves, setAllRemainingLeaves] = useState(
    leaveMenuDetails.remainingLeaves || [],
  );

  let leaveTypesItems = allRemainingLeaves.map(leave => ({
    value: leave.leaveType,
    label: leave.leaveType,
  }));

  leaveTypesItems = leaveTypesItems.filter(
    (item, index, self) =>
      index === self.findIndex(obj => obj.value === item.value),
  );

  const [fromCalenderVisible, setFromCalenderVisible] = useState(false);
  const [toCalenderVisible, setToCalenderVisible] = useState(false);
  const [fromDate, setFromDate] = useState({
    fromDateStr:
      openLeaveFromDatestr === invalidDate ? '' : openLeaveFromDatestr,
  });

  const [toDate, setToDate] = useState({
    toDateStr: openLeaveTooDatestr === invalidDate ? '' : openLeaveTooDatestr,
  });
  const [totalNumberOfLeaveDays, setTotalNumberOfLeaveDays] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({leaveType: ''});
  const [halfDay, setHalfDay] = useState('');
  const [reason, setReason] = useState(openLeaveReason || '');
  const [openLeaveApprovers, setOpenLeaveApproovers] = useState(false);
  const [isLeaveTypeOpen, setIsLeaveTypeOpen] = useState(false);
  const [isHalfDayOpen, setIsHalfDayOpen] = useState(false);
  const [selectLeaveTypeValue, setSelectLeaveTypeValue] = useState('');
  const [selectHalfDayValue, setSelectHalfDayValue] = useState('');
  const [openResourcePicker, setOpenResourcePicker] = useState(false);
  const [leaveApproversValue, setLeaveApproversValue] = useState(null);

  const [resourcePickedId, setResourcePickedId] = useState(null);
  const [leaveApproversList, setLeaveApproversList] = useState([]);
  const [resourcePicks, setResourcePicks] = useState([]);

  const [employeeWeekOffs, setEmployeeWeekOffs] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);

  const getLAs = useCallback(
    async empId => {
      try {
        const leaveApproversFetched = token
          ? await dispatch(getLeaveApprovers({token, employeeID: empId}))
          : [];

        const uniqueNamesSet = new Set();
        const uniqueObjects = leaveApproversFetched?.payload.filter(obj => {
          if (!uniqueNamesSet.has(obj.employeeId)) {
            uniqueNamesSet.add(obj.employeeId);
            return true;
          }
          return false;
        });

        if (!leaveApproversFetched.payload) {
          alert(LEAVE_APPROVER_FAIL_FETCH);
        }

        const listOfLeaveApprovers = uniqueObjects.map(approver => {
          return {
            value: `${approver?.leaveApprover}`,
            label: `${
              approver.leaveApproverFirstName
                ? approver.leaveApproverFirstName + ' '
                : ''
            }${
              approver.leaveApproverMiddleName
                ? approver.leaveApproverMiddleName + ' '
                : ''
            }${approver.leaveApproverLastName || ''}`,
          };
        });

        setLeaveApproversList(listOfLeaveApprovers);
        setLeaveApproversValue(listOfLeaveApprovers[0].value);
      } catch (err) {
        console.log('errMap:', err);
      }
    },
    [dispatch, token],
  );

  useEffect(() => {
    if (!isGuestLogin) {
      if (fromResource || fromWfh) {
        (async () => {
          // const empId = +resourceEmployeeID.match(/\d+/g)[0];
          const empId = resourceEmployeeID;
          const remLeaves = await dispatch(
            getResourseLeaveDetails({token, id: empId}),
          );
          setAllRemainingLeaves(remLeaves?.payload);
        })();
      }
    }

    if (!isGuestLogin && !fromApproverEnd && !fromOpenLeave) {
      (async () => {
        await getLAs(employeeID);
      })();
    }
  }, [
    dispatch,
    isGuestLogin,
    fromResource,
    fromWfh,
    resourceEmployeeID,
    token,
    getLAs,
    employeeID,
    fromApproverEnd,
    fromOpenLeave,
  ]);

  useEffect(() => {
    if (fromApproverEnd && !isGuestLogin) {
      (async () => {
        try {
          const {role} = decoded;
          const isHRManager = role.includes('HR Manager');
          setLoading(true);
          const employeeData = await dispatch(
            isHRManager
              ? getAllEmployeesForHR({token})
              : getEmployeesByLeaveApprover(token),
          );

          let finalResources;
          if (isHRManager) {
            finalResources = employeeData?.payload?.map(employee => {
              const empName = employee.employee.split('/')[1].trim();
              return {value: employee.employeeId, label: empName, employee};
            });
          } else {
            finalResources = employeeData?.payload?.map(employee => {
              const empName = `${
                employee.firstName ? employee.firstName + ' ' : ''
              }${employee.middleName ? employee.middleName + ' ' : ''}${
                employee.lastName ? employee.lastName + ' ' : ''
              }`;

              return {value: employee.employeeId, label: empName, employee};
            });
          }

          finalResources = sortArrayOfObjectsOnProperty(
            finalResources,
            'label',
          );

          setResourcePicks(finalResources);
          if (employeeData?.error) {
            ShowAlert({
              messageHeader: ERROR,
              messageSubHeader: employeeData?.error?.message,
              buttonText: 'Close',
              dispatch,
              navigation,
            });
          }
        } catch (err) {
          console.log('errFetchResources:', err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [dispatch, navigation, token, fromApproverEnd, isGuestLogin]);

  useEffect(() => {
    if (!isGuestLogin) {
      (async () => {
        try {
          const weekOffs = employeeShiftDataObj?.weeklyOff.split('_');
          // console.log('weekOffs:', weekOffs);

          const finalWeekOffs = [];
          daysOfWeek?.map((el, index) => {
            if (weekOffs.includes(el)) {
              finalWeekOffs.push(index);
            }
          });
          setEmployeeWeekOffs(finalWeekOffs);
        } catch (err) {
          alert(weekoffsFetchFailed);
        }
      })();
    }
  }, [
    dispatch,
    employeeID,
    isGuestLogin,
    token,
    employeeShiftDataObj?.weeklyOff,
  ]);

  const showFromDatePicker = () => {
    if (!isEditOpenleave && fromOpenLeave) {
      return;
    } else {
      setFromCalenderVisible(true);
    }
  };

  const showToDatePicker = () => {
    if (!isEditOpenleave && fromOpenLeave) {
    } else {
      setToCalenderVisible(true);
    }
  };

  const fromOnCancel = () => {
    setFromCalenderVisible(false);
  };

  const toOnCancel = () => {
    setToCalenderVisible(false);
  };

  const fromCalenderConfirm = async date => {
    fromOnCancel();
    setToDate({
      toDateStr: openLeaveTooDatestr === invalidDate ? '' : openLeaveTooDatestr,
    });
    setSelectHalfDayValue(null);

    if (employeeWeekOffs?.includes(date.getDay())) {
      alert('You already have a weekend holiday on this day.');
      fromOnCancel();
      return;
    }
    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert('You can not take a leave on National holiday.');
        fromOnCancel();
        return;
      }
    }

    const presentDate = String(date.getDate()).padStart(2, '0');
    const presentMonth = date.toLocaleString('default', {month: 'short'});
    const presentYear = date.getFullYear();
    const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

    setTotalNumberOfLeaveDays('');
    setFromDate({fromDateObj: date, fromDateStr: finalTodayDate});
  };

  const toCalenderConfirm = async date => {
    toOnCancel();
    setSelectHalfDayValue(null);

    if (totalNumberOfLeaveDays > 1) {
      setHalfDay('None');
    }

    if (employeeWeekOffs?.includes(date.getDay())) {
      alert('You already have a weekend holiday on this day.');
      toOnCancel();
      return;
    }

    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert('You can not take a leave on National holiday.');
        toOnCancel();
        return;
      }
    }

    if (fromDate?.fromDateObj) {
      if (fromDate?.fromDateObj > date) {
        toOnCancel();
        alert('Please select To date which is same or greater than From date.');
        toOnCancel();
        return;
      }
    }

    const presentDate = String(date.getDate()).padStart(2, '0');
    const presentMonth = date.toLocaleString('default', {month: 'short'});
    const presentYear = date.getFullYear();
    const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

    if (isGuestLogin) {
      const totalLeaveDays =
        getDaysBetweenDates(fromDate.fromDateObj, date) + 1;
      setTotalNumberOfLeaveDays(totalLeaveDays);
      setToDate({toDateObj: date, toDateStr: finalTodayDate});
      return;
    }

    const fromMonthIndex =
      getMonthIndex(fromDate.fromDateStr.split('-')[1]) < 10
        ? `0${getMonthIndex(fromDate.fromDateStr.split('-')[1])}`
        : getMonthIndex(fromDate.fromDateStr.split('-')[1]);

    const toMonthIndex =
      getMonthIndex(finalTodayDate.split('-')[1]) < 10
        ? `0${getMonthIndex(finalTodayDate.split('-')[1])}`
        : getMonthIndex(finalTodayDate.split('-')[1]);

    let fromDateStr = [...fromDate?.fromDateStr?.split('-')].reverse();
    fromDateStr[1] = fromMonthIndex;
    fromDateStr = fromDateStr.join('-');

    let toDateStr = `${presentYear}-${toMonthIndex}-${presentDate}`;

    try {
      setLoading(true);
      const totalOutputDays = await dispatch(
        getFinalizedLeaveDays({
          token,
          employeeId: employeeID,
          fromDate: fromDateStr,
          toDate: toDateStr,
        }),
      );

      const finalizedLeaveDays = totalOutputDays?.payload?.totalLeaveDays;
      setTotalNumberOfLeaveDays(finalizedLeaveDays);
      setToDate({toDateObj: date, toDateStr: finalTodayDate});
    } catch (err) {
      console.log('err:', err);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date();
  const presentDate = String(today.getDate()).padStart(2, '0');
  const presentMonth = today.toLocaleString('default', {month: 'short'});
  const presentYear = today.getFullYear();

  const finalTodayDate = `${presentDate}-${presentMonth}-${presentYear}`;

  const card = ({
    leftLabel,
    rightLabel,
    selectableLeft,
    selectableRight,
    leftText,
    rightText,
    iconLeft,
    iconRight,
    leftOnPress,
    rightOnPress,
    rightDropdown,
    leftDropdown,
    zIndex,
    resourseRightText,
    rightDisabled = false,
  }) => {
    return (
      <View style={[styles.fromToContainer, {zIndex}]}>
        {!fromResource && leftDropdown ? (
          <View style={styles.fromContainer}>
            <Text style={styles.fromText}>{leftLabel}</Text>
            {leftDropdown}
          </View>
        ) : (
          <View style={styles.fromContainer}>
            <Text style={styles.fromText}>{leftLabel}</Text>
            <View
              style={[
                styles.calenderContainer,
                !leftText && styles.justifyContentFlexEnd,
              ]}>
              {leftText ? <Text>{leftText}</Text> : null}
              {!fromResource && selectableLeft ? (
                <TouchableOpacity disabled={fromResource} onPress={leftOnPress}>
                  <Image source={iconLeft} style={styles.cardLeftImage} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}
        {rightDropdown ? (
          <View style={[styles.toContainer, styles.zIndex1000]}>
            <Text style={styles.toText}>{rightLabel}</Text>
            {rightDropdown}
          </View>
        ) : (
          <View style={styles.toContainer}>
            <Text style={styles.toText}>{rightLabel}</Text>
            <View
              style={[
                styles.calenderContainer,
                !rightText && !fromResource && styles.justifyContentFlexEnd,
              ]}>
              {rightText && !fromResource && <Text>{rightText}</Text>}
              {fromResource && resourseRightText ? (
                <Text>{resourseRightText}</Text>
              ) : null}
              {selectableRight && !fromResource && (
                <TouchableOpacity
                  disabled={fromResource || rightDisabled}
                  onPress={rightOnPress}>
                  <Image source={iconRight} style={styles.imageRight} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  const leaveCard = (data, index) => {
    let checkSelected = data.leaveType === selectedCard.leaveType;
    return (
      <View
        style={[
          styles.leaveCard,
          checkSelected ? styles.backgroundGreen : styles.backgroundWhite,
        ]}>
        <View
          style={{
            ...styles.leaveTextContainer,
            borderBottomColor: checkSelected ? Colors.white : Colors.black,
          }}>
          <Text
            style={{
              ...styles.leaveText,
              color: checkSelected ? Colors.white : Colors.black,
            }}>
            {data.leaveType}
          </Text>
        </View>
        <View style={styles.bottomPart}>
          <View
            style={{
              ...styles.remainingContainer,
              backgroundColor: Colors.white,
            }}>
            <Text style={styles.remainingText}>{data.currentLeaveBalance}</Text>
          </View>
          <View
            style={{
              ...styles.verticalLine,
              borderColor: checkSelected ? Colors.white : Colors.black,
            }}
          />
          <View style={styles.leaveDetails}>
            <View style={styles.allocated}>
              <Text
                style={{
                  ...styles.allocatedText,
                  color: checkSelected ? Colors.white : Colors.black,
                }}>
                Allocated: {data.totalLeavesAllocated}
              </Text>
            </View>
            <View style={styles.taken}>
              <Text
                style={{
                  ...styles.takenText,
                  color: checkSelected ? Colors.white : Colors.black,
                }}>
                Taken: {data.currentLeaveApplied}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const sliderComponent = data => {
    return (
      <View style={styles.headerContainer}>
        <FlatList
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          contentContainerStyle={styles.headerSliderContentContainerStyle}
          style={styles.headerSlider}
          horizontal={true}
          data={data}
          renderItem={({item, index}) => {
            return leaveCard(item, index);
          }}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  };

  const giveReason = value => {
    setReason(value);
  };

  const applyLeave = async () => {
    if (!fromDate.fromDateObj || !toDate.toDateObj) {
      alert('Please select dates for which you want to apply a leave.');
      return;
    }

    if (!reason.trim()) {
      alert('Please enter a reason for applying a leave.');
      return;
    }

    if (!selectLeaveTypeValue) {
      alert('Please select a leave type.');
      return;
    }

    // if (totalNumberOfLeaveDays === 0) {
    //   alert('You can not apply leave on Weekends.');
    //   return;
    // }
    // if (totalNumberOfLeaveDays < 0.5) {
    //   alert('Difference between the number of leave days must be positive.');
    //   return;
    // }

    for (let i = 0; i < leavesData?.length; i++) {
      let {fromDate: startDate1, toDate: endDate1} = leavesData[i];
      startDate1 = new Date(startDate1);
      endDate1 = new Date(endDate1);
      const startDate2 = fromDate.fromDateObj;
      const endDate2 = toDate.toDateObj;

      if (
        (startDate1 >= startDate2 && endDate2 >= startDate1) ||
        (startDate2 >= startDate1 && startDate2 <= endDate1)
      ) {
        if (
          (leavesData[i]?.status?.toLowerCase() === 'open' ||
            leavesData[i]?.status?.toLowerCase() === 'approved') &&
          leavesData[i]?.leaveType?.toLowerCase() !== 'work from home' &&
          !fromApproverEnd
        ) {
          alert('Leaves are already applied to these dates.');
          return;
        }
      }

      if (
        startDate1.toDateString() === startDate2.toDateString() ||
        startDate1.toDateString() === endDate2.toDateString() ||
        startDate2.toDateString() === startDate1.toDateString() ||
        startDate2.toDateString() === endDate1.toDateString()
      ) {
        if (
          (leavesData[i]?.status?.toLowerCase() === 'open' ||
            leavesData[i]?.status?.toLowerCase() === 'approved') &&
          leavesData[i]?.leaveType?.toLowerCase() !== 'work from home' &&
          !fromApproverEnd
        ) {
          alert('Leaves are already applied to these dates.');
          return;
        }
      }
    }

    if (selectLeaveTypeValue?.toLowerCase() === 'earned leave') {
      const positiveDays = openLeavesCount?.earnedOpen + totalNumberOfLeaveDays;

      if (positiveDays > earnedLeaves?.currentLeaveBalance) {
        alert(
          'You either run out of leave balance or you already have opened remaining leaves.',
        );
        return;
      }
    }

    // return;

    if (selectLeaveTypeValue?.toLowerCase() === 'restricted holiday') {
      const positiveDays = openLeavesCount?.rhOpen + totalNumberOfLeaveDays;
      if (positiveDays > restrictedLeaves?.currentLeaveBalance) {
        alert(
          'You either run out of leave balance or you already opened remaining leaves.',
        );
        return;
      }
    }

    if (isGuestLogin) {
      Alert.alert('Success', 'Leave Applied Successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
      return;
    }

    const leaveApproverMailID = leaveApproversValue;

    if (!leaveApproverMailID) {
      alert('Please Select a Leave Approver.');
      return;
    }

    if (fromApproverEnd && !selectedResource) {
      alert('Please Select a Resource.');
      return;
    }

    setLoading(true);

    console.log('selectedResource:', selectedResource);
    const appliedLeave =
      token &&
      (await dispatch(
        applyForLeave({
          token,
          body: {
            employeeId: fromApproverEnd ? selectedResource.value : employeeID,
            fromDate: fromDate.fromDateObj,
            toDate: toDate.toDateObj,
            totalLeaveDays: totalNumberOfLeaveDays,
            description: reason,
            halfDay:
              (halfDay === firstFalf || halfDay === secondHalf) &&
              totalNumberOfLeaveDays === 0.5
                ? 1
                : 0,
            postingDate: new Date(),
            leaveType: selectLeaveTypeValue,
            leaveApprover: fromApproverEnd
              ? leaveApproversValue
              : // ? decoded?.emailId
                leaveApproverMailID,
            fiscalYear: fiscalYear,
            userId: fromApproverEnd
              ? selectedResource?.employee?.userId
              : decoded?.emailId,
          },
        }),
      ));

    setLoading(false);
    if (appliedLeave?.error) {
      alert(appliedLeave?.error?.message || 'Something went wrong');
    } else {
      Alert.alert('Success', 'Leave applied successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const applyUpdatedLeave = async () => {
    if (!fromDate.fromDateObj || !toDate.toDateObj) {
      alert('Please select dates for which you want to apply for a leave.');
      return;
    }

    if (!reason.trim()) {
      alert('Please enter a reason for applying for a leave.');
      return;
    }

    if (!selectLeaveTypeValue) {
      alert('Please select a leave type.');
      return;
    }

    if (totalNumberOfLeaveDays < 0.5) {
      alert('Difference between the number of leave days must be positive.');
      return;
    }
    setLoading(true);
    const appliedLeave =
      token &&
      (await dispatch(
        applyForUpdateedLeave({
          token,
          body: {
            leaveApplicationId: openLeaveApplicationId,
            employeeId: employeeID,
            fromDate: fromDate.fromDateObj,
            toDate: toDate.toDateObj,
            halfDay: halfDay,
            leaveType: openLeaveType,
            totalLeaveDays: openLeaveNumberOfDays,
            description: openLeaveReason,
            postingDate: new Date(),
            leaveApprover: openLeaveApproverEmail,
          },
        }),
      ));

    setLoading(false);
    if (appliedLeave?.error) {
      alert(appliedLeave.error.message);
    } else {
      Alert.alert('Success', 'Leave Updated successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };
  const finalizeLeave = async status => {
    const empId = fromResource ? route?.params?.resourceEmployeeID : employeeID;
    setLoading(true);
    const response =
      token &&
      (await dispatch(
        updateLeaveStatus({
          token,
          body: {
            employeeId: empId,
            leaveApplicationId: openLeaveApplicationId,
            status: status,
            leaveType: openLeaveType,
          },
        }),
      ));

    setLoading(false);
    if (response?.error) {
      // alert(response?.error?.message);
      Alert.alert('Failed', `Leave ${status} failed!`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } else {
      Alert.alert('Success', `Leave ${status} successfully!`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const onSelectLeaveApprover = selectedOption => {};

  const onSelectResource = async selectedOption => {
    if (isGuestLogin) {
      return;
    }
    try {
      const empId = selectedOption.value;
      getLAs(empId);
      setLoading(true);
      const {payload: selectedEmployeeRemainingLeaves} = await dispatch(
        getRemainingLeavesByEmpId({token, empId}),
      );

      const finalLeaves = selectedEmployeeRemainingLeaves.map(leave => ({
        leaveType: leave.leaveType,
        totalLeavesAllocated: leave.totalLeavesAllocated,
        currentLeaveApplied: leave.currentLeaveApplied,
        currentLeaveBalance: leave.currentLeaveBalance,
      }));

      setAllRemainingLeaves(finalLeaves);

      setSelectedResource(selectedOption);
    } catch (err) {
      console.log('errorRemLeaves:', err);
    } finally {
      setLoading(false);
    }
  };

  const dateAfter6MonthsFromCurrentDate = new Date();
  dateAfter6MonthsFromCurrentDate.setMonth(new Date().getMonth() + 6);

  const minimumDateLeaveApplication = new Date();

  minimumDateLeaveApplication.setMonth(
    minimumDateLeaveApplication.getMonth() -
      (minimumDateLeaveApplication.getDate() > 25 ? 1 : 2),
  );

  minimumDateLeaveApplication.setDate(25);
  const handleLeaveApply = () => {
    isEditOpenleave ? applyUpdatedLeave() : applyLeave();
  };

  let leaveSlider = <></>;

  if (fromApproverEnd && !resourcePickedId) {
    leaveSlider = (
      <Text style={styles.headerSliderText}>Please Select a Resource.</Text>
    );
  } else if (allRemainingLeaves.length) {
    leaveSlider = sliderComponent(allRemainingLeaves);
  } else {
    leaveSlider = (
      <Text style={styles.headerSliderText}>
        Something went wrong while fetching remaining leaves. Kindly try later.
      </Text>
    );
  }

  let zIndexStyle = {};
  if (Platform.OS === 'ios') {
    zIndexStyle = {
      zIndex: 9999,
    };
  }

  let newDate = new Date(fromDate?.fromDateObj);

  // Add 180 days to the new date
  newDate.setDate(newDate.getDate() + 179);
  // const Component = openResourcePicker ? View : ScrollView;
  return (
    // <KeyboardAvoidingView behavior="height" style={styles.mainContainer}>
    <>
      {/* {route?.params?.fromWfh || fromResource ? (
        <CustomHeader
          showDrawerMenu={false}
          title={'Leave Details'}
          navigation={navigation}
          isHome={false}
          showHeaderRight={false}
        />
      ) : null} */}
      <CustomHeader
        showDrawerMenu={false}
        title={
          route?.params?.fromWfh || fromResource
            ? 'Leave Details'
            : 'Apply Leave'
        }
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
        hasToPop={hasToPop}
      />
      <SafeAreaView style={styles.mainBottomContainer}>
        <View style={styles.swiperContainer}>{leaveSlider}</View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainBottomContainer}
          contentContainerStyle={styles.mainContainerContentContainerStyle}>
          {fromApproverEnd ? (
            <View
              style={{
                ...styles.resourcePickerContainer,
                ...zIndexStyle,
              }}>
              <Text style={styles.selectResourceText}>Employee: </Text>
              {!loading ? (
                <DropDownPicker
                  searchable={true}
                  searchPlaceholder="Search..."
                  listMode="SCROLLVIEW"
                  placeholder={'Select....'}
                  open={openResourcePicker}
                  value={resourcePickedId}
                  items={resourcePicks}
                  setOpen={setOpenResourcePicker}
                  setValue={setResourcePickedId}
                  setItems={setResourcePicks}
                  onSelectItem={onSelectResource}
                  containerStyle={styles.resourceSelectContainerStyle}
                  style={styles.leaveApproverSelect}
                />
              ) : null}
            </View>
          ) : null}

          <View style={styles.mainPart}>
            <View style={[styles.formContainer]}>
              <View>
                {card({
                  leftLabel: 'From',
                  rightLabel: 'To',
                  selectableLeft: true,
                  selectableRight: true,
                  iconLeft: MonthImages.CalenderIcon,
                  iconRight: MonthImages.CalenderIcon,
                  leftOnPress: showFromDatePicker,
                  rightOnPress: showToDatePicker,
                  leftText: isEditOpenleave
                    ? fromDate.fromDateStr
                    : fromOpenLeave
                    ? openLeaveFromDatestr
                    : fromDate.fromDateStr,
                  rightText: isEditOpenleave
                    ? toDate.toDateStr
                    : fromOpenLeave
                    ? openLeaveTooDatestr
                    : toDate.toDateStr,
                  zIndex: 100,
                  resourseRightText: toDatestr,
                  rightDisabled: !fromDate.fromDateObj,
                })}
                {card({
                  zIndex: 1000,
                  leftLabel: 'Created Date',
                  rightLabel: 'Half Day',
                  selectableRight: true,
                  leftText: isEditOpenleave
                    ? finalTodayDate
                    : fromResource
                    ? postingDateStr
                    : fromOpenLeave
                    ? openLeavePostingDateStr
                    : finalTodayDate,
                  iconRight: MonthImages.DropDownIcon,
                  rightText: 'None',
                  rightDropdown: (
                    <DropDownPicker
                      dropDownDirection="BOTTOM"
                      disabled={
                        !fromDate.fromDateObj ||
                        !toDate.toDateObj ||
                        totalNumberOfLeaveDays > 1 ||
                        fromResource ||
                        (!isEditOpenleave && fromOpenLeave)
                      }
                      listMode="SCROLLVIEW"
                      placeholder={
                        !fromResource && !fromOpenLeave
                          ? 'Select'
                          : !resourceHalfDay || !isHalfDay
                          ? !fromOpenLeave
                            ? none
                            : openLeaveNumberOfDays === 0.5
                            ? halfDayStr
                            : none
                          : halfDayStr
                        // : resourceHalfDay === 1 || isHalfDay === 1
                        // ? firstFalf
                        // : secondHalf
                      }
                      // placeholder={'Select'}
                      open={isHalfDayOpen}
                      value={selectHalfDayValue}
                      items={newDropDownOptions}
                      setOpen={setIsHalfDayOpen}
                      setValue={setSelectHalfDayValue}
                      onSelectItem={itemName => {
                        if (itemName.value !== none) {
                          setTotalNumberOfLeaveDays(0.5);
                        } else {
                          setTotalNumberOfLeaveDays(1);
                        }
                        setHalfDay(itemName.value);
                        totalNumberOfLeaveDays > 1 && setHalfDay(' None');
                      }}
                      containerStyle={{}}
                      style={[
                        styles.halfDayDropdown,
                        (!fromDate.fromDateObj ||
                          !toDate.toDateObj ||
                          totalNumberOfLeaveDays > 1 ||
                          fromResource ||
                          (!isEditOpenleave && fromOpenLeave)) &&
                          styles.lessOpacity,
                      ]}
                    />
                  ),
                })}

                {card({
                  zIndex: 100,
                  leftLabel: 'Leave Type',
                  rightLabel: 'Number of Days',
                  selectableLeft: true,
                  iconLeft: MonthImages.DropDownIcon,
                  rightText:
                    totalNumberOfLeaveDays >= 0.5
                      ? totalNumberOfLeaveDays
                      : fromOpenLeave
                      ? openLeaveNumberOfDays
                      : '',
                  leftText: fromResource
                    ? resourceData.leaveType
                    : fromOpenLeave
                    ? openLeaveType
                    : earnedLeave,
                  resourseRightText: resourceData?.totalLeaveDays,
                  leftDropdown: (
                    <DropDownPicker
                      dropDownDirection="BOTTOM"
                      disabled={!isApplyingLeave && !fromApproverEnd}
                      listMode="SCROLLVIEW"
                      placeholder={
                        fromResource
                          ? resourceData.leaveType
                          : fromOpenLeave
                          ? openLeaveType
                          : 'Select'
                      }
                      // placeholder={'Select Type....'}
                      open={isLeaveTypeOpen}
                      value={selectLeaveTypeValue}
                      items={leaveTypesItems}
                      setOpen={setIsLeaveTypeOpen}
                      setValue={setSelectLeaveTypeValue}
                      onSelectItem={itemName => {
                        const index = allRemainingLeaves.findIndex(
                          item => item.leaveType === itemName.value,
                        );

                        flatListRef.current?.scrollToIndex({
                          animated: true,
                          index: index,
                          viewPosition: 0.5,
                        });
                        setSelectedCard({leaveType: itemName.value});
                      }}
                      containerStyle={{}}
                      style={[
                        styles.selectLeaveDropdown,
                        !isApplyingLeave &&
                          !fromApproverEnd &&
                          styles.lessOpacity,
                      ]}
                    />
                  ),
                })}

                <DateTimePickerModal
                  minimumDate={minimumDateLeaveApplication}
                  date={fromDate?.fromDateObj}
                  maximumDate={dateAfter6MonthsFromCurrentDate}
                  isVisible={fromCalenderVisible}
                  mode="date"
                  onConfirm={fromCalenderConfirm}
                  onCancel={fromOnCancel}
                />
                <DateTimePickerModal
                  minimumDate={fromDate?.fromDateObj}
                  date={fromDate?.fromDateObj}
                  maximumDate={newDate}
                  isVisible={toCalenderVisible}
                  mode="date"
                  onConfirm={toCalenderConfirm}
                  onCancel={toOnCancel}
                />

                <View style={styles.reasonContainer}>
                  <Text style={styles.reasonText}>Reason</Text>
                  {isEditOpenleave ? (
                    <TextInput
                      onChangeText={giveReason}
                      multiline={true}
                      style={styles.reasonTextInput}
                      value={reason}
                    />
                  ) : fromResource ? (
                    <Text style={styles.resourceReasonText}>
                      {resourceData?.description}
                    </Text>
                  ) : fromOpenLeave ? (
                    <Text style={styles.resourceReasonText}>
                      {openLeaveReason}
                    </Text>
                  ) : (
                    <TextInput
                      onChangeText={giveReason}
                      multiline={true}
                      style={styles.reasonTextInput}
                    />
                  )}
                </View>
              </View>

              {!fromResource && !fromOpenLeave && (
                <View
                  style={[
                    styles.leaveApproverContainer,
                    isLeaveTypeOpen ? styles.negativeZIndex : null,
                  ]}>
                  <Text style={styles.leaveApproverText}>Leave Approver:</Text>

                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    scrollEnabled={true}
                    placeholder={'Select....'}
                    open={openLeaveApprovers}
                    value={leaveApproversValue}
                    items={leaveApproversList}
                    setOpen={setOpenLeaveApproovers}
                    setValue={setLeaveApproversValue}
                    onSelectItem={onSelectLeaveApprover}
                    // dropDownContainerStyle={{height: 160}}
                    containerStyle={{width: wp(50)}}
                    style={styles.leaveApproverSelect}
                  />
                </View>
              )}
            </View>

            {fromResource ? (
              <View style={styles.resourceButtonContainer}>
                {/* <Pressable
                  style={styles.resourceButton}
                  onPress={finalizeLeave.bind(null, 'Dismissed')}>
                  <Text style={styles.applyText}>Dismiss</Text>
                </Pressable> */}
                <Pressable
                  style={styles.resourceButton}
                  onPress={finalizeLeave.bind(null, 'Rejected')}>
                  <Text style={styles.applyText}>Reject</Text>
                </Pressable>
                <Pressable
                  style={styles.resourceButton}
                  onPress={finalizeLeave.bind(null, 'Approved')}>
                  <Text style={styles.applyText}>Approve</Text>
                </Pressable>
              </View>
            ) : isEditOpenleave ? (
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleLeaveApply}>
                  <Text style={styles.applyText}>Apply</Text>
                </Pressable>
              </View>
            ) : fromOpenLeave ? (
              <View style={styles.resourceButtonContainer}>
                <Pressable
                  style={styles.resourceButton}
                  onPress={finalizeLeave.bind(null, 'Dismissed')}>
                  <Text style={styles.applyText}>Dismiss</Text>
                </Pressable>

                <Pressable
                  style={styles.resourceButton}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Text style={styles.applyText}>Cancel</Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={applyLeave}>
                  <Text style={styles.applyText}>Apply</Text>
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>
        {loading ? (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderBackground} />
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </SafeAreaView>
    </>

    // </KeyboardAvoidingView>
  );
};

export default ApplyLeave;

// http://10.101.23.48:81/api/Leave/GetLeaveApprover?empId=10876

// employeeId:10529
// fromDate:2024-02-01T06:15:47.841Z
// toDate:2024-02-01T06:15:47.841Z
// totalLeaveDays:1
// description:Tesstinggg
// halfDay:0
// postingDate:2024-02-01T07:09:12.179Z
// leaveType:Earned Leave
// leaveApprover:kamal.deepika@thinksys.com
// fiscalYear:2023-2024

// employeeId:10224
// fromDate:2024-02-01T06:15:47.841Z
// toDate:2024-02-01T06:15:47.841Z
// totalLeaveDays:1
// description:Testing 2
// halfDay:0
// postingDate:2024-02-01T07:10:15.158Z
// leaveType:Earned Leave
// leaveApprover:kumar.satish@thinksys.com
// fiscalYear:2023-2024
// userId:kamal.deepika@thinksys.com
