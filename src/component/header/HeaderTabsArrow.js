import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import CustomHeader from 'navigation/CustomHeader';
import {drawerOption} from 'navigation/DrawerNavigator';
import {
  ApplyLeaveAllocationRequest,
  ApplyWFHSeparate,
  AttendanceSeparate,
  AttendenceScreen,
  LeaveAllocationMain,
  LeaveAllocationSeparate,
  LeaveApplyScreen,
  LeaveDetailsScreen,
  LeavesScreen,
  LeavesSeparate,
  RegularzitionScreen,
} from 'navigation/Route';
import React from 'react';
import AllocateLeave from 'screens/LeaveAllocation/AllocateLeave';
import LeaveAllocation from 'screens/LeaveAllocation/RequestLeaveAllocation';
import ApplyWFH from 'screens/applyWFH.js/ApplyWFH';
import Attendence from 'screens/attendence/Attendence';
import Regularization from 'screens/attendence/Regularization';
import ApplyLeave from 'screens/leaves/ApplyLeave';
import LeaveDetails from 'screens/leaves/LeaveDetails';
import Leaves from 'screens/leaves/Leaves';

const AttendenceStack = createNativeStackNavigator();
const LeavesStack = createNativeStackNavigator();
const LeavesAllocationStack = createNativeStackNavigator();
const ApplyWfhStack = createNativeStackNavigator();

const CombineCalendarStack = createNativeStackNavigator();

const AttendanceStackNavigator = () => (
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

const LeaveStackNavigator = () => (
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

const LeavesAllocationStackNavigator = () => (
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

const ApplyWFHStackNavigator = () => (
  <ApplyWfhStack.Navigator screenOptions={{headerShown: false}}>
    <ApplyWfhStack.Screen
      options={{headerShown: false}}
      name={'applyWfh'}
      component={ApplyWFH}
    />
  </ApplyWfhStack.Navigator>
);

// const components = [
//   {label: 'Attendance', component: attendance},
//   {label: 'Leaves', component: leaves},
//   {label: 'Leaves Allocation', component: leavesAllocation},
//   {label: 'Apply WFH', component: applyWFH},
// ];

const HeaderTabsArrow = ({navigation}) => {
  return (
    <CombineCalendarStack.Navigator screenOptions={{headerShown: false}}>
      <CombineCalendarStack.Screen
        options={{headerShown: false}}
        name={AttendanceSeparate}
        component={AttendanceStackNavigator}
      />
      <CombineCalendarStack.Screen
        options={drawerOption({
          headerShown: false,
        })}
        name={LeavesSeparate}
        component={LeaveStackNavigator}
      />
      <CombineCalendarStack.Screen
        options={drawerOption({
          headerShown: false,
        })}
        name={LeaveAllocationSeparate}
        component={LeavesAllocationStackNavigator}
      />
      <CombineCalendarStack.Screen
        options={drawerOption({
          headerShown: false,
        })}
        name={ApplyWFHSeparate}
        component={ApplyWFHStackNavigator}
      />
    </CombineCalendarStack.Navigator>
  );

  // return (
  //   <>
  //     {/* <CustomHeader
  //       showDrawerMenu={true}
  //       title="Calendar"
  //       navigation={navigation}
  //       isHome={false}
  //       showHeaderRight={false}
  //     /> */}
  //     <View style={styles.mainContainer}>
  //       {/* <View style={styles.headerContainer}>
  //         {currentSetComponentIndex === 0 ? (
  //           drawer()
  //         ) : (
  //           <Pressable
  //             onPress={changeComponentHandler.bind(null, LEFT)}
  //             style={styles.leftArrowContainer}>
  //             <MonthImages.ArrowLeft
  //               stroke={Colors.white}
  //               height={28}
  //               width={28}
  //               style={styles.arrowIcon}
  //             />
  //           </Pressable>
  //         )}
  //         <View style={styles.headerMidContainer}>
  //           <Text style={styles.headerTitle}>
  //             {components[currentSetComponentIndex].label}
  //           </Text>
  //         </View>
  //         <Pressable
  //           onPress={changeComponentHandler.bind(null, RIGHT)}
  //           style={[
  //             styles.rightArrowContainer,
  //             currentSetComponentIndex === components.length - 1 &&
  //               styles.lessOpacity,
  //           ]}>
  //           <MonthImages.ArrowRight
  //             stroke={Colors.white}
  //             height={28}
  //             width={28}
  //             color={Colors.lightGray1}
  //             style={styles.arrowIcon}
  //           />
  //         </Pressable>
  //       </View> */}
  //       <View style={styles.componentContainer}>
  //         {/* {components[currentSetComponentIndex].component()} */}
  //       </View>
  //     </View>
  //   </>
  // );
};

export default HeaderTabsArrow;
