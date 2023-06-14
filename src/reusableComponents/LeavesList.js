import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

import {Colors} from 'colors/Colors';

import styles from '../screens/leaves/LeaveStyles';
import {getLeaveApprovers, getLeaveDetails} from 'redux/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {LeaveDetailsScreen, LeaveApplyScreen} from 'navigation/Route';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {FontFamily, FontSize} from 'constants/fonts';
import {openLeavesCount} from 'utils/utils';

const LeavesList = () => {
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id;
  const dispatch = useDispatch();
  const isFocussed = useIsFocused();
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const [filterCalenderOpen, setFilterCalenderOpen] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [filteredSelectedDate, setFilteredSelectedDate] = useState(null);
  const [openLeaves, setOpenLeaves] = useState({earnedOpen: 0, rhOpen: 0});

  useEffect(() => {
    if (isFocussed) token && updateData();
  }, [employeeID, token, isFocussed]);

  useEffect(() => {
    if (isFocussed && flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: true});
    }
  }, [isFocussed]);

  const updateData = async () => {
    try {
      setRefresh(true);
      const allLeaves = await dispatch(getLeaveDetails({token, employeeID}));
      const openCount = openLeavesCount({leaves: allLeaves?.payload});
      setOpenLeaves(openCount);
    } catch (err) {
    } finally {
      setRefresh(false);
    }
  };

  const {
    leavesData,
    isLeaveDataLoading: {isLoading},
  } = useSelector(state => state.home);

  let reversLeaveesData = [];
  for (let i = 0; i < leavesData.length; i++) {
    reversLeaveesData.push(leavesData[i]);
  }
  reversLeaveesData.sort(
    (a, b) => new Date(a.fromDate).getTime() - new Date(b?.fromDate).getTime(),
  );
  reversLeaveesData.reverse();

  const renderItem = ({item}) => {
    if (filteredSelectedDate) {
      const shouldRender =
        filteredSelectedDate?.getTime() >= new Date(item?.fromDate).getTime();

      if (!shouldRender) return null;
    }

    const handleNavigation = () => {
      if (item.status == 'Open') {
        navigation.navigate(LeaveApplyScreen, {...item, fromOpenLeave: true});
      } else {
        navigation.navigate(LeaveDetailsScreen, item);
      }
    };

    return (
      <TouchableOpacity onPress={() => handleNavigation()}>
        <View style={styles.flateListView}>
          <View
            style={{
              flex: 1,
              backgroundColor:
                item.status === 'Rejected' || item.status === 'Dismissed'
                  ? Colors.grey
                  : item.status === 'Open'
                  ? Colors.darkPink
                  : Colors.parrotGreenLight,
              paddingHorizontal: wp(2),
              paddingVertical: hp(1),
              justifyContent: 'center',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              shadowOpacity: 0.1,
            }}>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              {item.totalLeaveDays}{' '}
              {item.leaveType
                .split(' ')
                .map(word => word.charAt(0).toUpperCase())
                .join('')}
            </Text>
            <Text style={{textAlign: 'center'}}>({item.status})</Text>
          </View>
          <View style={styles.secondView}>
            <Text style={{fontWeight: 'bold', opacity: 0.7, fontSize: 16}}>
              {item.leaveApplicationId}
            </Text>
            <Text style={{opacity: 0.6}}>
              {`${new Date(item.fromDate).getDate()} ${new Date(
                item.fromDate,
              ).toLocaleString('default', {month: 'short'})} ${new Date(
                item.fromDate,
              ).getFullYear()}`}
              {' - '}
              {`${new Date(item.toDate).getDate()} ${new Date(
                item.toDate,
              ).toLocaleString('default', {month: 'short'})} ${new Date(
                item.toDate,
              ).getFullYear()}`}
            </Text>
            <Text style={{opacity: 0.8}}>{item.currentStatus}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNoLeaves = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontFamily: FontFamily.RobotoMedium,
            fontSize: 17,
            color: Colors.dune,
          }}>
          No Leaves Applied.
        </Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          marginTop: hp(1.6),
          flex: 1,
          backgroundColor: Colors.whitishBlue,
        }}>
        {isGuestLogin ? (
          renderNoLeaves()
        ) : leavesData?.length > 0 ? (
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            refreshing={isRefresh}
            onRefresh={updateData}
            data={reversLeaveesData}
            renderItem={renderItem}
            keyExtractor={(_, index) => index}
          />
        ) : (
          renderNoLeaves()
        )}
        <DateTimePickerModal
          isVisible={filterCalenderOpen}
          mode="date"
          onConfirm={date => {
            setFilteredSelectedDate(date);
            setFilterCalenderOpen(false);
          }}
          onCancel={() => {
            setFilterCalenderOpen(false);
          }}
        />

        <Pressable
          onPress={() => {
            setFilterCalenderOpen(true);
          }}
          style={{position: 'absolute', bottom: hp(3), right: wp(5)}}>
          <Image
            source={MonthImages.filterIcon2x}
            style={{height: 55, width: 55, borderRadius: 25}}
          />
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default memo(LeavesList);
