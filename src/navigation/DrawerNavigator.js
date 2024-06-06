import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP as wp} from 'utils/Responsive';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from 'screens/home/Home';
import Profile from 'screens/profile/Profile';
import ResourcesDetails from 'screens/Resources/ResourcesDetails';
import Resources from 'screens/Resources/Resources';
import jwt_decode from 'jwt-decode';

// import AttendenceTab from 'screens/Resources/AttendenceTab';

import Attendence from 'screens/attendence/Attendence';
import Holidays from 'screens/holidays/Holidays';
import Leaves from 'screens/leaves/Leaves';
import SalarySlip from 'screens/salarySlip/SalarySlip';
import {useSelector} from 'react-redux';
import CustomDrawer from './CustomDrawer';
import {Colors} from 'colors/Colors';
import Header from 'component/header/Header';
import UserProfile from 'component/useProfile/UserProfile';
import RequestLunch from 'screens/requestLunch/RequestLunch';
import UserDetail from 'component/useProfile/UserDetail';
import SalaryDetail from 'screens/salarySlip/SalaryDetail';
import ApplyLeave from 'screens/leaves/ApplyLeave';
import LeaveDetails from 'screens/leaves/LeaveDetails';
import SalaryPdf from 'screens/salarySlip/SalaryPdf';

// plus.imageset
import {
  HomeScreen,
  ProfileScreen,
  AttendenceScreen,
  HolidaysScreen,
  LeavesScreen,
  SalarySlipTab,
  SalaryDetailsScreen,
  SalaryPDFDownloadScreen,
  RequestLunchScreen,
  LeaveApplyScreen,
  employeeProfileScreen,
  LeaveDetailsScreen,
  ResourcesDetailsScreen,
  ResourcesScreen,
  RegularzitionScreen,
  LunchRequestsScreen,
  LeaveApplicationForApproverName,
  WFHApplicationForApproverName,
  LeaveAllocationMain,
  ApplyLeaveAllocationRequest,
} from './Route';
import {FontFamily} from 'constants/fonts';
import AttaindanceDetails from 'screens/Resources/AttaindanceDetails';

import MenuSVG from 'assets/newDashboardIcons/bars-sort.svg';
import Regularization from 'screens/attendence/Regularization';
import RegularisationTabDetails from 'screens/Resources/RegularisationTabDetails';
import LunchRequests from 'screens/lunchRequests/LunchRequests';
import AllAttendance from 'screens/allAttendance/AllAttendance';
import ApplyWFH from 'screens/applyWFH.js/ApplyWFH';
import Policies from 'screens/policies/Policies';
import EmployeeHandbook from 'screens/EmployeeHandbook/EmployeeHandbook';
import PoliciesDetails from 'screens/policies/PoliciesDetails';
import LeaveApplication from 'screens/leaveApplication/LeaveApplication';
import WFHApplication from 'screens/leaveApplication/WFHApplication';
import RegularizationApplication from 'screens/leaveApplication/RegularizationApplication';
import ApplicationDetailsLayout from 'screens/leaveApplication/ApplicationDetailsLayout';
import DailyReports from 'screens/DailyReports/DailyReports';
import ApplyLeaveByManager from 'screens/LeaveApplicationManager/ApplyLeaveByManager';
import ApplyWFHByManager from 'screens/LeaveApplicationManager/ApplyWFHByManager';
import LeaveAllocation from 'screens/LeaveAllocation/RequestLeaveAllocation';
import AllocateLeave from 'screens/LeaveAllocation/AllocateLeave';
import HeaderTabsArrow from 'component/header/HeaderTabsArrow';

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AttendenceStack = createNativeStackNavigator();
const HolidaysStack = createNativeStackNavigator();
const LeavesStack = createNativeStackNavigator();
const LeavesAllocationStack = createNativeStackNavigator();
const SalarySlipStack = createNativeStackNavigator();
const ResourcesStack = createNativeStackNavigator();
const AllAttendanceStack = createNativeStackNavigator();
const CalendarStack = createNativeStackNavigator();
const LunchRequestsStack = createNativeStackNavigator();
const ApplyWfhStack = createNativeStackNavigator();
const PoliciesStack = createNativeStackNavigator();
const EmployeeHandbookStack = createNativeStackNavigator();
const LeaveApplicationStack = createNativeStackNavigator();
const DailyReportsStack = createNativeStackNavigator();
const CombineStack = createNativeStackNavigator();

