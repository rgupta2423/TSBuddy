import React from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Colors} from 'colors/Colors';
import Loader from 'component/loader/Loader';
import {FontFamily} from 'constants/fonts';
import ShowAlert from 'customComponents/CustomError';
import {guestLeavesScreenData} from 'guestData';
import {memo, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getEmployeeRegularizationRequest} from 'redux/homeSlice';
import {heightPercentageToDP, widthPercentageToDP} from 'utils/Responsive';
import {ERROR} from 'utils/string';

const RegularisationList = props => {
  const {employeeID, employeeName, navigateTo} = props;

  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regularisationRequestsList, setRegularisationReuestsList] = useState(
    [],
  );
  const [openCount, setOpenCount] = useState(0);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (isFocused) {
      (async () => {
        setLoading(true);
        const regularisationRequests = await dispatch(
          getEmployeeRegularizationRequest({token, empId: employeeID}),
        );

        let count = 0;
        regularisationRequests.payload.forEach(element => {
          if (element.status == 'Open') {
            count++;
          }
        });

        setOpenCount(count);

        setRegularisationReuestsList(regularisationRequests.payload);
        setLoading(false);
        if (regularisationRequests?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: regularisationRequests?.error?.message,
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
      const allLeaves = await dispatch(
        getEmployeeRegularizationRequest({token, employeeID}),
      );
    } catch (err) {
    } finally {
      setRefresh(false);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(navigateTo, {
            ...item,
            employeeName,
          });
          // item.status =
          //   'Open' &&
          //   navigation.navigate('RegularisationFormScreen', {
          //     screen: 'regularisationTabDetailsScreen',
          //     params: {
          //       ...item,
          //       employeeName,
          //     },
          //   });
        }}>
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
              paddingHorizontal: widthPercentageToDP(2),
              paddingVertical: heightPercentageToDP(1),
              justifyContent: 'center',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              shadowOpacity: 0.1,
            }}>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              {item.attendanceType}
            </Text>
            <Text style={{textAlign: 'center'}}>({item.status})</Text>
          </View>
          <View style={styles.secondView}>
            <Text style={{fontWeight: 'bold', opacity: 0.7, fontSize: 16}}>
              {item.comment}
            </Text>

            <Text style={{opacity: 0.8}}>{item.mode}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Loader />;
  }

  return regularisationRequestsList.length > 0 ? (
    <FlatList
      refreshing={isRefresh}
      onRefresh={updateData}
      data={isGuestLogin ? guestLeavesScreenData : regularisationRequestsList}
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
        Regularisation Not Found.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listOfLeaves: {
    height: heightPercentageToDP(65),
    marginBottom: 5,
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

export default memo(RegularisationList);
