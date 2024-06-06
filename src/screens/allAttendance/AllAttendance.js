import {useCallback, useEffect, useState} from 'react';
import React from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomHeader from 'navigation/CustomHeader';
import styles from './AllAttendanceStyles';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {
  createAttendance,
  getAllEmployeeListForHR,
  getAllResourcesAttendence,
} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from 'colors/Colors';

import DayWiseCard from './DayWiseCard';
import MonthWiseCalnder from './MonthWise';
import Loader from 'component/loader/Loader';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import Modal from 'react-native-modal';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import Clock from 'assets/clock/clock.svg';
import CheckIcon from 'assets/checkIcon/checkIcon.svg';
import CrossIcon from 'assets/crossIcon/crossIcon.svg';
import jwt_decode from 'jwt-decode';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {FontFamily, FontSize} from 'constants/fonts';

const DAY_WISE = 'day wise';
const MONTH_WISE = 'month wise';

const AllAttendance = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  var decoded = token && jwt_decode(token);
  const isHRManager = decoded?.role?.includes('HR Manager') || false;
  const employeeID = decoded?.id;
  const dispatch = useDispatch();
  const todayDateObj = new Date(); // Current date and time
  const yesterdayDateObj = new Date(todayDateObj);
  yesterdayDateObj.setDate(todayDateObj.getDate() - 1);
  const yesterdayDateString = `${yesterdayDateObj.toLocaleString('default', {
    month: 'long',
  })} ${yesterdayDateObj.getDate()}, ${yesterdayDateObj.getFullYear()}`;

  const {employeeShift: employeeShiftDataObj} = useSelector(
    state => state.home,
  );

  const [selectedAttendanceType, setSelectedAttendanceType] = useState({
    type: DAY_WISE,
  });
  const [selectedDate, setSelectedDate] = useState({
    selectedDateObj: yesterdayDateObj,
    selectedDateStr: yesterdayDateString,
  });

  const [isDateSelecting, setIsDateSelecting] = useState(false);
  const [dayWiseData, setDayWiseData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [inTimePickerVisible, setInTimePickerVisible] = useState(false);
  const [outTimePickerVisible, setOutTimePickerVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [allEmployeeListForHR, setAllEmployeeListForHR] = useState([]);
  const [text, setText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [employeeWeekOffs, setEmployeeWeekOffs] = useState([]);
  const [attendanceDate, setAttendanceDate] = useState(null);
  const [selectDate, setSelectDate] = useState({
    dateStr: 'DD-MM-YYYY',
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectInTime, setSelectInTime] = useState({inTimeStr: 'HH:MM'});
  const [selectOutTime, setSelectOutTime] = useState({outTimeStr: 'HH:MM'});
  const [selectDateForInOut, setSelectDateForInOut] = useState();
  const [totalHours, setTotalHours] = useState();
  const [getInTime, setGetInTime] = useState();
  const [inTime, setInTime] = useState();
  const [outTime, setOutTime] = useState();
  const [isModalLoading, setIsModalLoading] = useState(false);

  const {holidayData} = useSelector(state => state.home);

  const fetchDayWiseData = useCallback(
    async dayWiseDate => {
      const today = new Date();
      today.setDate(today.getDate() - 1);
      const yesterdayDate = today.getDate();
      const yesterdayMonth = today.getMonth() + 1;
      const yesterdayYear = today.getFullYear();
      const yesterdayDateStr = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDate}`;

      try {
        setIsFetchingData(true);

        const resourceAttendance = await dispatch(
          getAllResourcesAttendence({
            token,
            date: dayWiseDate ? dayWiseDate : yesterdayDateStr,
          }),
        );

        if (resourceAttendance?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: resourceAttendance?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        } else {
          setDayWiseData(resourceAttendance.payload);
        }
      } catch (err) {
        console.error('err:', err);
      } finally {
        setIsFetchingData(false);
      }
    },
    [dispatch, navigation, token],
  );

  const allEmployeeForListHR = useCallback(async () => {
    try {
      setIsFetchingData(true);

      const employeeList = await dispatch(
        getAllEmployeeListForHR({
          token,
        }),
      );

      if (employeeList?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: employeeList?.error?.message,
          buttonText: 'Close',
          dispatch,
          navigation,
        });
      } else {
        setAllEmployeeListForHR(employeeList.payload);
      }
    } catch (err) {
      console.error('err:', err);
    } finally {
      setIsFetchingData(false);
    }
  }, [dispatch, navigation, token]);

  useEffect(() => {
    fetchDayWiseData();
    isHRManager && allEmployeeForListHR();
  }, [allEmployeeForListHR, isHRManager, fetchDayWiseData]);

  useEffect(() => {
    (async () => {
      const weekOffs = employeeShiftDataObj?.weeklyOff.split('_');

      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const finalWeekOffs = [];
      daysOfWeek?.map((el, index) => {
        if (weekOffs?.includes(el)) {
          finalWeekOffs.push(index);
        }
      });
      setEmployeeWeekOffs(finalWeekOffs);
    })();
  }, [dispatch, employeeID, token, employeeShiftDataObj?.weeklyOff]);

  // Subtract 1 day from the current date
  const onDateSelection = date => {
    const onSelectedDate = date.getDate();
    const selectedMonth = date.toLocaleString('default', {
      month: 'long',
    });
    const selectedYear = date.getFullYear();
    const selectedDateStr = `${selectedMonth} ${onSelectedDate}, ${selectedYear}`;
    setSelectedDate({selectedDateObj: date, selectedDateStr});

    const dateStrToSend = `${selectedYear}-${
      date.getMonth() + 1
    }-${onSelectedDate}`;
    fetchDayWiseData(dateStrToSend);
    setIsDateSelecting(false);
  };

  const onCancelDateSelection = () => {
    setIsDateSelecting(false);
  };

  const handleChangeEmpoyeeList = word => {
    setText(word);
    let employeeList = allEmployeeListForHR && allEmployeeListForHR?.data;
    let result = employeeList?.filter(
      item =>
        item?.firstName?.toLowerCase().includes(word?.toLowerCase()) ||
        item?.lastName?.toLowerCase().includes(word?.toLowerCase()) ||
        item?.employeeId.toString().includes(word.toString()),
    );
    setSearchResult(result);
  };
  const handleSubmitNewAttendance = async () => {
    if (!selectedEmployee?.employeeId) {
      alert('Please select an employee');
      return;
    } else if (!attendanceDate) {
      alert('Please select an Attendance Date.');
      return;
    } else if (!inTime) {
      alert('Please Select Check In Time.');
      return;
    } else if (!outTime) {
      alert('Please Select Check Out Time.');
      return;
    } else if (totalHours === 0) {
      alert('Check In Time and Check Out time can not be the same');
      return;
    }
    const body = {
      employeeId: selectedEmployee?.employeeId,
      attendanceDate: attendanceDate,
      inTime: inTime,
      outTime: outTime,
      totalHours: totalHours,
      isRegularized: isChecked ? 1 : 0,
    };

    try {
      setIsModalLoading(true);
      const createNewAttendance =
        token &&
        (await dispatch(
          createAttendance({
            token,
            body,
          }),
        ));

      if (createNewAttendance?.error) {
        alert(createNewAttendance.error.message);
      } else {
        Alert.alert('Success', 'Attendance created successfully!', [
          {
            text: 'Ok',
            onPress: () => {
              setDatePickerVisible(false);
              resetModalInputs();
              setShowModal(false);
            },
          },
        ]);
      }
    } catch (err) {
      console.log('errCreateNewAttendance:', err);
    } finally {
      setIsModalLoading(false);
    }
  };

  const renderItem = useCallback(({item}) => {
    return (
      <>
        <Pressable
          onPress={() => {
            setSelectedEmployee(item);
            setText(
              `${item.firstName ? item.firstName : ''} ${
                item.lastName ? item.lastName : ''
              }`,
            );

            setSearchResult([]);
          }}>
          <View style={[styles.searcheResultRow, styles.borderBottom]}>
            <Text style={styles.searchedName}>
              {item?.firstName ? item?.firstName : ''}{' '}
              {item?.lastName ? item?.lastName : ''}
            </Text>
            <Text style={styles.searchedEmpId}>{item?.employeeId}</Text>
          </View>
        </Pressable>
      </>
    );
  }, []);

  const keyExtractor = item => item.employeeId.toString();

  const handleConfirmDate = date => {
    // if (employeeWeekOffs?.includes(date.getDay())) {
    //   alert('You already have a weekend holiday on this day.');
    //   setDatePickerVisible(false);
    //   return;
    // }

    for (let i = 0; i < holidayData.length; i++) {
      const holidayObj = new Date(holidayData[i].holidayDate);

      if (
        holidayObj.getMonth() === date.getMonth() &&
        date.getDate() === holidayObj.getDate()
      ) {
        alert('You can not take a WFH on National holiday.');
        setDatePickerVisible(false);
        return;
      }
    }

    setSelectDateForInOut(date);

    const attendanceDateObj = date;
    setAttendanceDate(attendanceDateObj);
    let selectedDateNum = date.getDate();

    let selectedMonth = date.getMonth() + 1;
    let selectedYear = date.getFullYear();
    setDatePickerVisible(false);
    setSelectDate({
      dateStr: selectedDateNum + ' / ' + selectedMonth + ' / ' + selectedYear,
      startDateObj: date,
    });
  };

  const handleConfirmInTime = time => {
    setInTime(time);

    let inTimeStr = new Date(time.toString());
    let inTimeToSubtract = inTimeStr.getTime();

    setGetInTime(inTimeToSubtract);

    const inTimeStrFormat = time.toLocaleString();
    let time1 = inTimeStrFormat.split(',')[1];
    setSelectInTime({inTimeStr: time1});
    setInTimePickerVisible(false);
  };

  const handleConfirmOutTime = time => {
    setOutTime(time);

    const outTimeStrFormat = time.toLocaleString();
    let time1 = outTimeStrFormat.split(',')[1];
    setSelectOutTime({outTimeStr: time1});
    setOutTimePickerVisible(false);

    let outTimeStr = new Date(time.toString());
    let outTimeToSubstract = outTimeStr.getTime();

    const diffTime = outTimeToSubstract - getInTime;
    const totalHoursNum = Math.floor(diffTime / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffTime / (60 * 1000)) % 60;
    let totalTimeStr = `${totalHoursNum}.${totalMinutes}`;
    let totalTimeflot = +totalTimeStr;
    setTotalHours(totalTimeflot);
  };

  const resetModalInputs = () => {
    setText('');
    setSelectDate({
      dateStr: 'DD-MM-YYYY',
    });
    setSelectInTime({inTimeStr: 'HH:MM'});
    setSelectOutTime({outTimeStr: 'HH:MM'});
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Attendance"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <View style={styles.mainContainer}>
        <View style={styles.attendanceTypeContainer}>
          <View style={styles.typeContainer}>
            <Pressable
              onPress={() => {
                setSelectedAttendanceType({type: MONTH_WISE});
              }}
              style={[
                styles.leftType,
                {
                  backgroundColor:
                    selectedAttendanceType.type === MONTH_WISE
                      ? Colors.lighterBlue
                      : Colors.white,
                },
              ]}>
              <Text
                style={
                  selectedAttendanceType.type === MONTH_WISE &&
                  styles.textColorWhite
                }>
                Month Wise
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setSelectedAttendanceType({type: DAY_WISE});
              }}
              style={[
                styles.rightType,
                {
                  backgroundColor:
                    selectedAttendanceType.type === DAY_WISE
                      ? Colors.lighterBlue
                      : Colors.white,
                },
              ]}>
              <Text
                style={
                  selectedAttendanceType.type === DAY_WISE &&
                  styles.textColorWhite
                }>
                Day Wise
              </Text>
            </Pressable>
          </View>
        </View>
        {isHRManager && (
          <Pressable
            onPress={() => {
              setShowModal(true);
            }}
            style={styles.newAttBtnContainer}>
            <View style={styles.dateTextContainer}>
              <Text style={styles.selectedDateText}>New Attendance</Text>
            </View>
          </Pressable>
        )}
        {showModal ? (
          <TouchableWithoutFeedback
            onPress={() => {
              setShowModal(false);
            }}>
            <Modal
              backdropOpacity={0.6}
              animationIn={'slideInUp'}
              animationOut={'slideOutDown'}
              transparent={true}
              closeOnClick={true}
              isVisible={showModal}
              onBackdropPress={() => {
                setShowModal(false);
              }}
              onBackButtonPress={() => {
                setShowModal(false);
              }}>
              {isModalLoading && <Loader />}
              <View style={styles.modalContainer}>
                <Text style={styles.newAttendanceTitle}>New Attendance</Text>
                <Text style={styles.headerText}>Employee:</Text>
                <View style={styles.searchBoxContainer}>
                  <TextInput
                    placeholder="Employee.."
                    onChangeText={item => {
                      handleChangeEmpoyeeList(item);
                    }}
                    value={text}
                    style={styles.searchBoxForEmployee}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <Pressable onPress={() => setText('')}>
                    <CrossIcon
                      height={hp(2)}
                      stroke="gray"
                      width={hp(2)}
                      marginRight={wp(0.64)}
                    />
                  </Pressable>
                </View>

                {text?.length !== 0 && searchResult?.length !== 0 ? (
                  <View style={styles.searchResultBox}>
                    <FlatList
                      data={searchResult}
                      renderItem={renderItem}
                      showsVerticalScrollIndicator={false}
                      bounces={false}
                      keyExtractor={keyExtractor}
                    />
                  </View>
                ) : null}
                <Text style={styles.headerText}>Attendance Date:</Text>
                <DateTimePickerModal
                  // date={new Date()}
                  maximumDate={new Date()}
                  isVisible={datePickerVisible}
                  mode="date"
                  onConfirm={handleConfirmDate}
                  onCancel={() => {
                    setDatePickerVisible(false);
                  }}
                />
                <View style={{marginBottom: 15}}>
                  <TouchableOpacity
                    onPress={() => {
                      setDatePickerVisible(true);
                    }}>
                    <View style={styles.attendanceDate}>
                      <Text style={{color: 'gray'}}>
                        {selectDate?.dateStr
                          ? selectDate?.dateStr
                          : 'dd - mm - yyyy'}
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
                <DateTimePickerModal
                  date={selectDateForInOut}
                  isVisible={inTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirmInTime}
                  onCancel={() => {
                    setInTimePickerVisible(false);
                  }}
                />
                <DateTimePickerModal
                  date={selectDateForInOut}
                  isVisible={outTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirmOutTime}
                  onCancel={() => {
                    setOutTimePickerVisible(false);
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                  }}>
                  <Pressable
                    onPress={() => {
                      setInTimePickerVisible(true);
                    }}>
                    <View style={[styles.attendanceDate, {width: wp(35)}]}>
                      <Text style={{color: 'gray'}}>
                        {selectInTime?.inTimeStr && selectInTime.inTimeStr}
                      </Text>
                      <Clock
                        height={hp(2)}
                        stroke="gray"
                        width={hp(2)}
                        marginRight={wp(0.64)}
                      />
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setOutTimePickerVisible(true);
                    }}>
                    <View style={[styles.attendanceDate, {width: wp(35)}]}>
                      <Text style={{color: 'gray'}}>
                        {selectOutTime.outTimeStr && selectOutTime.outTimeStr}
                      </Text>
                      <Clock
                        height={hp(2)}
                        stroke="gray"
                        width={hp(2)}
                        marginRight={wp(0.64)}
                      />
                    </View>
                  </Pressable>
                </View>
                <View style={{marginBottom: 25, flexDirection: 'row'}}>
                  <Text style={{marginRight: 5}}>Is Regularized:</Text>
                  <Pressable
                    onPress={() => {
                      setIsChecked(!isChecked);
                    }}>
                    <View style={styles.checkBox}>
                      {isChecked && (
                        <CheckIcon
                          height={hp(2)}
                          stroke="black"
                          width={hp(2)}
                        />
                      )}
                    </View>
                  </Pressable>
                </View>
                <View style={styles.buttonContainer}>
                  <Pressable onPress={setShowModal.bind(null, false)}>
                    <View
                      style={[
                        styles.btn,
                        {borderColor: 'gray', borderWidth: 1},
                      ]}>
                      <Text
                        style={{
                          fontFamily: FontFamily.RobotoMedium,
                          fontSize: FontSize.h14,
                        }}>
                        Cancel
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable onPress={handleSubmitNewAttendance}>
                    <View
                      style={[
                        styles.btn,
                        {backgroundColor: Colors.lovelyPurple},
                      ]}>
                      <Text
                        style={{
                          color: Colors.white,
                          fontFamily: FontFamily.RobotoMedium,
                          fontSize: FontSize.h14,
                        }}>
                        Save
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </TouchableWithoutFeedback>
        ) : null}

        {selectedAttendanceType.type === DAY_WISE ? (
          <View style={{flex: 1, marginBottom: 20}}>
            <Pressable
              onPress={() => {
                setIsDateSelecting(true);
              }}
              style={styles.selectedDateContainer}>
              <View style={styles.dateTextContainer}>
                <Text style={styles.selectedDateText}>
                  {selectedDate?.selectedDateStr}
                </Text>
              </View>
              <View style={styles.dropdownIconContainer}>
                <MonthImages.DropDownIconSVG
                  color={Colors.lightBlack}
                  height={16}
                  width={16}
                />
              </View>
            </Pressable>

            <DateTimePickerModal
              maximumDate={new Date()}
              isVisible={isDateSelecting}
              mode="date"
              onConfirm={onDateSelection}
              onCancel={onCancelDateSelection}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              contentContainerStyle={{flexGrow: 1}}
              style={{}}
              data={dayWiseData}
              renderItem={({item, index}) => {
                return <DayWiseCard item={item} />;
              }}
              keyExtractor={(item, index) => index}
            />
          </View>
        ) : (
          <MonthWiseCalnder />
        )}

        {isFetchingData ? <Loader /> : null}
      </View>
    </>
  );
};

export default AllAttendance;
