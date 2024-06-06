import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomHeader from 'navigation/CustomHeader';
import styles from './LeaveApplicationStyle';
import {Colors} from 'colors/Colors';
import {useDispatch, useSelector} from 'react-redux';
import ApplicationListLayout from './ApplicationListLayout';
import {
  LeaveApplicationForApproverName,
  WFHApplicationForApproverName,
} from 'navigation/Route';
import {getLeaveApplicationData} from 'redux/homeSlice';
import jwt_decode from 'jwt-decode';
import {useIsFocused} from '@react-navigation/native';
import {LEAVE, LEAVE_ALLOCATION, REGULARISATION, WFH} from 'utils/string';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {Image} from 'react-native';
import CustomButton from 'navigation/CustomButton';

const LeaveApplication = ({navigation}) => {
  const token = useSelector(state => state.auth.userToken);
  const {emailId, role, id} = jwt_decode(token);
  const isFocussed = useIsFocused();
  // 10224;

  const isHRManager = role.includes('HR Manager');

  const [selectedType, setSelectedType] = useState(LEAVE);
  const [searchedName, setSearchedName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  // const [selfOpenLeaves, setSelfOpenLeaves] = useState([]);
  const dispatch = useDispatch();

  const [applicationData, setApplicationData] = useState({
    [LEAVE]: {data: [], count: 0},
    [WFH]: {data: [], count: 0},
    [REGULARISATION]: {data: [], count: 0},
    [LEAVE_ALLOCATION]: {data: [], count: 0},
  });

  const tabButton = ({type, tabText, onTabPress}) => {
    return (
      <Pressable
        onPress={() => {
          onTabPress(type);
        }}
        style={[
          styles.tabContainer,
          {
            backgroundColor:
              selectedType === type ? Colors.lighterBlue : Colors.white,
          },
        ]}>
        <Text style={selectedType === type ? styles.textColorWhite : null}>
          {tabText}
        </Text>
      </Pressable>
    );
  };

  const onNewPress = () => {
    if (selectedType === LEAVE) {
      navigation.navigate(LeaveApplicationForApproverName);
    } else if (selectedType === WFH) {
      navigation.navigate(WFHApplicationForApproverName);
    }
  };

  const getLeavesForManager = useCallback(
    async (type, isRefreshing, name) => {
      try {
        let approver = {approverEmail: emailId, approverId: id};
        if (type === REGULARISATION || type === LEAVE_ALLOCATION) {
          approver = {approverId: id};
        }

        setIsLoading(true);
        const leaves = await dispatch(
          getLeaveApplicationData({
            token,
            body: {
              take: name ? applicationData[selectedType].count : 12,
              skip: isRefreshing ? 0 : applicationData[type].data.length,
              page: 1,
              name: name ?? null,
              ...approver,
            },
            selectedType: type,
            isRefreshing,
            isHR: isHRManager,
          }),
        );

        let {
          payload: {data: initialLeaves, count},
        } = leaves;
        // console.log('initialLeaves:', initialLeaves);

        setApplicationData(prevData => ({
          ...prevData,
          [type]: {
            data: isRefreshing
              ? [...initialLeaves]
              : [...prevData[type].data, ...initialLeaves],
            count,
          },
        }));
        return {count};
      } catch (err) {
        console.log('errr22:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, emailId, token, applicationData, isHRManager, id, selectedType],
  );

  useEffect(() => {
    if (isFocussed) {
      (async () => {
        console.log('selectedType', selectedType);
        await getLeavesForManager(selectedType, true);
        // getLeavesForManager(selectedType, true);
      })();
    }
  }, [isFocussed, selectedType]);

  const renderMoreLeaves = async () => {
    if (
      applicationData[selectedType].data.length <
      applicationData[selectedType].count
    ) {
      getLeavesForManager(selectedType);
    }
  };

  const onTabPress = async type => {
    setShowTextInput(false);
    setSelectedType(type);

    if (
      applicationData[type]?.data?.length === 0 ||
      type === LEAVE_ALLOCATION
    ) {
      await getLeavesForManager(type);
    }
  };

  const onEnterValue = enteredName => {
    setSearchedName(enteredName);
  };

  const onSearchUser = async () => {
    await getLeavesForManager(selectedType, true, searchedName);
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Leave Application"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
        headerRight={
          <View style={styles.headerRight}>
            {selectedType === LEAVE_ALLOCATION && (
              <Pressable
                onPress={() => {
                  setShowTextInput(prevShow => !prevShow);
                  // inputRef.current?.focus();
                }}>
                <Image
                  source={MonthImages.searchIconwhite}
                  style={styles.searchIcon}
                />
              </Pressable>
            )}
            {selectedType !== REGULARISATION &&
              selectedType !== LEAVE_ALLOCATION && (
                <Pressable
                  onPress={onNewPress}
                  style={styles.headerRightContainer}>
                  <Text style={styles.headerRightText}>New</Text>
                </Pressable>
              )}
          </View>
        }
      />
      {showTextInput && (
        <View style={styles.textInputContainer}>
          <TextInput
            value={searchedName}
            onChangeText={onEnterValue}
            style={styles.textInput}
          />
          <CustomButton title="Search" onPress={onSearchUser} />
        </View>
      )}
      <View style={styles.mainContainerExcludeHeader}>
        <View style={styles.attendanceTypeContainer}>
          <View style={styles.typeContainer}>
            {tabButton({type: LEAVE, tabText: 'Leave', onTabPress})}
            {tabButton({
              type: REGULARISATION,
              tabText: 'Regularisation',
              onTabPress,
            })}
            {tabButton({type: WFH, tabText: 'WFH', onTabPress})}
            {tabButton({
              type: LEAVE_ALLOCATION,
              tabText: LEAVE_ALLOCATION,
              onTabPress,
            })}
          </View>
        </View>
        <View style={styles.listContainer}>
          <ApplicationListLayout
            data={applicationData[selectedType].data || []}
            navigation={navigation}
            isRegularisation={selectedType === REGULARISATION ? true : false}
            isLeaveAllocation={selectedType === LEAVE_ALLOCATION ? true : false}
            loadMoreData={renderMoreLeaves}
            getLeavesForManager={getLeavesForManager}
            selectedType={selectedType}
          />
        </View>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <View style={styles.loaderBackground} />
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default LeaveApplication;
