import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getResourcesEmployeesLeaves} from 'redux/homeSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {FontFamily} from 'constants/fonts';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import Loader from 'component/loader/Loader';
import {guestLeavesScreenData} from 'guestData';

const screenWidth = Dimensions.get('window').width;

const WorkFromHomeList = props => {
  const {fromResource, resourceEmployeeID} = props;
  const isFocused = useIsFocused();
  const [isRefresh, setRefresh] = useState(false);
  const [resurcesEmployeeLeaves, setResourcesEmployeesLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCount, setOpenCount] = useState(0);
  const [empDetail, setClickData] = useState({});
  const navigation = useNavigation();

  let employeeID;
  if (props.isFromWFHDetails) {
    employeeID = props.employeeId;
  }

  const dispatch = useDispatch();
  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (isFocused) {
      (async () => {
        setLoading(true);
        const leavesData = await dispatch(
          getResourcesEmployeesLeaves({
            token,
            empID: props.isFromWFHDetails ? employeeID : props.employeeId,
          }),
        );
        setLoading(false);

        let count = 0;
        leavesData?.payload?.employeeWfh?.forEach(element => {
          if (element.status == 'Open') {
            count++;
          }
        });
        setOpenCount(count);

        setResourcesEmployeesLeaves(leavesData?.payload?.employeeWfh);
        if (leavesData?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: leavesData?.error?.message,
            buttonText: 'Close',
            dispatch,
          });
        }
      })();
    }
  }, [isFocused]);

  const updateData = async () => {
    try {
      setRefresh(true);
      const allLeaves = await dispatch(getResourcesEmployeesLeaves({token}));
    } catch (err) {
    } finally {
      setRefresh(false);
    }
  };

  const renderItem = useCallback(({item}) => {
    // if (filteredSelectedDate) {
    //   const shouldRender =
    //     filteredSelectedDate?.getTime() >= new Date(item?.fromDate).getTime();
    //   if (!shouldRender) return null;
    // }
    return (
      <TouchableOpacity
        onPress={() => {
          item.status !== 'Open'
            ? navigation.navigate(props.workFromHomeLeaveDetailsScreen, item)
            : navigation.navigate(props.workFromHomeLeaveApplyScreenOpen, {
                ...item,
                fromWfh: true,
                employeeID,
                // fromResource,
                resourceEmployeeID,
                fromResource: true,
              });

          return;

          // item.status !== 'Open'
          //   ? navigation.navigate('Leaves', {
          //       screen: 'LeaveDetailsScreen',
          //       params: item,
          //       // initial: false,
          //     })
          //   : navigation.navigate('Leaves', {
          //       screen: 'LeaveApplyScreen',
          //       // initial: false,
          //       params: {
          //         ...item,
          //         fromWfh: true,
          //         employeeID,
          //       },
          //     });
        }}>
        <View style={style.flateListView}>
          <View
            style={{
              flex: 1,
              backgroundColor:
                item.status === 'Rejected' || item.status === 'Dismissed'
                  ? Colors.grey
                  : item.status === 'Open'
                  ? Colors.darkPink
                  : Colors.parrotGreenLight,
              paddingHorizontal: widthPercentageToDP(2),
              paddingVertical: heightPercentageToDP(1),
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
          <View style={style.secondView}>
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
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        {resurcesEmployeeLeaves?.length > 0 ? (
          <FlatList
            refreshing={isRefresh}
            onRefresh={updateData}
            data={isGuestLogin ? guestLeavesScreenData : resurcesEmployeeLeaves}
            renderItem={renderItem}
            keyExtractor={(_, index) => index}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: FontFamily.RobotoBold, fontSize: 16}}>
              Work from home Not Found.
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorDodgerBlue2,
    marginBottom: 5,
  },
  profile_name_cont: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    padding: 10,
    alignItems: 'center',
  },
  profile_cont: {
    width: wp(18),
    height: hp(9),
    marginRight: 20,
    borderRadius: 50,
  },
  name_cont: {},
  name_txt: {
    color: 'white',
    fontSize: 20,
    paddingBottom: 8,
  },
  designation_txt: {
    color: 'white',
    fontSize: 16,
  },
  social_icon_cont: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  social_inner_cont: {
    width: screenWidth - wp(15),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  social_icon: {
    width: wp(11),
    height: hp(5.5),
    borderRadius: 50,
    // borderWidth: 11,
    backgroundColor: 'teal',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  flateListView: {
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: heightPercentageToDP(0.5),
    marginHorizontal: widthPercentageToDP(2),
    backgroundColor: Colors.lightcyan,
    shadowOpacity: 0.1,
  },
  secondView: {
    flex: 2,
    backgroundColor: Colors.lightcyan,
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default memo(WorkFromHomeList);
