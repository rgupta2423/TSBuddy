import React from 'react';
import {Text, TouchableOpacity, Alert, ScrollView, Image} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {CommonActions} from '@react-navigation/native';

import {MonthImages} from 'assets/monthImage/MonthImage';
import {logOut} from 'Auth/LoginSlice';
import {homeReset} from 'redux/homeSlice';
import styles from './DrawerStyles';
import {LeavesSeparate} from './Route';

export default ({navigation}) => {
  const {userToken: token} = useSelector(state => state.auth);
  const decoded = token && jwt_decode(token);
  const isLeaveApprover = decoded?.role?.includes('Leave Approver') || false;
  const dispatch = useDispatch();
  const isHRManager = decoded?.role?.includes('HR Manager') || false;
  const isAdmin = decoded?.role?.includes('Admin Executive') || false;
  const {employeeProfile: profileData} = useSelector(state => state.home);

  let drawerList = [
    {
      screen: 'Home',
      label: 'Home',
      navigation,
      icon: MonthImages.HomeImage,
      isVisible: true,
    },
    {
      screen: 'Profile',
      label: 'Profile',
      navigation,
      icon: profileData?.image ? profileData?.image : MonthImages.ProfileIcon,
      isVisible: true,
      isPhotoExist: profileData?.image,
    },
    {
      screen: 'Lunch',
      label: 'Lunch Requests',
      navigation,
      icon: MonthImages.Lunch,
      isVisible: isAdmin ? true : false,
    },
    {
      screen: 'Resources',
      label: 'My Team',
      navigation,
      icon: MonthImages.ResourceIcon,
      isVisible: isLeaveApprover ? true : false,
    },
    {
      screen: 'Calendar',
      label: 'Calendar',
      navigation,
      icon: MonthImages.leavesImage,
      isVisible: true,
    },
    // {
    //   screen: 'Attendence',
    //   label: 'Attendance',
    //   navigation,
    //   icon: MonthImages.AttendanceDrawer,
    //   isVisible: true,
    // },
    // {
    //   screen: 'Leaves',
    //   label: 'Leaves',
    //   navigation,
    //   icon: MonthImages.leavesImage,
    //   isVisible: true,
    // },
    // {
    //   screen: 'LeaveAllocation',
    //   label: 'Leaves Allocation',
    //   navigation,
    //   icon: MonthImages.leavesImage,
    //   isVisible: token ? true : false,
    // },
    // {
    //   screen: 'applyWfh',
    //   label: 'Apply WFH',
    //   navigation,
    //   icon: MonthImages.leavesImage,
    //   isVisible: token ? true : false,
    // },
    {
      screen: 'AllAttendance',
      label: 'All Attendance',
      navigation,
      icon: MonthImages.ResourceIcon,
      isVisible: isLeaveApprover ? true : false,
    },
    {
      screen: 'allLeaves',
      label: 'Leave Application',
      navigation,
      icon: MonthImages.OpenLeaveIcon,
      isVisible: isLeaveApprover ? true : false,
    },
    {
      screen: 'Holidays',
      label: 'Holidays',
      navigation,
      icon: MonthImages.HolidaysIcon,
      isVisible: true,
    },
    // {
    //   screen: 'Salary Slip',
    //   label: 'Finance',
    //   navigation,
    //   icon: MonthImages.salarySlipIcon,
    //   isVisible: true,
    // },
    isHRManager && {
      screen: 'DailyReports',
      label: 'Daily Reports',
      navigation,
      icon: MonthImages.EmployeeIdIcon,
      isVisible: isHRManager ? true : false,
    },
    {
      screen: 'policiesScreen',
      label: 'Policies',
      navigation,
      icon: MonthImages.salarySlipIcon,
      isVisible: token ? true : false,
    },
    {
      screen: 'employeeHandbook',
      label: 'Employee Handbook',
      navigation,
      icon: MonthImages.info_scopy,
      isVisible: token ? true : false,
    },
    {
      screen: 'logout',
      label: 'Logout',
      navigation,
      dispatch,
      icon: MonthImages.logoutmenuS,
      isVisible: true,
    },
  ];

  drawerList = drawerList.filter(listItem => listItem.isVisible);

  drawerList.forEach((el, index) => {
    el.key = index + 1;
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.drawerContentContainerStyle}
      style={styles.drawerMainContainer}>
      {drawerList.map((value, index) => {
        if (!value.isVisible) {
          return null;
        }
        return renderDrawerItem(value, index);
      })}
    </ScrollView>
  );
};
const renderDrawerItem = (
  {navigation, key, screen, label, dispatch, icon, isPhotoExist},
  index,
) => {
  const selected = navigation?.getState()?.index + 1 === key;

  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        if (dispatch) {
          Alert.alert(
            'Log Out',
            'Are you sure you want to Log Out from this app?',
            [
              {
                text: 'Cancel',
                onPress: () => null,
              },
              {
                text: 'Log Out',
                onPress: () => {
                  if (dispatch) {
                    navigation &&
                      navigation.dispatch(
                        CommonActions.reset({
                          routes: [
                            {
                              name: 'Home',
                            },
                          ],
                        }),
                      );

                    dispatch(logOut());

                    setTimeout(() => {
                      dispatch(homeReset());
                    }, 20);
                  }
                },
              },
            ],
          );
          navigation.closeDrawer();
        } else {
          console.log('navigation====', navigation);
          navigation.navigate(screen);
          navigation.closeDrawer();
        }
      }}
      style={[styles.drawerItemContainer, selected && styles.selectedStyle]}>
      {/* <Image
        source={{uri: profileData?.image}}
        style={{height: '100%', width: '100%', borderRadius: 60}} // Define the width and height as needed
      /> */}
      <Image
        source={isPhotoExist ? {uri: icon} : icon}
        resizeMode="contain"
        style={styles.icon}
      />
      <Text style={styles.drawerItemText}>{label}</Text>
    </TouchableOpacity>
  );
};
