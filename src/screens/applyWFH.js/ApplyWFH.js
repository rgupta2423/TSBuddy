import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  // TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import {Colors} from 'colors/Colors';
import styles from './ApplyWFHstyles';
import {useSelector, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import jwt_decode from 'jwt-decode';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  applyForWfhLeave,
  getAllEmployeesForHR,
  getEmployeeShift,
  getEmployeesByLeaveApprover,
  getLeaveApprovers,
  getLeaveDetails,
  updateLeaveStatus,
} from 'redux/homeSlice';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import CustomHeader from 'navigation/CustomHeader';
import {useIsFocused} from '@react-navigation/native';
import ShowAlert from 'customComponents/CustomError';
import {CLOSE, ERROR, WORK_FROM_HOME} from 'utils/string';
import {useDrawerStatus} from '@react-navigation/drawer';
import ApprovedIcon from 'assets/newDashboardIcons/circle-check.svg';
import RejectedIcon from 'assets/newDashboardIcons/ban.svg';
// import PendingIcon from 'assets/newDashboardIcons/circle-minus.svg';
import {
  getUniqueArrayOfObjects,
  sortArrayOfObjectsOnProperty,
} from 'utils/utils';
import CustomButton from 'navigation/CustomButton';
import CombineHeader from 'component/header/CombineHeader';
import {LeaveAllocationSeparate} from 'navigation/Route';

const initialEndDate = {endDateStr: 'Select End Date'};
const initialStartDate = {startDateStr: 'Select Start Date'};
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// const alreadyWeekend = 'You already have a weekend holiday on this day.';
const alreadyNationalHoliday = 'You can not take a WFH on National holiday.';
const alreadyWFHApplied = 'WFH are already applied for these dates.';
const workFromHome = 'Work From Home';

