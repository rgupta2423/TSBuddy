import {Colors} from 'colors/Colors';
import {RegularzitionScreen} from 'navigation/Route';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {TextInput} from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
import {heightPercentageToDP, widthPercentageToDP} from 'utils/Responsive';
import {leaveTypes, regularnReason} from 'utils/defaultData';
import {useEffect, useState} from 'react';
import style from './RegularzationStyles';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch, useSelector} from 'react-redux';
import {getAttReguarzationReason, getLeaveApprovers} from 'redux/homeSlice';
import {ERROR} from 'utils/string';
import jwt_decode from 'jwt-decode';

const Regularization = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState('fullDay');
  const [checkBox, setCheckBox] = useState(false);
  const [regularizationReason, setRegularzitionReason] = useState([]);
  const [leaveApproversList, setLeaveApproversList] = useState([]);
  const [selectDay, setSelectDay] = useState('');
  const [dayData, setDayData] = useState([
    {
      isSelected: false,
      type: 'Half day',
    },
    {isSelected: false, type: 'Full day'},
  ]);

  const {userToken: token, isGuestLogin: isGuestLogin} = useSelector(
    state => state.auth,
  );
  var decoded = token && jwt_decode(token);
  const employeeID = decoded?.id || '';

  const dispatch = useDispatch();
  let regReasonList = [];
  let listOfLeaveApprover = [];

  useEffect(() => {
    (async () => {
      const regularizationReasonList = await dispatch(
        getAttReguarzationReason(token),
      );
      regularizationReasonList?.payload?.map(el =>
        regReasonList?.push(el?.reason),
      );
      setRegularzitionReason(regReasonList);
      if (regularizationReasonList?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: regularizationReasonList?.error?.message,
          buttonText: 'Close',
          dispatch,
        });
      }
    })();

    (async () => {
      const leaveApprovers = token
        ? await dispatch(getLeaveApprovers({token, employeeID}))
        : [];

      leaveApprovers?.payload?.map(el =>
        listOfLeaveApprover?.push(el?.leaveApproverName),
      );
      setLeaveApproversList(listOfLeaveApprover);
    })();
  }, []);

  const renderRow = (rowData, rowID, highlighted) => {
    return (
      <View
        style={[{borderBottomColor: Colors.lightGray, borderBottomWidth: 1}]}>
        <Text style={{fontSize: 16}}>{rowData}</Text>
      </View>
    );
  };

  const renderRightComponent = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingTop: 4,
        position: 'absolute',
        right: 0,
      }}>
      <Image
        source={MonthImages.DropDownIcon}
        style={{
          height: 20,
          width: 20,
        }}
      />
    </View>
  );

  const onSelectItem = (item, index) => {
    let tempArr = [];
    dayData &&
      dayData.map((item, ind) => {
        if (index === ind) {
          tempArr.push((item.isSelected = true));
        } else {
          tempArr.push((item.isSelected = false));
        }
      });
    setSelectDay(item.type);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{paddingHorizontal: wp(2)}} key={index}>
        <TouchableOpacity
          onPress={() => {
            onSelectItem(item, index);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: widthPercentageToDP(25),
            }}>
            <View
              style={[
                style.checkbox,
                {
                  backgroundColor: item.isSelected
                    ? Colors.reddishTint
                    : Colors.white,
                },
              ]}></View>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
              }}>
              {item.type}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSubmit = () => {};

  return (
    <View style={style.container}>
      <View style={style.textHeader}>
        <Text style={style.text}>Leave Approver</Text>
      </View>
      <View style={style.dropdownCont}>
        <ModalDropdown
          style={{
            borderWidth: 1,
            backgroundColor: Colors.white,
            borderRadius: 3,
            paddingVertical: 5,
            height: 38,
            paddingLeft: 15,
          }}
          dropdownTextHighlightStyle={{color: Colors.white}}
          isFullWidth={true}
          showsVerticalScrollIndicator={false}
          // defaultValue={}
          options={leaveApproversList}
          dropdownStyle={{
            width: '50%',
            height:
              leaveApproversList && leaveApproversList.length == 1
                ? 30
                : leaveApproversList.length == 2
                ? 100
                : 120,
            paddingLeft: 6,
            lineHeight: 2,
          }}
          renderRow={renderRow}
          animated={true}
          renderRightComponent={renderRightComponent}
        />
      </View>
      <View style={style.textHeader}>
        <Text style={style.text}>Reason</Text>
      </View>
      <View style={style.dropdownCont}>
        <ModalDropdown
          style={{
            borderWidth: 1,
            backgroundColor: Colors.white,
            borderRadius: 3,
            paddingVertical: 5,
            height: 38,
            paddingLeft: 15,
          }}
          renderRightComponent={renderRightComponent}
          renderRow={renderRow}
          dropdownTextHighlightStyle={{color: Colors.white}}
          isFullWidth={true}
          showsVerticalScrollIndicator={false}
          // defaultValue={}
          options={regularizationReason}
          dropdownStyle={{
            width: '50%',
            paddingLeft: 6,
            height:
              regularizationReason && regularizationReason?.length == 4
                ? 100
                : 150,
          }}
          animated={true}
        />
      </View>
      <View style={style.halfFullCont}>
        <FlatList
          data={dayData}
          renderItem={renderItem}
          keyExtractor={item => item.type}
          horizontal={true}
        />
      </View>
      <View style={style.textHeader}>
        <Text style={style.text}>Comment</Text>
      </View>
      <View style={style.commentCont}>
        <TextInput style={style.comentBox} multiline={true} />
      </View>
      <View style={style.btnCont}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View
            style={[
              style.btn,
              {marginRight: 10, backgroundColor: Colors.reddishTint},
            ]}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}>
          <View
            style={[
              style.btn,
              {backgroundColor: Colors.parrotGreen, marginTop: 10},
            ]}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Regularization;