export const drawerOption = ({
  label,
  navigation,
  showDrawer = true,
  showHeaderRight = true,
  headerIcon,
  isHome = false,
}) => {
  return {
    headerTitleAlign: 'center',
    headerShown: false,
    // headerTransparent: true,

    headerLeft: showDrawer
      ? () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <MenuSVG
              fill={isHome ? Colors.black : Colors.white}
              height={24}
              width={24}
            />
          </TouchableOpacity>
        )
      : null,
    headerStyle: {
      padding: 20,
      backgroundColor: isHome ? Colors.whitishBlue : Colors.lighterBlue,
    },
    headerTintColor: Colors.purple,
    headerTitle: () => (
      // <TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        {isHome ? (
          <Image source={MonthImages.TRMSIcon} style={styles.headerTitleIcon} />
        ) : (
          <Text style={styles.headerLabel}>{label}</Text>
        )}
        {/* <Text>TRMS</Text> */}

        {headerIcon && (
          <Image
            source={headerIcon}
            fill={isHome ? Colors.black : Colors.white}
            style={styles.headerIcon}
          />
        )}
      </View>
      // </TouchableOpacity>
    ),
    headerRight: showHeaderRight
      ? () => (
          <View style={styles.headerRight}>
            <Header isHome={isHome} />
          </View>
        )
      : null,
  };
};

const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator initialRouteName="HomeDashboard" headerMode="none">
      <HomeStack.Screen
        name={HomeScreen}
        component={Home}
        options={drawerOption({
          label: 'trms',
          headerIconName: MonthImages.info_scopy,
          navigation: navigation,
          headerIcon: false,
          isHome: true,
        })}
      />
      <HomeStack.Screen
        name={RequestLunchScreen}
        component={RequestLunch}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name={employeeProfileScreen}
        component={UserProfile}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="UserDetail"
        component={UserDetail}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        options={{headerShown: false}}
        name={'LeaveApplyScreen'}
        component={ApplyLeave}
      />
    </HomeStack.Navigator>
  );
};

const LunchRequestsNavigator = ({navigation}) => {
  return (
    <LunchRequestsStack.Navigator>
      <LunchRequestsStack.Screen
        options={{headerShown: false}}
        name={LunchRequestsScreen}
        component={LunchRequests}
      />
    </LunchRequestsStack.Navigator>
  );
};

const AttendenceStackScreen = ({navigation}) => {
  return (
    <AttendenceStack.Navigator screenOptions={{headerShown: false}}>
      <AttendenceStack.Screen
        options={{headerShown: false}}
        name={AttendenceScreen}
        component={Attendence}
      />
      <AttendenceStack.Screen
        options={drawerOption({
          headerShown: false,
        })}
        name={RegularzitionScreen}
        component={Regularization}
      />
    </AttendenceStack.Navigator>
  );
};

const LeaveApplicationStackScreen = ({navigation}) => {
  return (
    <LeaveApplicationStack.Navigator screenOptions={{headerShown: false}}>
      <LeaveApplicationStack.Screen
        options={{headerShown: false}}
        name={'leaveApplicationScreen'}
        component={LeaveApplication}
      />
      <LeaveApplicationStack.Screen
        options={drawerOption({
          headerShown: false,
        })}
        name={'wfhApplicationScreen'}
        component={WFHApplication}
      />
      <LeaveApplicationStack.Screen
        options={drawerOption({
          headerShown: false,
        })}
        name={'regularizationApplicationScreen'}
        component={RegularizationApplication}
      />
      <LeaveApplicationStack.Screen
        options={drawerOption({
          headerShown: false,
        })}
        name={'applicationDetailsScreen'}
        component={ApplicationDetailsLayout}
      />
      <LeaveApplicationStack.Screen
        options={{headerShown: false}}
        name={LeaveApplicationForApproverName}
        component={ApplyLeaveByManager}
      />
      <LeaveApplicationStack.Screen
        options={{headerShown: false}}
        name={WFHApplicationForApproverName}
        component={ApplyWFHByManager}
      />
    </LeaveApplicationStack.Navigator>
  );
};

const DailyReportsScreen = () => {
  return (
    <DailyReportsStack.Navigator screenOptions={{headerShown: false}}>
      <DailyReportsStack.Screen
        options={{headerShown: false}}
        name={'leaveApplicationScreen'}
        component={DailyReports}
      />
    </DailyReportsStack.Navigator>
  );
};

const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen
        options={{headerShown: false}}
        name={ProfileScreen}
        component={Profile}
      />
    </ProfileStack.Navigator>
  );
};