const ApplyWFH = ({navigation, fromApproverEnd}) => {
  const token = useSelector(state => state.auth.userToken);
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;
  const dispatch = useDispatch();
  const {employeeShift: employeeShiftDataObj} = useSelector(
    state => state.home,
  );

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const drawerStatus = useDrawerStatus();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingWFHList, setLoadingWFHList] = useState(false);
  const [wfhList, setWfhList] = useState([]);
  const [totalDaysCount, setTotalDaysCount] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [leaveApprover, setLeaveApprover] = useState('');
  const [selectedLeaveApprover, setSelectedLeaveApprover] = useState('');
  const [reason, setReason] = useState('');
  const [employeeWeekOffs, setEmployeeWeekOffs] = useState([]);
  const [leavesNotIncludeWFH, setLeavesNotIncludeWFH] = useState([]);
  const [openResourcePicker, setOpenResourcePicker] = useState(false);
  const [resourcePickedId, setResourcePickedId] = useState(null);
  const [resourcePicks, setResourcePicks] = useState([]);

  const {holidayData} = useSelector(state => state.home);

  let currentYear = new Date().getFullYear();
  const fiscalYear = `${currentYear}-${new Date().getFullYear() + 1}`;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (drawerStatus === 'open') {
      Keyboard.dismiss();
    }
  }, [drawerStatus]);

  useEffect(() => {
    if (!fromApproverEnd) {
      (async () => {
        const leaveApprovers = token
          ? await dispatch(getLeaveApprovers({token, employeeID}))
          : [];

        const listOfLeaveApprovers = leaveApprovers.payload?.map(approver => {
          const approverName = `${approver?.leaveApproverFirstName} ${
            approver.leaveApproverMiddleName
              ? approver.leaveApproverMiddleName + ' '
              : ''
          }${
            approver.leaveApproverLastName ? approver.leaveApproverLastName : ''
          }`;

          // filter((obj, index, self) => {
          //   return index === self.findIndex(o => o.value === obj.value);
          // })

          return {
            value: approver.leaveApprover,
            label: approverName,
          };
        });
        setLeaveApprover(listOfLeaveApprovers);
        const finalLeaveApprovers =
          getUniqueArrayOfObjects(listOfLeaveApprovers);
        setItems(finalLeaveApprovers);
      })();
    }
  }, [dispatch, employeeID, token, fromApproverEnd]);

  useEffect(() => {
    if (!fromApproverEnd) {
      (async () => {
        try {
          const weekOffs = employeeShiftDataObj?.weeklyOff.split('_');

          const finalWeekOffs = [];
          daysOfWeek?.map((el, index) => {
            if (weekOffs?.includes(el)) {
              finalWeekOffs.push(index);
            }
          });
          setEmployeeWeekOffs(finalWeekOffs);
        } catch (err) {
          console.log('errorEmpShift:', err);
        }
      })();
    }
  }, [
    dispatch,
    employeeID,
    token,
    fromApproverEnd,
    employeeShiftDataObj?.weeklyOff,
  ]);

  const fetchWFHs = useCallback(() => {
    if (isFocused && !fromApproverEnd) {
      (async () => {
        try {
          setLoading(true);
          const leavesData = await dispatch(
            getLeaveDetails({
              token,
              empID: employeeID,
            }),
          );

          // let wfhLeaveList = leavesData.payload?.filter(
          //   leave => leave.leaveType.toLowerCase() === 'work from home',
          // );
          const wfhLeaveList = [];
          const otherLeaves = [];

          for (let leave of leavesData?.payload) {
            if (leave?.leaveType?.toLowerCase() === WORK_FROM_HOME) {
              // has to import from strings.js
              wfhLeaveList.push(leave);
            } else {
              otherLeaves.push(leave);
            }
          }

          let sortedWfhData = wfhLeaveList?.sort(
            (a, b) =>
              new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime(), // has to import from utils.js
          );

          setWfhList(sortedWfhData);
          setLeavesNotIncludeWFH(otherLeaves);

          if (leavesData?.error) {
            ShowAlert({
              messageHeader: ERROR,
              messageSubHeader: leavesData?.error?.message,
              buttonText: CLOSE,
              dispatch,
            });
          }
        } catch (err) {
          console.log('errWFH:', err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [dispatch, employeeID, fromApproverEnd, token, isFocused]);

  useEffect(() => {
    fetchWFHs();
  }, [fetchWFHs]);

  useEffect(() => {
    if (fromApproverEnd) {
      (async () => {
        try {
          // setLoading(true);
          // const employeeData = await dispatch(
          //   getEmployeesByLeaveApprover(token),
          // );

          // const finalResources = employeeData?.payload?.map(employee => {
          //   const empName = empFullName(employee);

          //   return {value: employee.employeeId, label: empName, employee};
          // });

          // setResourcePicks(finalResources);
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
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [dispatch, navigation, token, fromApproverEnd]);

  const onSelectItem = item => {
    const leaveApproverSelected = leaveApprover.find(
      approver => approver?.label?.toLowerCase() === item?.label?.toLowerCase(),
    );

    setSelectedLeaveApprover(leaveApproverSelected.value);
  };

  const hideDatePicker = pickerToClose => {
    pickerToClose(false);
  };

  const startOnCancel = () => {
    setStartDatePickerVisible(false);
  };

  const endOnCancel = () => {
    setEndDatePickerVisible(false);
  };

  const handleStartConfirm = date => {
    Keyboard.dismiss;
    // if (employeeWeekOffs?.includes(date.getDay())) {
    //   // date.setDate(date.getDate() + 1);
    //   alert(alreadyWeekend);
    //   startOnCancel();
    //   return;
    // }

    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert(alreadyNationalHoliday);
        startOnCancel();
        return;
      }
    }

    const fromDateObj = date;
    setFromDate(fromDateObj);
    let selectedDate = date.getDate();

    let selectedMonth = date.getMonth() + 1;
    let selectedYear = date.getFullYear();
    hideDatePicker(setStartDatePickerVisible);
    setStartDate({
      startDateStr: selectedDate + ' / ' + selectedMonth + ' / ' + selectedYear,
      startDateObj: date,
    });
    setStartSelected(true);
    setEndSelected(false);
    setEndDate(initialEndDate);
    setTotalDaysCount(0);
  };

  const handleEndConfirm = date => {
    Keyboard.dismiss();
    // if (employeeWeekOffs?.includes(date.getDay())) {
    //   // date.setDate(date.getDate() + 1);
    //   alert(alreadyWeekend);
    //   endOnCancel();
    //   return;
    // }

    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert(alreadyNationalHoliday);
        endOnCancel();
        return;
      }
    }
    const toDateObj = date;
    setToDate(toDateObj);
    setEndSelected(true);
    let selectedDate = date.getDate();

    let selectedMonth = date.getMonth() + 1;
    let selectedYear = date.getFullYear();
    setEndDate({
      endDateStr: selectedDate + ' / ' + selectedMonth + ' / ' + selectedYear,
      endDateObj: date,
    });
    hideDatePicker(setEndDatePickerVisible);
    const diffTime = toDateObj?.getTime() - fromDate?.getTime();
    const diffInDays = diffTime / (1000 * 60 * 60 * 24) + 1;
    setTotalDaysCount(Math.round(diffInDays));
  };

  let opacity = 1;

  if (value !== 'monthly') {
    if (
      !startSelected ||
      !endSelected ||
      !value ||
      reason?.trim().length === 0
    ) {
      opacity = 0.5;
    }
  }

  const onApplyWfh = async () => {
    for (let i = 0; i < wfhList?.length; i++) {
      let {fromDate: startDate1, toDate: endDate1} = wfhList[i];
      startDate1 = new Date(startDate1);
      endDate1 = new Date(endDate1);
      const startDate2 = startDate.startDateObj;
      const endDate2 = endDate.endDateObj;

      if (
        (startDate1 >= startDate2 && endDate2 >= startDate1) ||
        (startDate2 >= startDate1 && startDate2 <= endDate1)
      ) {
        if (
          wfhList[i].status.toLowerCase() === 'open' ||
          wfhList[i].status.toLowerCase() === 'approved'
        ) {
          alert(alreadyWFHApplied);
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
          wfhList[i].status.toLowerCase() === 'open' ||
          wfhList[i].status.toLowerCase() === 'approved'
        ) {
          alert(alreadyWFHApplied);
          return;
        }
      }
    }

    // =================================================================
    for (let i = 0; i < leavesNotIncludeWFH?.length; i++) {
      let {fromDate: startDate1, toDate: endDate1} = leavesNotIncludeWFH[i];
      startDate1 = new Date(startDate1);
      endDate1 = new Date(endDate1);
      const startDate2 = fromDate;
      const endDate2 = toDate;

      if (
        (startDate1 >= startDate2 && endDate2 >= startDate1) ||
        (startDate2 >= startDate1 && startDate2 <= endDate1)
      ) {
        if (
          leavesNotIncludeWFH[i]?.status?.toLowerCase() === 'open' ||
          leavesNotIncludeWFH[i]?.status?.toLowerCase() === 'approved'
        ) {
          alert('Leaves are already applied for these dates.');
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
          leavesNotIncludeWFH[i]?.status?.toLowerCase() === 'open' ||
          leavesNotIncludeWFH[i]?.status?.toLowerCase() === 'approved'
        ) {
          alert('Leaves are already applied for these dates.');
          return;
        }
      }
    }
    // =================================================================

    try {
      setLoadingWFHList(true);
      setLoading(true);
      const appliedWfh =
        token &&
        (await dispatch(
          applyForWfhLeave({
            token,
            body: {
              employeeId: fromApproverEnd ? resourcePickedId : employeeID,
              fromDate: fromDate,
              toDate: toDate,
              totalLeaveDays: totalDaysCount,
              description: reason,
              leaveType: 'Work From Home',
              leaveApprover: selectedLeaveApprover,
              fiscalYear: fiscalYear,
              postingDate: new Date(),
            },
          }),
        ));

      const appliedWorkFromHome = appliedWfh?.payload;

      if (!appliedWfh?.error) {
        setWfhList(prevRequests => [appliedWorkFromHome, ...prevRequests]);
      } else if (appliedWfh?.error) {
      }

      if (appliedWfh?.error) {
        alert(appliedWfh.error.message);
      } else {
        Alert.alert('Success', 'WFH applied successfully!', [
          {
            text: 'Ok',
            onPress: () => {
              setEndSelected(false);
              setStartSelected(false);
              setStartDate(initialStartDate);
              setEndDate(initialEndDate);
              setReason('');
              setTotalDaysCount(0);
              setValue(null);
            },
          },
        ]);

        setTotalDaysCount(0);
      }
    } catch (err) {
      console.log('errWFH2:', err);
    } finally {
      setLoadingWFHList(false);
      setLoading(false);
    }
  };

  const onSelectResource = async selectedOption => {
    try {
      setLoadingWFHList(true);
      setLoading(true);
      const leavesData = await dispatch(
        getLeaveDetails({
          token,
          empID: selectedOption.value,
        }),
      );
      const wfhLeaveList = [];
      const otherLeaves = [];
      for (let leave of leavesData?.payload) {
        if (leave?.leaveType?.toLowerCase() === 'work from home') {
          wfhLeaveList.push(leave);
        } else {
          otherLeaves.push(leave);
        }
      }
      let sortedWfhData = wfhLeaveList?.sort(
        (a, b) =>
          new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime(),
      );
      setWfhList(sortedWfhData);
      setLeavesNotIncludeWFH(otherLeaves);
      if (leavesData?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: leavesData?.error?.message,
          buttonText: 'Close',
          dispatch,
        });
      }

      // GET LEAVE APPROVERS:
      const leaveApprovers = token
        ? await dispatch(
            getLeaveApprovers({token, employeeID: selectedOption.value}),
          )
        : [];

      const listOfLeaveApprovers = leaveApprovers.payload?.map(approver => {
        const approverName = `${approver?.leaveApproverFirstName} ${
          approver.leaveApproverMiddleName
            ? approver.leaveApproverMiddleName + ' '
            : ''
        }${
          approver.leaveApproverLastName ? approver.leaveApproverLastName : ''
        }`;

        return {
          value: approver.leaveApprover,
          label: approverName,
        };
      });
      setLeaveApprover(listOfLeaveApprovers);
      const finalLeaveApprovers = getUniqueArrayOfObjects(listOfLeaveApprovers);
      setItems(finalLeaveApprovers);

      // GET EMPLOYEE SHIFT:
      const employeeShift = await dispatch(
        getEmployeeShift({token, id: selectedOption.value}),
      );
      const weekOffs = employeeShift?.payload?.weeklyOff.split('_');

      const finalWeekOffs = [];
      daysOfWeek?.map((el, index) => {
        if (weekOffs?.includes(el)) {
          finalWeekOffs.push(index);
        }
      });
      setEmployeeWeekOffs(finalWeekOffs);
    } catch (err) {
      console.log('errWFH:', err);
    } finally {
      setLoading(false);
      setLoadingWFHList(false);
    }
  };

  const onDismissWFH = async ({status, openLeaveApplicationId}) => {
    const empId = employeeID;
    setLoadingWFHList(true);
    try {
      const response =
        token &&
        (await dispatch(
          updateLeaveStatus({
            token,
            body: {
              employeeId: empId,
              leaveApplicationId: openLeaveApplicationId,
              status: status,
              leaveType: workFromHome,
            },
          }),
        ));
      if (response?.error) {
        // alert(response?.error?.message);
        Alert.alert('Failed', 'Leave Dismiss failed!', [
          {
            text: 'Ok',
            onPress: () => {
              null;
            },
          },
        ]);
      } else {
        fetchWFHs();
        Alert.alert('Success', 'WFH Dismissed successfully!', [
          {
            text: 'Ok',
            onPress: () => {
              null;
            },
          },
        ]);
      }
    } catch (err) {
      console.log('errFinalLeave:', err);
    } finally {
      setLoadingWFHList(false);
    }
  };

  const leftClickHandler = () => {
    navigation.navigate(LeaveAllocationSeparate);
  };

  const rightClickHandler = () => {};

  return (
    <SafeAreaView style={styles.mainContainer}>
      {fromApproverEnd ? (
        <CustomHeader
          showDrawerMenu={false}
          // showDrawerMenu={fromApproverEnd ? false : true}
          title="Apply WFH"
          navigation={navigation}
          isHome={false}
          showHeaderRight={false}
          // showHeaderRight={fromApproverEnd ? false : true}
        />
      ) : (
        <CombineHeader
          isFirstComponent={false}
          isLastComponent={true}
          navigation={navigation}
          title="Apply WFH"
          leftClickHandler={leftClickHandler}
          rightClickHandler={rightClickHandler}
        />
      )}

      {/* <CustomHeader
        showDrawerMenu={fromApproverEnd ? false : true}
        title="Apply WFH"
        navigation={navigation}
        isHome={false}
        showHeaderRight={fromApproverEnd ? false : true}
      /> */}

      <ScrollView
        contentContainerStyle={styles.containerContentContainerStyle}
        style={styles.contentContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.secondView}>
            {fromApproverEnd ? (
              <View
                style={[
                  styles.resourcePickerContainer,
                  Platform.OS === 'ios' ? styles.zIndex9999 : null,
                ]}>
                <Text style={styles.selectResourceText}>Employee: </Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  zIndex={10000}
                  searchable={true}
                  searchPlaceholder="Search..."
                  placeholder={'Select'}
                  open={openResourcePicker}
                  value={resourcePickedId}
                  items={resourcePicks}
                  setOpen={val => {
                    setOpen(false);
                    setOpenResourcePicker(val);
                  }}
                  setValue={setResourcePickedId}
                  setItems={setResourcePicks}
                  onSelectItem={onSelectResource}
                  containerStyle={styles.resourceSelectContainerStyle}
                  style={styles.leaveApproverSelect}
                />
              </View>
            ) : null}
            <DateTimePickerModal
              minimumDate={new Date()}
              date={startSelected ? startDate?.startDateObj : undefined}
              isVisible={startDatePickerVisible}
              mode="date"
              onConfirm={handleStartConfirm}
              onCancel={hideDatePicker.bind(null, setStartDatePickerVisible)}
            />
            <DateTimePickerModal
              minimumDate={startSelected ? startDate?.startDateObj : undefined}
              isVisible={endDatePickerVisible}
              mode="date"
              date={startSelected ? startDate?.startDateObj : undefined}
              onConfirm={handleEndConfirm}
              onCancel={hideDatePicker.bind(null, setEndDatePickerVisible)}
            />
            <View style={styles.datesContainer}>
              <View style={styles.thirdView}>
                <Text style={styles.fromDate}>From Date :</Text>
                <TouchableOpacity
                  onPress={() => {
                    setStartDatePickerVisible(true);
                  }}>
                  <View style={styles.fourthView}>
                    <Text style={styles.selectedDated}>
                      {startDate.startDateStr}
                    </Text>
                    <CalenderIcon
                      fill={Colors.lightGray1}
                      height={hp(2)}
                      width={hp(2)}
                      marginRight={wp(0.64)}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.fifthView}>
                <Text style={styles.toDate}>To Date :</Text>
                <TouchableOpacity
                  disabled={!startSelected}
                  style={[
                    styles.selectToDate,
                    !startSelected && styles.lessOpacity,
                  ]}
                  onPress={() => {
                    setEndDatePickerVisible(true);
                  }}>
                  <View style={styles.sixthView}>
                    <Text style={styles.selectedDated}>
                      {endDate.endDateStr}
                    </Text>
                    <CalenderIcon
                      fill={Colors.lightGray1}
                      height={hp(2)}
                      width={hp(2)}
                      marginRight={wp(0.64)}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.dropDownView}>
              <Text style={styles.daysCount}>
                Total Days: {!totalDaysCount ? 0 : totalDaysCount}
              </Text>
              <View style={styles.dropDownContainer}>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  open={open}
                  placeholder={
                    !fromApproverEnd
                      ? 'Select Leave Approver..'
                      : !resourcePickedId
                      ? 'Select Resource First..'
                      : 'Select Leave Approver..'
                  }
                  value={value}
                  items={items}
                  setOpen={val => {
                    setOpenResourcePicker(false);
                    setOpen(val);
                  }}
                  setValue={setValue}
                  setItems={setItems}
                  onSelectItem={onSelectItem}
                  containerStyle={styles.dropDownContainerStyles}
                  style={[
                    styles.dropDownMainStyles,
                    open && styles.borderRadius5,
                  ]}
                  dropDownContainerStyle={{
                    borderWidth: 1,
                    borderColor: Colors.grey,
                  }}
                  dropDownStyle={styles.dropDownStyle} //NO
                  labelStyle={styles.dropdownLabelStyle} //NO
                />
              </View>
            </View>
            <View style={styles.reasonViewBox}>
              <TextInput
                value={reason}
                placeholder="Reason..."
                multiline={true}
                style={styles.reasonInputBox}
                onChangeText={text => setReason(text)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={
                  !startDate.startDateObj &&
                  !endDate.endDateObj &&
                  !reason &&
                  !value
                }
                onPress={() => {
                  setEndSelected(false);
                  setStartSelected(false);
                  setStartDate(initialStartDate);
                  setEndDate(initialEndDate);
                  setReason('');
                  setTotalDaysCount(0);
                  setValue(null);
                }}
                style={[
                  styles.buttonClear,
                  !startDate.startDateObj &&
                    !endDate.endDateObj &&
                    reason?.trim().length === 0 &&
                    !value &&
                    styles.lessOpacity,
                ]}>
                <View>
                  <Text style={styles.clear}>Clear</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonApply, {opacity}]}
                disabled={
                  !startSelected ||
                  !endSelected ||
                  !value ||
                  reason?.trim().length === 0
                }
                onPress={onApplyWfh}>
                <View>
                  <Text style={styles.apply}>Apply</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {!fromApproverEnd || !!resourcePickedId ? (
        <View style={styles.wfhHistoryContainer}>
          <View style={styles.appliedView}>
            <Text style={styles.wfhHistoryText}>Work From Home History</Text>
          </View>
          <View style={styles.buttomView}>
            {loadingWFHList || loading ? (
              <View style={styles.WFHListLoaderContainer}>
                <ActivityIndicator color={Colors.grey} size="large" />
              </View>
            ) : wfhList.length > 0 ? (
              <FlatList
                style={styles.flatlistStyle}
                showsVerticalScrollIndicator={false}
                data={wfhList}
                renderItem={({item}) =>
                  renderListOfAppliedRequests({item, onDismissWFH})
                }
                keyExtractor={keyExtractor}
              />
            ) : (
              // wfhList.map(wfh => {
              //   return renderListOfAppliedRequests({item: wfh, onDismissWFH});
              // })
              <View style={styles.noWFHContainer}>
                <Text style={styles.noWFH}>You don't have any WFH.</Text>
              </View>
            )}
          </View>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderBackground} />
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const keyExtractor = item => Math.random() * Math.random();

const renderListOfAppliedRequests = ({item, onDismissWFH}) => {
  const options = {month: 'short', day: '2-digit', year: 'numeric'};

  const formattedStartDate = new Date(item?.fromDate)?.toLocaleDateString(
    'en-US',
    options,
  );

  const formattedEndDate = new Date(item?.toDate)?.toLocaleDateString(
    'en-US',
    options,
  );

  const appliedDate = new Date(item?.postingDate)?.toLocaleDateString(
    'en-US',
    options,
  );

  return (
    <View style={styles.request} key={item.leaveApplicationId}>
      <View style={styles.appliedRequestsLeft}>
        <View style={styles.daysContainer}>
          <Text style={styles.days}>
            {item?.totalLeaveDays <= 9 && Number.isInteger(item?.totalLeaveDays)
              ? '0'
              : null}
            {item?.totalLeaveDays}
          </Text>
          <Text style={styles.totalLeaveDays}>
            {item?.totalLeaveDays > 1 ? 'Days' : 'Day'}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.formattedDate}>
            {formattedStartDate} - {formattedEndDate}
          </Text>
          <View style={styles.appliedContainer}>
            <Text style={styles.appliedOn}>Applied on: </Text>
            <Text style={styles.appliedDate}>{appliedDate}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statusContainer}>
        {item.status?.toLowerCase() === 'open' ? (
          <View style={styles.pendingContainer}>
            <CustomButton
              title="Dismiss"
              onPress={onDismissWFH.bind(null, {
                status: 'Dismissed',
                openLeaveApplicationId: item.leaveApplicationId,
              })}
              styleButton={styles.dismissButton}
              styleTitle={styles.dismissTitle}
            />
          </View>
        ) : item.status?.toLowerCase() === 'dismissed' ||
          item.status?.toLowerCase() === 'rejected' ? (
          <View style={styles.rejectedContainer}>
            <RejectedIcon
              fill={Colors.darkBrown}
              height={20}
              width={20}
              marginBottom={4}
            />
            <Text style={styles.rejected}>{item.status}</Text>
          </View>
        ) : (
          <View style={styles.approvedContainer}>
            <ApprovedIcon
              fill={Colors.darkLovelyGreen}
              height={20}
              width={20}
              marginBottom={4}
            />
            <Text style={styles.approved}>{item.status || 'Approved'}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ApplyWFH;
