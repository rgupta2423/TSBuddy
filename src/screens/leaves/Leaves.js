import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Pressable, SafeAreaView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import {useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import LeavesList from 'reusableComponents/LeavesList';
import {
  AttendenceScreen,
  LeaveAllocationSeparate,
  LeaveApplyScreen,
} from 'navigation/Route';
// import CustomHeader from 'navigation/CustomHeader';
import styles from './LeavesStyles';
import CombineHeader from 'component/header/CombineHeader';

const Leaves = ({navigation}) => {
  const {userToken: token} = useSelector(state => state.auth);

  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;

  const isFocussed = useIsFocused();
  const flatListRef = useRef(null);
  const [openLeaves, setOpenLeaves] = useState({earnedOpen: 0, rhOpen: 0});

  useEffect(() => {
    if (isFocussed && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [isFocussed]);

  const applyForLeave = () => {
    navigation.navigate(LeaveApplyScreen, {
      openLeavesCount: openLeaves,
      applyLeave: true,
    });
  };
  const leftClickHandler = () => {
    navigation.navigate(AttendenceScreen);
  };
  const rightClickHandler = () => {
    navigation.navigate(LeaveAllocationSeparate);
  };
  return (
    <>
      <CombineHeader
        isFirstComponent={false}
        isLastComponent={false}
        navigation={navigation}
        title="Leaves"
        rightClickHandler={rightClickHandler}
        leftClickHandler={leftClickHandler}
      />
      {/* <CustomHeader
        showDrawerMenu={true}
        title="Leaves"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      /> */}
      <SafeAreaView style={styles.mainContainer}>
        <Pressable onPress={applyForLeave} style={styles.applyLeaveButton}>
          <View style={styles.applyLeaveTextContainer}>
            <Text style={styles.applyLeaveAddSign}>+</Text>
          </View>

          <Text style={styles.leaveApplicationText}>
            Make a new Leave Application
          </Text>
          <View />
        </Pressable>

        <LeavesList
          fromOpenLeave={true}
          employeeId={employeeID}
          fromLeaveDetails={setOpenLeaves}
        />
      </SafeAreaView>
    </>
  );
};

export default Leaves;
