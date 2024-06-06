import {View, Text} from 'react-native';
import styles from './LeavesDetailsStyles';
import CustomHeader from 'navigation/CustomHeader';
import React from 'react';

const LeaveDetails = ({route, navigation}) => {
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

  const {params: data} = route;

  const firstName = route.params?.firstName;
  const middleName = route.params?.middleName;
  const lastName = route.params?.lastName;

  const empFullName =
    firstName && middleName && lastName
      ? `${firstName} ${middleName} ${lastName}`
      : firstName && lastName
      ? `${firstName} ${lastName}`
      : firstName && middleName
      ? `${firstName} ${middleName}`
      : firstName;

  // const approverFullName =
  //   leaveApproverFirstName && leaveApproverMiddleName && leaveApproverLastName
  //     ? `${leaveApproverFirstName} ${leaveApproverMiddleName} ${leaveApproverLastName}`
  //     : leaveApproverFirstName && leaveApproverLastName
  //     ? `${leaveApproverFirstName} ${leaveApproverLastName}`
  //     : leaveApproverFirstName && leaveApproverMiddleName
  //     ? `${leaveApproverFirstName} ${leaveApproverMiddleName}`
  //     : leaveApproverFirstName;

  const applyingDate = `${new Date(data?.postingDate).getDate()}-${new Date(
    data?.postingDate,
  ).toLocaleString('default', {month: 'short'})}-${new Date(
    data?.fromDate,
  ).getFullYear()}`;

  const rangeOfdate = item =>
    `${new Date(item.fromDate).getDate()}-${new Date(
      item?.fromDate,
    ).toLocaleString('default', {month: 'short'})}-${new Date(
      item.fromDate,
    ).getFullYear()} to ${new Date(item.toDate).getDate()}-${new Date(
      item.toDate,
    ).toLocaleString('default', {month: 'short'})}-${new Date(
      item.toDate,
    ).getFullYear()}`;

  const details = [
    ['Employee Name', empFullName],
    // ['Leave Approver', approverFullName],
    ['Leave Type', data?.leaveType],
    ['Leave Time Period', rangeOfdate(data)],
    ['Leave Status', data?.status],
    ['Number Of Leaves', data?.totalLeaveDays],
    ['Leave Balance', data?.currentLeaveBalance || 'N/A'],
    ['Applying Date', applyingDate || '04/05/2023'],
    ['Reason', data?.description || 'N/A'],
  ];

  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title="Leave Details"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {data.totalLeaveDays} {data.leaveType} {data.status}
          </Text>
        </View>
        <View>
          {details?.map((item, index) => card(item[0], item[1], index))}
        </View>
      </View>
    </>
  );
};

export default LeaveDetails;
