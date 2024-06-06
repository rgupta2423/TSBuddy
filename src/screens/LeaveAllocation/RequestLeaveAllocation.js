import CustomHeader from 'navigation/CustomHeader';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import styles from './RequestLeaveAllocationStyles';
import {
  dismissSelfLeaveAllocationRequest,
  getSelfLeaveAllocationRequests,
} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {
  ApplyLeaveAllocationRequest,
  ApplyWFHSeparate,
  LeavesSeparate,
} from 'navigation/Route';
import CustomButton from 'navigation/CustomButton';
import CombineHeader from 'component/header/CombineHeader';

const LeaveAllocation = ({navigation}) => {
  const {userToken: token} = useSelector(state => state.auth);
  const {id} = jwt_decode(token);
  const dispatch = useDispatch();
  const [regularizationRequests, setRegularizationRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const isFocussed = useIsFocused();

  const getLeaveAllocationRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const {payload, error} = await dispatch(
        getSelfLeaveAllocationRequests({token}),
      );
      payload.reverse();

      if (error) {
        throw new Error(error.message);
      }

      setRegularizationRequests(payload);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (isFocussed) {
      getLeaveAllocationRequests();
    }
  }, [dispatch, id, token, getLeaveAllocationRequests, isFocussed]);
  const onNewPress = () => {
    navigation.navigate(ApplyLeaveAllocationRequest);
  };

  const onClickListItem = item => {};

  const onDismissLeaveRequest = async ({
    leaveType,
    leaveAllocationId,
    empId,
  }) => {
    try {
      setIsLoading(true);
      await dispatch(
        dismissSelfLeaveAllocationRequest({
          token,
          body: {
            employeeId: empId,
            status: 'Dismissed',
            leaveAllocationId,
            leaveType,
          },
        }),
      );

      getLeaveAllocationRequests();
    } catch (err) {
      console.log('errDismiss:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const flatlistRenderItem = ({item}) => {
    return (
      <View style={styles.listItem} onPress={onClickListItem.bind(this, item)}>
        <View
          style={[
            styles.leftStatus,
            item.status === 'Rejected' || item.status === 'Dismissed'
              ? styles.backgroundGrey
              : item.status === 'Open'
              ? styles.backgroundPink
              : styles.backgroundGreen,
          ]}>
          <Text style={styles.leaveType}>
            {item.totalLeaveDays}{' '}
            {item.leaveType
              .split(' ')
              .map(word => word.charAt(0).toUpperCase())
              .join('')}
          </Text>
          <Text style={styles.textAlignCenter}>({item.status})</Text>
        </View>

        <View style={styles.secondView}>
          <View style={styles.rightFirstContainer}>
            <Text style={styles.leaveAppIdText}>
              {item.leaveAllocationId} - {item.description}
            </Text>
            <Text style={styles.lessOpacity}>
              {`${new Date(item.allocationDate).getDate()} ${new Date(
                item.allocationDate,
              ).toLocaleString('default', {month: 'short'})} ${new Date(
                item.allocationDate,
              ).getFullYear()}`}
            </Text>
            <Text style={styles.lessOpacity}>{item.currentStatus}</Text>
          </View>
          {item.status === 'Open' ? (
            <View style={styles.dismissContainer}>
              <CustomButton
                title="Dismiss"
                onPress={onDismissLeaveRequest.bind(null, {
                  leaveAllocationId: item.leaveAllocationId,
                  empId: item.employeeId,
                  leaveType: item.leaveType,
                })}
                styleButton={styles.dismissButton}
                styleTitle={styles.dismissTitle}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const rightClickHandler = () => {
    navigation.navigate(ApplyWFHSeparate);
  };

  const leftClickHandler = () => {
    navigation.navigate(LeavesSeparate);
  };

  return (
    <View style={styles.mainContainer}>
      <CombineHeader
        isFirstComponent={false}
        isLastComponent={false}
        navigation={navigation}
        title="Leave Allocation"
        rightClickHandler={rightClickHandler}
        leftClickHandler={leftClickHandler}
      />
      {/* <CustomHeader
        showDrawerMenu={true}
        title="Leave Allocation"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
        headerRight={
          <Pressable onPress={onNewPress} style={styles.headerRightContainer}>
            <Text style={styles.headerRightText}>New</Text>
          </Pressable>
        }
      /> */}
      <Pressable onPress={onNewPress} style={styles.applyLeaveButton}>
        <View style={styles.applyLeaveTextContainer}>
          <Text style={styles.applyLeaveAddSign}>+</Text>
        </View>

        <Text style={styles.leaveApplicationText}>
          Make a new Leave Allocation
        </Text>
        <View />
      </Pressable>
      <View style={styles.mainContainerExcludedHeader}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderBackground} />
            <ActivityIndicator size="large" />
          </View>
        ) : apiError ? (
          <Text>
            Error while fetching Leave Allocation Requests. Please Try Later.
          </Text>
        ) : regularizationRequests.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={regularizationRequests}
            renderItem={flatlistRenderItem}
            keyExtractor={(_, index) => index}
          />
        ) : (
          <Text>No Leave Allocation Requests Found.</Text>
        )}
      </View>
    </View>
  );
};

export default LeaveAllocation;
