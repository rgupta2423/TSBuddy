import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomHeader from 'navigation/CustomHeader';
import styles from './AllocateLeavesStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import jwt_decode from 'jwt-decode';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {createLeaveAllocationRequest, getLeaveApprovers} from 'redux/homeSlice';
import {
  ENTER_REASON,
  ERROR,
  LEAVE_APPROVER_FAIL_FETCH,
  LEAVE_LIMIT_EXHAUSTED,
  OPEN,
  REASON_CHARACTER_LIMIT,
  SELECT_FROM_DATE,
  SELECT_LEAVE_APPROVER,
  SELECT_LEAVE_TYPE,
  SELECT_TO_DATE,
} from 'utils/string';
import {
  getCurrentFiscalYear,
  getDateStringFromDateObject,
  getDaysBetweenDates,
} from 'utils/utils';
import ShowAlert from 'customComponents/CustomError';

const compOff = 'Compensatory Off';
const bereOff = 'Bereavement Leave';
const pateOff = 'Paternity Leave';
const mateOff = 'Maternity Leave';

const leaveTypesArr = [
  {value: '', label: bereOff},
  {value: 1, label: compOff},
];

const AllocateLeave = ({navigation}) => {
  const {employeeProfile: empProfileData = {}} = useSelector(
    state => state.home,
  );

  const userGender = empProfileData.gender;

  const leaveTypesToAllocate = useMemo(() => {
    const arr = [...leaveTypesArr];
    if (userGender?.toLowerCase() === 'male') {
      arr.push({value: 2, label: pateOff, key: 3});
    } else {
      arr.push({value: 180, label: mateOff, key: 3});
    }

    return arr;
  }, [userGender]);

  const {employeeProfile: profileData = {}} = useSelector(state => state.home);
  const {employeeId} = profileData;
  const {userToken: token} = useSelector(state => state.auth);
  const decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';
  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);
  const fiscalYear = getCurrentFiscalYear();

  const dispatch = useDispatch();

  const [openLeaveApproverPicker, setOpenLeaveApproverPicker] = useState(false);
  const [leaveApproverPickedId, setLeaveApproverPickedId] = useState(null);

  const [leaveApproverPicks, setLeaveApproverPicks] = useState([]);

  const [openLeaveTypePicker, setOpenLeaveTypePicker] = useState(false);
  const [leaveTypeSelected, setLeaveTypeSelected] = useState(null);

  const [leaveTypePicks, setLeaveTypePicks] = useState([]);
  const [reason, setReason] = useState('');
  const [leaveToAllocateCount, setLeaveToAllocateCount] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromDatePickerVisible, setFromDatePickerVisible] = useState(false);
  const [toDatePickerVisible, setToDatePickerVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const rowRender = ({title, customComponent, zIndex}) => {
    return (
      <View style={[styles.rowRenderContainer, {zIndex}]}>
        <Text style={styles.rowRenderTitle}>{title}</Text>
        {customComponent}
      </View>
    );
  };

  const giveReason = value => {
    setError(null);
    setReason(value);
  };
  const leaveCountAdjuster = value => {
    setError(null);
    setLeaveToAllocateCount(value);
  };

  const onSelectLeaveApprover = selectedOption => {
    setError(null);
  };

  const onSelectLeaveType = selectedOption => {
    setError(null);
    setLeaveToAllocateCount(selectedOption.value);
    setLeaveTypeSelected(selectedOption);
  };

  useEffect(() => {
    (() => {
      if (!isGuestLogin) {
        (async () => {
          try {
            const leaveApproversFetched = token
              ? await dispatch(getLeaveApprovers({token, employeeID}))
              : [];
            if (!leaveApproversFetched.payload) {
              alert(LEAVE_APPROVER_FAIL_FETCH);
            }
            const listOfLeaveApprovers = leaveApproversFetched.payload
              .map(approver => {
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
              })
              .filter((obj, index, self) => {
                return index === self.findIndex(o => o.value === obj.value);
              });

            const firstLAValue = listOfLeaveApprovers[0].value;
            setLeaveApproverPickedId(firstLAValue);

            setLeaveApproverPicks(listOfLeaveApprovers);
          } catch (err) {
            console.log('errMap:', err);
          }
        })();
      }
    })();
  }, [dispatch, employeeID, isGuestLogin, token]);

  useEffect(() => {
    setLeaveTypePicks(leaveTypesToAllocate);
  }, [leaveTypesToAllocate]);

  const onCancelClick = () => {
    setLeaveApproverPickedId(null);
    setLeaveTypeSelected(null);
    setFromDate(null);
    setToDate(null);
    setReason('');
    setLeaveToAllocateCount('');
  };

  const onSubmitClick = async () => {
    setError(null);
    if (!leaveApproverPickedId) {
      setError(SELECT_LEAVE_APPROVER);
      return;
    }
    if (!leaveTypeSelected) {
      setError(SELECT_LEAVE_TYPE);
      return;
    }
    if (leaveTypeSelected.label === compOff) {
      if (!fromDate) {
        setError(SELECT_FROM_DATE);
        return;
      } else if (!toDate) {
        setError(SELECT_TO_DATE);
        return;
      }
    }
    if (reason?.trim()?.length === 0) {
      setError(ENTER_REASON);
      return;
    }

    if (leaveTypeSelected.label === bereOff && +leaveToAllocateCount > 2) {
      setError(LEAVE_LIMIT_EXHAUSTED);
      return;
    }
    if (reason?.trim()?.length < 5) {
      setError(REASON_CHARACTER_LIMIT);
      return;
    }

    try {
      setIsLoading(true);
      const leaveAllocation = await dispatch(
        createLeaveAllocationRequest({
          token,
          body: {
            employeeId,
            description: reason,
            daysRequested: +leaveToAllocateCount,
            fromDate: fromDate?.dateObj || null,
            toDate: toDate?.dateObj || null,
            fiscalYear,
            leaveType: leaveTypeSelected.label,
            status: OPEN,
            allocationDate: new Date(),
          },
        }),
      );
      if (leaveAllocation.error) {
        ShowAlert({
          messageHeader: '',
          messageSubHeader: leaveAllocation?.error?.message,
          buttonText: 'Close',
          dispatch,
          navigation,
        });
      } else {
        Alert.alert('Success!', 'Leave Allocation Requested Successfully.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (err) {
      console.log('errLeaveAllocation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const leaveCountEditable =
    leaveTypeSelected === null ||
    leaveTypeSelected?.label === mateOff ||
    leaveTypeSelected?.label === pateOff ||
    leaveTypeSelected.label === compOff
      ? false
      : true;

  const fromConfirmHandler = date => {
    const dateStr = getDateStringFromDateObject(date);
    setFromDate({dateStr, dateObj: date});
    hideDatePicker(setFromDatePickerVisible);
    setToDate(null);
  };

  const toConfirmHandler = date => {
    const dateStr = getDateStringFromDateObject(date);
    setToDate({dateStr, dateObj: date});
    hideDatePicker(setToDatePickerVisible);
    const days = (getDaysBetweenDates(fromDate.dateObj, date) + 1).toString(); // added 1 to include start and end dates.
    setLeaveToAllocateCount(days);
  };

  const openFromDatePicker = () => {
    setFromDatePickerVisible(true);
  };

  const openToDatePicker = () => {
    setToDatePickerVisible(true);
  };

  const hideDatePicker = pickerToHide => {
    pickerToHide(false);
  };

  return (
    <View style={styles.mainContainer}>
      <CustomHeader
        showDrawerMenu={false}
        title="Leave Allocation"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      <View style={styles.wholeContainerNotHeader}>
        <View>
          {rowRender({
            title: 'Leave Approver :',
            zIndex: 2000,
            customComponent: (
              <DropDownPicker
                placeholder={'Select....'}
                open={openLeaveApproverPicker}
                setOpen={setOpenLeaveApproverPicker}
                value={leaveApproverPickedId}
                setValue={setLeaveApproverPickedId}
                items={leaveApproverPicks}
                setItems={setLeaveApproverPicks}
                onSelectItem={onSelectLeaveApprover}
                containerStyle={styles.approverSelectContainerStyle}
                style={styles.leaveApproverSelect}
              />
            ),
          })}

          {rowRender({
            title: 'Leave Type :',
            zIndex: 1000,
            customComponent: (
              <DropDownPicker
                placeholder={'Select....'}
                open={openLeaveTypePicker}
                setOpen={setOpenLeaveTypePicker}
                value={leaveTypeSelected?.value}
                // setValue={setLeaveTypeSelected}
                items={leaveTypePicks}
                setItems={setLeaveTypePicks}
                onSelectItem={onSelectLeaveType}
                containerStyle={styles.approverSelectContainerStyle}
                style={styles.leaveApproverSelect}
              />
            ),
          })}

          {leaveTypeSelected?.label === compOff ? (
            <View style={styles.datePickersContainer}>
              <View style={styles.fromDatePicker}>
                <Text style={[styles.pickerTitle]}>From:</Text>
                <Pressable
                  onPress={openFromDatePicker}
                  style={[styles.openPickerButton, styles.fromButton]}>
                  <Text>{fromDate?.dateStr || 'Select'}</Text>
                </Pressable>
              </View>
              <View style={styles.toDatePicker}>
                <Text style={[styles.pickerTitle]}>To:</Text>
                <Pressable
                  disabled={!fromDate}
                  onPress={openToDatePicker}
                  style={[
                    styles.openPickerButton,
                    styles.toButton,
                    !fromDate && styles.lessOpacity60,
                  ]}>
                  <Text>{toDate?.dateStr || 'Select'}</Text>
                </Pressable>
              </View>
            </View>
          ) : null}

          <DateTimePickerModal
            maximumDate={new Date()}
            isVisible={fromDatePickerVisible}
            mode="date"
            onConfirm={fromConfirmHandler}
            onCancel={hideDatePicker.bind(null, setFromDatePickerVisible)}
          />
          <DateTimePickerModal
            date={fromDate ? fromDate?.dateObj : undefined}
            minimumDate={fromDate ? fromDate.dateObj : undefined}
            maximumDate={new Date()}
            isVisible={toDatePickerVisible}
            mode="date"
            onConfirm={toConfirmHandler}
            onCancel={hideDatePicker.bind(null, setToDatePickerVisible)}
          />
          {rowRender({
            title: 'Reason :',
            zIndex: 500,
            customComponent: (
              <TextInput
                style={styles.reasonTextInput}
                onChangeText={giveReason}
                multiline={true}
                value={reason}
              />
            ),
          })}

          {rowRender({
            title: 'Leave to Allocate :',
            customComponent: (
              <TextInput
                // keyboardType="number-pad"
                keyboardType="numeric"
                style={[
                  styles.leaveCountTextInput,
                  !leaveCountEditable && styles.lessOpacity60,
                ]}
                onChangeText={leaveCountAdjuster}
                editable={leaveCountEditable}
                value={`${leaveToAllocateCount}`}
              />
            ),
          })}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <View style={styles.buttonsContainer}>
          <Pressable style={styles.cancelButton} onPress={onCancelClick}>
            <Text style={[styles.cancelText]}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.submitButton} onPress={onSubmitClick}>
            <Text style={[styles.submitText]}>Submit</Text>
          </Pressable>
        </View>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderBackground} />
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default AllocateLeave;