const PoliciesStackScreen = ({navigation}) => {
  return (
    <PoliciesStack.Navigator screenOptions={{headerShown: false}}>
      <PoliciesStack.Screen
        options={{headerShown: false}}
        name={'policies'}
        component={Policies}
      />
      <PoliciesStack.Screen
        options={{headerShown: false}}
        name={'policiesDetails'}
        component={PoliciesDetails}
      />
    </PoliciesStack.Navigator>
  );
};

const EmploeeHandbookStackScreen = ({navigation}) => {
  return (
    <EmployeeHandbookStack.Navigator screenOptions={{headerShown: false}}>
      <EmployeeHandbookStack.Screen
        options={{headerShown: false}}
        name={'employeeHandbookScreen'}
        component={EmployeeHandbook}
      />
    </EmployeeHandbookStack.Navigator>
  );
};

const ApplyWfhStackScreen = ({navigation}) => {
  return (
    <ApplyWfhStack.Navigator screenOptions={{headerShown: false}}>
      <ApplyWfhStack.Screen
        options={{headerShown: false}}
        name={'applyWfm'}
        component={ApplyWFH}
      />
    </ApplyWfhStack.Navigator>
  );
};

const HolidaysStackScreen = ({navigation}) => {
  return (
    <HolidaysStack.Navigator
      initialRouteName={HolidaysScreen}
      screenOptions={{headerShown: false}}>
      <HolidaysStack.Screen
        options={{headerShown: false}}
        name={HolidaysScreen}
        component={Holidays}
      />
    </HolidaysStack.Navigator>
  );
};

const LeavesStackScreen = ({}) => {
  return (
    <LeavesStack.Navigator
      initialRouteName="LeavesScreeen"
      screenOptions={{headerShown: false}}>
      <LeavesStack.Screen
        options={{headerShown: false}}
        name={LeavesScreen}
        component={Leaves}
      />
      <LeavesStack.Screen
        options={{headerShown: false}}
        name={LeaveDetailsScreen}
        component={LeaveDetails}
      />
      <LeavesStack.Screen
        options={{headerShown: false}}
        name={LeaveApplyScreen}
        component={ApplyLeave}
      />
    </LeavesStack.Navigator>
  );
};

const LeaveAllocationStackNavigator = ({}) => {
  return (
    <LeavesAllocationStack.Navigator screenOptions={{headerShown: false}}>
      <LeavesAllocationStack.Screen
        options={{headerShown: false}}
        name={LeaveAllocationMain}
        component={LeaveAllocation}
      />
      <LeavesAllocationStack.Screen
        options={{headerShown: false}}
        name={ApplyLeaveAllocationRequest}
        component={AllocateLeave}
      />
    </LeavesAllocationStack.Navigator>
  );
};

const SalarySlipScreen = ({navigation}) => {
  return (
    <SalarySlipStack.Navigator screenOptions={{headerShown: false}}>
      <SalarySlipStack.Screen
        options={{headerShown: false}}
        name={SalarySlipTab}
        component={SalarySlip}
      />
      <SalarySlipStack.Screen
        name={SalaryDetailsScreen}
        component={SalaryDetail}
        options={{headerShown: false}}
      />
      <SalarySlipStack.Screen
        name={SalaryPDFDownloadScreen}
        component={SalaryPdf}
        options={{headerShown: false}}
      />
    </SalarySlipStack.Navigator>
  );
};

const ResourcesStackScreen = ({navigation}) => {
  return (
    <ResourcesStack.Navigator initialRouteName={ResourcesScreen}>
      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={ResourcesScreen}
        component={Resources}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={ResourcesDetailsScreen}
        component={ResourcesDetails}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={LeaveDetailsScreen}
        component={LeaveDetails}
      />

      <ResourcesStack.Screen
        options={drawerOption({
          label: 'Apply Leave',
          showDrawer: false,
          showHeaderRight: false,
          navigation: navigation,
        })}
        name={LeaveApplyScreen}
        component={ApplyLeave}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={'workFromHomeLeaveDetailsScreen'}
        component={LeaveDetails}
      />
      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={'workFromHomeLeaveApplyScreenOpen'}
        component={ApplyLeave}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={'regularisationTabDetailsScreen'}
        component={RegularisationTabDetails}
      />

      <ResourcesStack.Screen
        options={{headerShown: false}}
        name={'attaindanceDetailsScreen'}
        component={AttaindanceDetails}
      />
    </ResourcesStack.Navigator>
  );
};

