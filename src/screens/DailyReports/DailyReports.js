import CustomHeader from 'navigation/CustomHeader';
import {SafeAreaView} from 'react-native';
import styles from './DailyReportsStyles';
import React, {useEffect, useState} from 'react';
import WorkModeTabContent from './WorkModeTab';

import LeaveTabContent from './LeaveTab';
import AttendanceTab from './AttendanceTab';
import HeaderTab from './HeaderTab';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllDailyEmployees,
  getAllEmployeesForHR,
  getDailyEmployeesCount,
  getLeaveReport,
  getWorkModeEmployees,
} from 'redux/homeSlice';
import {sortArrayOfObjectsOnProperty} from 'utils/utils';

const ON_LEAVE = 'On Leave';
const ABSENT = 'Absent';
const WFH = 'WFH';
const ACTIVE = 'Active';
const OFFICE = 'Office';

let leaveTabRendered = false;
let workModeTabRendered = false;

const DailyReports = ({navigation}) => {
  const {userToken: token} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [selectedHeaderTab, setSelectedHeaderTab] = useState('attendance');
  const [isLoadingAllEmployees, setIsLoadingAllEmployees] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [employeeStatusData, setEmployeeStatusData] = useState({});
  const [allEmployees, setAllEmployees] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoadingLeave, setIsLoadingLeave] = useState(false);
  const [isLoadingWorkMode, setIsLoadingWorkMode] = useState(false);
  const [leavesCount, setLeavesCount] = useState({});
  const [leaves, setLeaves] = useState({});
  const [workModeEmployees, setWorkModeEmployees] = useState([]);
  const [itemsEmployeePicker, setItemsEmployeePicker] = useState([]);

  const handleLeaveDateStartConfirm = date => {
    setStartDate(date);
  };

  const handleLeaveDateEndConfirm = date => {
    setEndDate(date);
    leaveTabRendered = false;
  };

  useEffect(() => {
    const attendanceTabData = async () => {
      const todayDateObj = new Date();
      const todayDate = todayDateObj.getDate();
      const currentMonth = todayDateObj.getMonth() + 1;
      const currentYear = todayDateObj.getFullYear();

      const todayDateStr = `${currentYear}-${currentMonth}-${todayDate}`;
      try {
        setIsLoadingDashboard(true);
        setIsLoadingAllEmployees(true);

        const {payload: todayAttendanceStatus} = await dispatch(
          getDailyEmployeesCount({token, date: todayDateStr}),
        );
        setIsLoadingDashboard(false);
        setEmployeeStatusData({
          employeesActive: todayAttendanceStatus.allActiveEmployee,
          employeesOffice: todayAttendanceStatus.employeeInOffice,
          employeesWFH: todayAttendanceStatus.employeeInWfh,
          employeesLeave: todayAttendanceStatus.employeeInLeave,
          employeesAbsent: todayAttendanceStatus.absentEmployee,
          percentageActive: 100,
          percentageOffice:
            (todayAttendanceStatus.employeeInOffice /
              todayAttendanceStatus.allActiveEmployee) *
            100,
          percentageWFH:
            (todayAttendanceStatus.employeeInWfh /
              todayAttendanceStatus.allActiveEmployee) *
            100,
          percentageLeave:
            (todayAttendanceStatus.employeeInLeave /
              todayAttendanceStatus.allActiveEmployee) *
            100,
          percentageAbsent:
            (todayAttendanceStatus.absentEmployee /
              todayAttendanceStatus.allActiveEmployee) *
            100,
        });

        const {payload: responseEmployees} = await dispatch(
          getAllDailyEmployees({token, date: todayDateStr}),
        );

        const employeeData = {
          [ACTIVE]: responseEmployees.activeEmployees,
          [OFFICE]: responseEmployees.employeesInOffice,
          [WFH]: responseEmployees.employeesInWfh,
          [ON_LEAVE]: responseEmployees.employeesOnLeave,
          [ABSENT]: responseEmployees.absentEmployee,
        };

        for (let key in employeeData) {
          const sortedArr = sortArrayOfObjectsOnProperty(
            employeeData[key],
            'employeeFirstName',
          );

          employeeData[key] = sortedArr;
        }

        setAllEmployees(employeeData);
      } catch (err) {
        // console.log('reportsErr:', err);
      } finally {
        setIsLoadingAllEmployees(false);
        setIsLoadingDashboard(false);
      }
    };

    attendanceTabData();
  }, [dispatch, token]);

  useEffect(() => {
    const getLeavesData = async () => {
      const startDateDay = startDate.getDate();
      const startDateMonth = startDate.getMonth() + 1;
      const startDateYear = startDate.getFullYear();
      const endDateDay = endDate.getDate();
      const endDateMonth = endDate.getMonth() + 1;
      const endDateYear = endDate.getFullYear();
      const startDateString = `${startDateYear}-${startDateMonth}-${startDateDay}`;
      const endDateString = `${endDateYear}-${endDateMonth}-${endDateDay}`;
      try {
        setIsLoadingLeave(true);
        const allLeaves = await dispatch(
          getLeaveReport({
            token,
            dateStart: startDateString,
            dateEnd: endDateString,
          }),
        );

        const finalLeaves = allLeaves.payload;
        const responseLeavesCount = {
          all: finalLeaves.allLeaveCount,
          open: finalLeaves.openLeaveCount,
          approve: finalLeaves.approvedLeaveCount,
          dismiss: finalLeaves.dismissedLeaveCount,
          reject: finalLeaves.rejectedLeaveCount,
        };

        setLeavesCount(responseLeavesCount);
        const responseLeaves = {
          all: finalLeaves.allLeave,
          open: finalLeaves.openLeave,
          approve: finalLeaves.approvedLeave,
          dismiss: finalLeaves.dismissedLeave,
          reject: finalLeaves.rejectedLeave,
        };

        for (let key in responseLeaves) {
          const sortedArr = sortArrayOfObjectsOnProperty(
            responseLeaves[key],
            'employeeFirstName',
          );

          responseLeaves[key] = sortedArr;
        }
        setLeaves(responseLeaves);
      } catch (err) {
        // console.log('errorTodayLeaves:', err);
      } finally {
        setIsLoadingLeave(false);
      }
    };
    if (selectedHeaderTab === 'leave' && !leaveTabRendered) {
      getLeavesData();
      leaveTabRendered = true;
    }
  }, [dispatch, endDate, token, startDate, selectedHeaderTab]);

  useEffect(() => {
    const workModeTabData = async () => {
      const fromDate = new Date();
      const toDate = new Date();
      const startDateDay = fromDate.getDate();
      const startDateMonth = fromDate.getMonth() + 1;
      const startDateYear = fromDate.getFullYear();
      const endDateDay = toDate.getDate();
      const endDateMonth = toDate.getMonth() + 1;
      const endDateYear = toDate.getFullYear();
      const startDateString = `${startDateYear}-${startDateMonth}-${startDateDay}`;
      const endDateString = `${endDateYear}-${endDateMonth}-${endDateDay}`;
      try {
        setIsLoadingWorkMode(true);
        const workModeEmployeesResponse = await dispatch(
          getWorkModeEmployees({
            token,
            dateStart: startDateString,
            dateEnd: endDateString,
          }),
        );

        const finalWorkMode = workModeEmployeesResponse.payload;

        const {payload} = await dispatch(getAllEmployeesForHR({token}));

        const finalItems = payload.map(employee => ({
          label: employee.employee.split('/')[1],
          value: employee.employeeId,
        }));

        setWorkModeEmployees(finalWorkMode);
        setItemsEmployeePicker(finalItems);
      } catch (err) {
        // console.log('errorTodayLeaves:', err);
      } finally {
        setIsLoadingWorkMode(false);
      }
    };

    if (selectedHeaderTab === 'work mode' && !workModeTabRendered) {
      workModeTabData();
      workModeTabRendered = true;
    }
  }, [selectedHeaderTab, dispatch, token]);

  const changeTabHandler = tab => {
    setSelectedHeaderTab(tab);
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Daily Reports"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <SafeAreaView
        // contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <HeaderTab
          selectedHeaderTab={selectedHeaderTab}
          changeTabHandler={changeTabHandler}
        />
        {selectedHeaderTab === 'attendance' && (
          <AttendanceTab
            isLoadingAllEmployees={isLoadingAllEmployees}
            isLoadingDashboard={isLoadingDashboard}
            employeeStatusData={employeeStatusData}
            allEmployees={allEmployees}
          />
        )}
        {selectedHeaderTab === 'leave' && (
          <LeaveTabContent
            isLoadingLeave={isLoadingLeave}
            leavesCount={leavesCount}
            leaves={leaves}
            selectStartDate={handleLeaveDateStartConfirm}
            selectEndDate={handleLeaveDateEndConfirm}
          />
        )}
        {selectedHeaderTab === 'work mode' && (
          <WorkModeTabContent
            workModeData={workModeEmployees}
            itemsEmployeePickerList={itemsEmployeePicker}
            isLoading={isLoadingWorkMode}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default DailyReports;
