import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SearchIconSVG from 'assets/newDashboardIcons/search.svg';
// import HouseIcon from 'assets/allImage/house/house-building.svg';
import {Colors} from 'colors/Colors';
import WorkModeEmployeeCard from './WorkModeEmployeeCard';
import styles from './DailyReportsStyles';

import CalenderIcon from 'assets/newDashboardIcons/calendar-day.svg';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import Radio from 'component/Radio/Radio';
import SelectDaysWFO from './SelectDaysWFO';
import Buttons from './Buttons';
import {sortArrayOfObjectsOnProperty} from 'utils/utils';

const WorkModeTabContent = ({
  workModeData,
  itemsEmployeePickerList,
  isLoading,
}) => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [openEmployeePicker, setOpenEmployeePicker] = useState(false);
  const [itemsEmployeePicker, setItemsEmployeePicker] = useState();
  const [valueEmployeePicker, setValueEmployeePicker] = useState(null);
  const [openCreateWMModal, setOpenCreateWMModal] = useState(false);
  const [isWFO, setIsWFO] = useState(false);
  const [isWFH, setIsWFH] = useState(false);

  const [startDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const workModeRenderData = ({item}) => {
    if (!item) {
      return null;
    }
    const employeeName = `${
      item?.employeeFirstName ? item?.employeeFirstName + ' ' : ''
    }${item?.employeeMiddleName ? item?.employeeMiddleName + ' ' : ''}${
      item?.employeeLastName ? item.employeeLastName : ''
    }`;

    const managerName = `${
      item.managerFirstName ? item.managerFirstName + ' ' : ''
    }${item.managerMiddleName ? item.managerMiddleName + ' ' : ''}${
      item.managerLastName ? item.managerLastName : ''
    }`;

    const fromDate = new Date(item.fromDate);
    const fromDay = fromDate.getDate();
    const fromMonth = fromDate.toLocaleDateString('en-US', {month: 'short'});
    const fromYear = fromDate.getFullYear();
    const fromDateStr = `${fromMonth} ${
      fromDay > 9 ? fromDay : '0' + fromDay
    },${fromYear}`;

    const toDate = new Date(item.toDate);
    const toDay = toDate.getDate();
    const toMonth = toDate.toLocaleDateString('en-US', {month: 'short'});
    const toYear = toDate.getFullYear();
    const toDateStr = `${toMonth} ${toDay > 9 ? toDay : '0' + toDay},${toYear}`;
    return (
      <WorkModeEmployeeCard
        employeeName={employeeName}
        rmName={managerName}
        employeeId={item.employeeId}
        department={item.department}
        from={fromDateStr}
        to={toDateStr}
        mode={item.workMode}
        monday={item.monday}
        tuesday={item.tuesday}
        wednesday={item.wednesday}
        thursday={item.thursday}
        friday={item.friday}
        saturday={item.saturday}
        sunday={item.sunday}
      />
    );
  };

  useEffect(() => {
    const workModeDataCopy = [...workModeData];
    // const workModeDataCopy = workModeData.slice(0, 160);

    const itemsEmployeePickerListCopy = [...itemsEmployeePickerList];
    const sortedArray = sortArrayOfObjectsOnProperty(
      workModeDataCopy,
      'employeeFirstName',
    );
    setItemsEmployeePicker(itemsEmployeePickerListCopy);
    setFilteredEmployees([...sortedArray]);
  }, [workModeData, itemsEmployeePickerList]);

  const searchEmployeeHandler = searchTerm => {
    const searchedEmployees = workModeData.filter(employeee => {
      return (
        employeee.employeeFirstName
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase()) ||
        employeee.employeeMiddleName
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase()) ||
        employeee.employeeLastName
          ?.toLowerCase()
          ?.includes(searchTerm.toLowerCase())
      );
    });

    const searchedEmployeesCopy = [...searchedEmployees];
    const sortedArray = sortArrayOfObjectsOnProperty(
      searchedEmployeesCopy,
      'employeeFirstName',
    );

    setFilteredEmployees(sortedArray);
  };

  const workModeModalClosedHandler = () => {
    setOpenCreateWMModal(false);
  };

  const onSelectEmployeePicker = () => {};

  const handleStartConfirm = () => {
    setStartDatePickerVisible(false);
  };

  const hideDatePicker = pickerToClose => {
    pickerToClose(false);
  };

  const handleEndConfirm = () => {
    setEndDatePickerVisible(false);
  };

  return (
    <>
      <View style={styles.workModeHeader}>
        <View style={[styles?.searchContainer, styles.paddingHorizontal10]}>
          <TextInput
            onChangeText={searchEmployeeHandler}
            placeholder="Search"
            style={styles?.textInput}
          />
          <SearchIconSVG color={Colors.lightGray1} height={22} width={22} />
        </View>

        {/* <Pressable
          onPress={createModeHandler}
          style={styles.createWorkModeButton}>
          <HouseIcon height={19} width={19} fill={Colors.lovelyPurple} />
          <Text style={styles.createText}>Create</Text>
        </Pressable> */}

        <Modal
          animationType="slide"
          transparent={true}
          closeOnClick={true}
          isVisible={openCreateWMModal}
          onBackdropPress={workModeModalClosedHandler}
          onBackButtonPress={workModeModalClosedHandler}
          onRequestClose={workModeModalClosedHandler}
          style={styles.modal}>
          <View style={styles.modalChildContainer}>
            <View style={styles.modalFirstChild}>
              <Text style={styles.workModeTitle}>Create Work Mode</Text>
              <Text style={styles.title}>Employee:</Text>
              <DropDownPicker
                placeholder={'Select....'}
                open={openEmployeePicker}
                value={valueEmployeePicker}
                items={itemsEmployeePicker}
                setOpen={setOpenEmployeePicker}
                setValue={setValueEmployeePicker}
                setItems={setItemsEmployeePicker}
                onSelectItem={onSelectEmployeePicker}
                searchable={true}
                searchPlaceholder="Search..."
                searchContainerStyle={styles.searchContainerStyleEmployeePicker}
                searchTextInputStyle={styles.searchTextInputStyle}
                style={styles.stylesEmployeePicker}
                containerStyle={styles.containerStyleEmployeePicker}
                listItemLabelStyle={styles.listItemLabelStyleEmployeePicker}
                labelStyle={styles.labelStyleEmployeePicker}
                dropDownStyle={styles.dropDownStyleEmployeePicker}
                dropDownContainerStyle={[
                  styles.dropDownContainerStyleEmployeePicker,
                ]}
                itemSeparatorStyle={{backgroundColor: Colors.grey}}
                itemSeparator={true}
              />
              <Text style={styles.title}>Work Mode:</Text>
              <View style={styles.modesContainer}>
                <View style={styles.mode}>
                  <Text style={styles.checkBoxModeText}>Work From Home</Text>
                  <Pressable
                    onPress={() => {
                      setIsWFH(prevWFH => !prevWFH);
                      if (isWFO) {
                        setIsWFO(false);
                      }
                    }}>
                    <Radio isActive={isWFH} />
                  </Pressable>
                </View>
                <View style={styles.mode}>
                  <Text style={styles.checkBoxModeText}>Work From Office</Text>
                  <Pressable
                    onPress={() => {
                      setIsWFO(prevWFO => !prevWFO);
                      if (isWFH) {
                        setIsWFH(false);
                      }
                    }}>
                    <Radio isActive={isWFO} />
                  </Pressable>
                </View>
              </View>
              {/* DATES START */}
              <View style={styles.datesContainer}>
                <View style={styles.fromDateContainer}>
                  <Text style={styles.dateTitleText}>From Date :</Text>
                  <Pressable
                    onPress={() => {
                      setStartDatePickerVisible(true);
                    }}>
                    <View style={styles.fromDateSelect}>
                      <Text style={styles.fromDatePlaceholder}>Select</Text>
                      <CalenderIcon
                        fill={Colors.lightGray1}
                        height={hp(2)}
                        width={hp(2)}
                        marginRight={wp(0.64)}
                      />
                    </View>
                  </Pressable>
                </View>

                <View style={styles.toDateMainContainer}>
                  <Text style={styles.toDateTitleText}>To Date :</Text>
                  <Pressable
                    onPress={() => {
                      setEndDatePickerVisible(true);
                    }}>
                    <View style={styles.toDateSelect}>
                      <Text style={styles.toDatePlaceholder}>Select</Text>
                      <CalenderIcon
                        fill={Colors.lightGray1}
                        height={hp(2)}
                        width={hp(2)}
                        marginRight={wp(0.64)}
                      />
                    </View>
                  </Pressable>
                </View>
              </View>

              <View>
                <DateTimePickerModal
                  isVisible={startDatePickerVisible}
                  mode="date"
                  onConfirm={handleStartConfirm}
                  onCancel={hideDatePicker.bind(
                    null,
                    setStartDatePickerVisible,
                  )}
                />
                <DateTimePickerModal
                  isVisible={endDatePickerVisible}
                  mode="date"
                  onConfirm={handleEndConfirm}
                  onCancel={hideDatePicker.bind(null, setEndDatePickerVisible)}
                />
              </View>
              {/* DATES END */}
              {isWFO ? (
                <SelectDaysWFO isPaddingHorizontal={{paddingHorizontal: 0}} />
              ) : null}
            </View>
            <Buttons modalCloseHandler={workModeModalClosedHandler} />
          </View>
        </Modal>
      </View>
      <View style={styles.workStatusContainer}>
        <View style={styles.typeOfWork}>
          <View style={[styles.circle, styles.homeCircle]} />
          <Text>Home</Text>
        </View>
        <View style={styles.typeOfWork}>
          <View style={[styles.circle, styles.officeCircle]} />
          <Text>Office</Text>
        </View>
        <View style={styles.typeOfWork}>
          <View style={[styles.circle, styles.weekOffCircle]} />
          <Text>Week Off</Text>
        </View>
      </View>
      {isLoading ? (
        <View style={styles.fullContentLoaderContainer}>
          <ActivityIndicator size="large" color={Colors.dune} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          data={filteredEmployees}
          renderItem={workModeRenderData}
          keyExtractor={(_, index) => index}
          style={styles.employeeFlatlist}
        />
      )}
    </>
  );
};

export default WorkModeTabContent;
