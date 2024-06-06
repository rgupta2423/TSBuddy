import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  Image,
  SafeAreaView,
  Platform,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import RNDateTimePicker from '@react-native-community/datetimepicker';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  DatePickerModal,
  registerTranslation,
  en,
} from 'react-native-paper-dates';
registerTranslation('en-GB', en);
import styles from '../screens/leaves/LeaveStyles';
import {getLeaveDetails, getResourcesEmployeesLeaves} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {LeaveDetailsScreen, LeaveApplyScreen} from 'navigation/Route';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import LeavesListItem from './LeavesListItem';
import {renderNoLeaves} from 'utils/utils';
import Loader from 'component/loader/Loader';
import CrossIcon from 'assets/crossIcon/crossIcon.svg';
import {Colors} from 'colors/Colors';
const LeavesList = props => {
  const {
    fromResource,
    getLeaveCount,
    fromOpenLeave,
    resourceEmployeeID,
    employeeId,
    fromLeaveDetails,
  } = props;

  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  const dispatch = useDispatch();
  const isFocussed = useIsFocused();
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  // const [startFilterCalenderOpen, setStartFilterCalenderOpen] = useState(false);
  // const [endFilterCalenderOpen, setEndFilterCalenderOpen] = useState(false);

  const [filteredStartDate, setFilteredStartDate] = useState(null);
  const [filteredEndDate, setFilteredEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employeeLeaves, setEmployeesLeaves] = useState([]);
  const [filterData, setFilter] = useState([]);
  const [showCalendarModalAndroid, setCalendarModalAndroid] = useState(false);
  const [showCalendarModal, setCalendarModal] = useState(false);

  console.log('filterData', filterData.length);
  useEffect(() => {
    if (isFocussed && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [isFocussed]);

  useEffect(() => {
    if (isFocussed && !isGuestLogin) {
      (async () => {
        try {
          setLoading(true);
          const leavesData = fromResource
            ? await dispatch(
                getResourcesEmployeesLeaves({
                  token,
                  empID: resourceEmployeeID,
                }),
              )
            : await dispatch(
                getLeaveDetails({
                  token,
                  empID: employeeId,
                }),
              );

          const sortLeaveData = !fromResource
            ? leavesData?.payload?.sort((a, b) => {
                return (
                  new Date(b.fromDate).getTime() -
                  new Date(a.fromDate).getTime()
                );
              })
            : leavesData?.payload?.employeeLeaves?.sort((a, b) => {
                return (
                  new Date(b.fromDate).getTime() -
                  new Date(a.fromDate).getTime()
                );
              });

          const openLeaves = {rhOpen: 0, earnedOpen: 0};

          // const empLeaves = leavesData?.payload;
          // const resourceLeaves = leavesData?.payload?.employeeLeaves;

          if (!fromResource) {
            for (const leave of sortLeaveData) {
              if (
                leave?.leaveType?.toLowerCase() === 'earned leave' &&
                leave.status.toLowerCase() === 'open'
              ) {
                const totalDays = leave?.totalLeaveDays;
                openLeaves.earnedOpen += totalDays;
              }
              if (
                leave?.leaveType?.toLowerCase() === 'restricted holiday' &&
                leave.status.toLowerCase() === 'open'
              ) {
                const totalDays = leave?.totalLeaveDays;
                openLeaves.rhOpen += totalDays;
              }
            }
          }

          fromLeaveDetails && fromLeaveDetails(openLeaves);
          // setEmployeesLeaves(fromResource ? resourceLeaves : empLeaves);
          setEmployeesLeaves(sortLeaveData);
          setFilter(sortLeaveData);
          setLoading(false);
          let count = 0;
          leavesData?.payload?.employeeLeaves?.forEach(element => {
            if (element.status?.toLowerCase() === 'open') {
              count++;
            }
          });
          fromResource && getLeaveCount(count);

          if (leavesData?.error) {
            ShowAlert({
              messageHeader: ERROR,
              messageSubHeader: leavesData?.error?.message,
              buttonText: 'Close',
              dispatch,
            });
          }
        } catch (err) {
          console.log('errLeaves:', err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [
    token,
    isFocussed,
    dispatch,
    fromLeaveDetails,
    fromResource,
    isGuestLogin,
    getLeaveCount,
    resourceEmployeeID,
    employeeId,
  ]);

  const handleNavigation = item => {
    if (item.status === 'Open') {
      navigation.navigate(LeaveApplyScreen, {
        ...item,
        resourceEmployeeID,
        fromOpenLeave,
        fromResource,
      });
    } else {
      navigation.navigate(LeaveDetailsScreen, item);
    }
  };

  const renderItem = ({item}) => {
    // if (filteredStartDate && filteredEndDate) {
    //   // const shouldRender =
    //   //   filteredStartDate?.getTime() >= new Date(item?.fromDate).getTime();
    //   const shouldRender =
    //     new Date(item?.fromDate) > filteredStartDate &&
    //     new Date(item?.fromDate) < filteredEndDate;
    //   if (!shouldRender) {
    //     return null;
    //   }
    // }

    return (
      <LeavesListItem
        item={item}
        onClickItemHandler={() => handleNavigation(item)}
      />
    );
  };

  const onDismiss = React.useCallback(() => {
    setCalendarModalAndroid(false);
  }, [setCalendarModalAndroid]);

  const onConfirm = React.useCallback(
    ({startDate, endDate}) => {
      setFilteredStartDate(startDate);
      setFilteredEndDate(endDate);
      setCalendarModalAndroid(false);
      const data = employeeLeaves?.filter(
        item =>
          new Date(item?.fromDate) > startDate &&
          new Date(item?.fromDate) < endDate,
      );
      setFilter(data);
    },
    [employeeLeaves],
  );

  if (loading) {
    return <Loader />;
  }

  const applyCalendarRange = () => {
    setCalendarModal(false);
    if (filteredStartDate && filteredEndDate) {
      const data = employeeLeaves?.filter(
        item =>
          new Date(item?.fromDate) > filteredStartDate &&
          new Date(item?.fromDate) < filteredEndDate,
      );
      setFilter(data);
    } else {
      setFilter(employeeLeaves);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.mainContainerExcludeHeader}>
        <View style={styles.resetDateButtonContainer}>
          <Pressable
            style={styles.filterResetButton}
            onPress={() => {
              setFilter(employeeLeaves);
              setFilteredEndDate(null);
              setFilteredStartDate(null);
            }}>
            <Text style={styles.resetText}>Reset</Text>
          </Pressable>
        </View>

        {isGuestLogin ? (
          renderNoLeaves({styles, message: 'No Leaves Applied.'})
        ) : filterData?.length > 0 ? (
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={filterData}
            renderItem={renderItem}
            keyExtractor={(_, index) => index}
          />
        ) : (
          renderNoLeaves({styles, message: 'No Leaves Applied.'})
        )}
        {/* {startFilterCalenderOpen ? (
          <DateTimePickerModal
            isVisible={startFilterCalenderOpen}
            mode="date"
            onConfirm={date => {
              setFilteredStartDate(date);
              setStartFilterCalenderOpen(false);
              setEndFilterCalenderOpen(true);
            }}
            onCancel={() => {
              setStartFilterCalenderOpen(false);
            }}
          />
        ) : null}
        {endFilterCalenderOpen ? (
          <DateTimePickerModal
            isVisible={endFilterCalenderOpen}
            key={endFilterCalenderOpen}
            mode="date"
            onConfirm={date => {
              setFilteredEndDate(date);
              setEndFilterCalenderOpen(false);
            }}
            onCancel={() => {
              setEndFilterCalenderOpen(false);
            }}
          />
        ) : null} */}
        <Pressable
          onPress={() => {
            // setStartFilterCalenderOpen(true);
            if (Platform.OS === 'ios') {
              setCalendarModal(true);
            } else {
              setCalendarModalAndroid(true);
            }
          }}
          style={styles.filterButton}>
          <Image source={MonthImages.filterIcon2x} style={styles.filterIcon} />
        </Pressable>
        <DatePickerModal
          locale={'en-GB'}
          mode="range"
          visible={showCalendarModalAndroid}
          onDismiss={onDismiss}
          dates={new Date()}
          onConfirm={onConfirm}
          inputFormat="DD/MM/YYYY"
          saveLabel="Apply" // optional
          label="Select range" // optional
          startLabel="From" // optional
          endLabel="To" // optional
        />
        <Modal isVisible={showCalendarModal} style={styles.filterCalendarModal}>
          <View style={styles.calendarModalContainer}>
            <View style={styles.calendarSubContainer}>
              <View style={styles.filterCalendarsModalHeader}>
                <Pressable
                  onPress={() => {
                    setCalendarModal(false);
                  }}>
                  <CrossIcon
                    height={30}
                    width={30}
                    color={Colors.black}
                    style={styles.crossIcon}
                  />
                </Pressable>
                {/* <Pressable
                  style={styles.filterResetButton}
                  onPress={() => {
                    setFilteredEndDate(null);
                    setFilteredStartDate(null);
                  }}>
                  <Text style={styles.resetText}>Reset</Text>
                </Pressable> */}
              </View>
              <Text style={styles.calendarTitleText}>From</Text>
              <RNDateTimePicker
                testID="dateTimePicker"
                value={filteredStartDate || new Date()}
                mode={'date'}
                display={'inline'}
                // minimumDate={firstDay}
                onChange={(event, selectedDate) => {
                  setFilteredStartDate(selectedDate);
                }}
              />
              <Text style={styles.calendarTitleText}>To</Text>
              <RNDateTimePicker
                minimumDate={filteredStartDate}
                testID="dateTimePicker"
                value={filteredEndDate || new Date()}
                // maximumDate={filteredStartDate}
                mode={'date'}
                display={'inline'}
                // is24Hour={true}
                // showTime={{ use12Hours: true, format: "HH:mm a" }}
                onChange={(event, selectedDate) => {
                  setFilteredEndDate(selectedDate);
                }}
              />
            </View>
            <Pressable onPress={applyCalendarRange}>
              <View style={styles.actionSheetBtnContainer}>
                <Text style={styles.actionSheetBtnText}>Apply</Text>
              </View>
            </Pressable>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default LeavesList;
