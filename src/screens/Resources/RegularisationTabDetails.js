import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from './RegularisationTabDetailsStyle';
import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateAttRegularizeStatus} from 'redux/homeSlice';
import {heightPercentageToDP} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import CustomHeader from 'navigation/CustomHeader';

const reason = [
  'Not Carrying Access Card',
  'Access Card Not Working',
  'Missed Punch-In',
  'Missed Punch-Out',
];

const RegularisationTabDetails = ({navigation, route}) => {
  const card = (leftText, rightText, index) => {
    return (
      <View key={index} style={styles.card}>
        <View>
          <Text style={styles.cardLeftText}>{leftText}</Text>
        </View>
        <View style={styles.cardRightTextContainer}>
          <Text>{rightText}</Text>
        </View>
      </View>
    );
  };

  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);

  const {
    comment,
    mode,
    employeeId,
    regularizationId,
    attendanceDate,
    attendanceType,
    status,
    reasonId,
  } = route.params;

  const handleApprove = async () => {
    const updateAttRegularize = await dispatch(
      updateAttRegularizeStatus({
        token,
        body: {
          regularizationId: regularizationId,
          attendanceDate: attendanceDate,
          employeeId: employeeId,
          status: 'Approved',
          attendanceType: 'Full Day',
          // attendanceType: attendanceType,
          // regularizationId: 237,
          // attendanceDate: '2023-08-04T07:09:20.756Z',
          // employeeId: 10727,
          // status: 'Approved',
          // attendanceType: 'Full Day',
        },
      }),
    );
    if (updateAttRegularize?.error) {
      alert(updateAttRegularize.error.message);
    } else {
      Alert.alert('Success', 'Updated successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  const handleReject = async () => {
    const updateAttRegularize = await dispatch(
      updateAttRegularizeStatus({
        token,
        body: {
          regularizationId: regularizationId,
          attendanceDate: attendanceDate,
          employeeId: employeeId,
          status: 'Rejected',
          attendanceType: attendanceType,
        },
      }),
    );
    if (updateAttRegularize?.error) {
      alert(updateAttRegularize.error.message);
    } else {
      Alert.alert('Success', 'Updated successfully!', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  // const handleDismiss = async () => {
  //   const updateAttRegularize = await dispatch({
  //     token,
  //     body: {
  //       regularizationId: regularizationId,
  //       attendanceDate: attendanceDate,
  //       employeeId: employeeId,
  //       status: 'Dismissed',
  //       attendanceType: attendanceType,
  //     },
  //   });
  //   if (updateAttRegularize?.error) {
  //     alert(updateAttRegularize.error.message);
  //   } else {
  //     Alert.alert('Success', 'Updated successfully!', [
  //       {
  //         text: 'Ok',
  //         onPress: () => {
  //           navigation.goBack();
  //         },
  //       },
  //     ]);
  //   }
  // };

  const attDate = `${new Date(attendanceDate).toLocaleDateString()}`;
  const details = [
    ['Comment', comment],
    ['Mode', mode],
    ['Attendance Date', attDate],
    ['Attendance Type', attendanceType],
    ['Status', status || 'N/A'],
    ['Reason', reason[reasonId - 1]],
  ];
  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title="Regularization Details"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{route?.params?.employeeName}</Text>
        </View>
        <View>
          {details?.map((item, index) => card(item[0], item[1], index))}
        </View>
      </View>
      {status?.toLowerCase() == 'open' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={handleApprove}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 15,
                height: heightPercentageToDP(5),
                backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
                Approve
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignItems: 'center', marginVertical: 10}}
            onPress={handleReject}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
                height: heightPercentageToDP(5),
                backgroundColor: Colors.reddishTint,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
                Reject
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={handleDismiss}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
                height: heightPercentageToDP(5),
                backgroundColor: Colors.bluishGreen,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>
                Dismiss
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      )}
    </>
  );
};

export default memo(RegularisationTabDetails);