const CalendarNavigator = () => {
  return (
    <CalendarStack.Navigator screenOptions={{headerShown: false}}>
      <CalendarStack.Screen
        name="CalendarMain"
        component={HeaderTabsArrow}
        options={{headerShown: false}}
      />
    </CalendarStack.Navigator>
  );
};

const AllAttendanceNavigator = () => {
  return (
    <AllAttendanceStack.Navigator screenOptions={{headerShown: false}}>
      <AllAttendanceStack.Screen
        name="AllAttendanceMain"
        component={AllAttendance}
        options={{headerShown: false}}
      />
    </AllAttendanceStack.Navigator>
  );
};

const CombineLeaveNavigator = () => {
  return (
    <CombineStack.Navigator screenOptions={{headerShown: false}}>
      <CombineStack.Screen
        name="Attendence"
        component={AttendenceStackScreen}
        options={{headerShown: false}}
      />
      <CombineStack.Screen
        name="Leaves"
        component={LeavesStackScreen}
        options={{headerShown: false}}
      />
      <CombineStack.Screen
        name="LeaveAllocation"
        component={LeaveAllocationStackNavigator}
        options={{headerShown: false}}
      />
      <CombineStack.Screen
        name="ApplyWFH"
        component={ApplyWfhStackScreen}
        options={{headerShown: false}}
      />
    </CombineStack.Navigator>
  );
};

const Logout = () => {
  return <Text>Logout</Text>;
};

function DrawerNavigator({navigation}) {
  const {userToken: token} = useSelector(state => state.auth);
  const decoded = token && jwt_decode(token);
  const isLeaveApprover = decoded?.role?.includes('Leave Approver') || false;
  const isAdmin = decoded?.role?.includes('Admin Executive') || false;
  const isHRManager = decoded?.role?.includes('HR Manager') || false;

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: Colors.lightBlue,
          width: wp(35),
          borderBottomWidth: 1,
          borderBottomColor: Colors.white,
        },
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.darkBlue,
          height: 55,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        activeTintColor: Colors.white,
        itemStyle: {
          borderRadius: 0,
          marginVertical: 0,
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.yellowishOrange,
        },
        drawerActiveBackgroundColor: Colors.lightBlue,
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeStackScreen}
      />
      <Drawer.Screen name="Profile" component={ProfileStackScreen} />
      {isAdmin ? (
        <Drawer.Screen name="Lunch" component={LunchRequestsNavigator} />
      ) : null}
      {isLeaveApprover ? (
        <Drawer.Screen name="Resources" component={ResourcesStackScreen} />
      ) : null}
      {token ? (
        <Drawer.Screen name="Calendar" component={CalendarNavigator} />
      ) : null}
      {/* <Drawer.Screen
        options={{unmountOnBlur: true}}
        name="Attendence"
        component={AttendenceStackScreen}
      /> */}
      {/* <Drawer.Screen name="Leaves" component={LeavesStackScreen} /> */}
      {/* {token ? (
        <Drawer.Screen
          name="LeaveAllocation"
          component={LeaveAllocationStackNavigator}
        />
      ) : null} */}
      {/* {token ? (
        <Drawer.Screen name="applyWfh" component={ApplyWfhStackScreen} />
      ) : null} */}

      {isLeaveApprover ? (
        <Drawer.Screen
          name="AllAttendance"
          component={AllAttendanceNavigator}
        />
      ) : null}
      {isLeaveApprover ? (
        <Drawer.Screen
          name="allLeaves"
          component={LeaveApplicationStackScreen}
        />
      ) : null}

      <Drawer.Screen name="Holidays" component={HolidaysStackScreen} />
      {/* <Drawer.Screen name="Salary Slip" component={SalarySlipScreen} /> */}
      {isHRManager ? (
        <Drawer.Screen name="DailyReports" component={DailyReportsScreen} />
      ) : null}

      {token ? (
        <Drawer.Screen name="policiesScreen" component={PoliciesStackScreen} />
      ) : null}
      {token ? (
        <Drawer.Screen
          name="employeeHandbook"
          component={EmploeeHandbookStackScreen}
        />
      ) : null}

      <Drawer.Screen name="logout" component={Logout} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  headerTitleIcon: {
    width: 108,
    height: 40,
  },
  headerLabel: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: FontFamily.RobotoMedium,
  },
  headerIcon: {
    height: 22,
    width: 22,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
