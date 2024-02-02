import React from 'react';
import {Colors} from 'colors/Colors';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
import {useEffect, useState} from 'react';
import style from './RegularzationStyles';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAttReguarzationReason,
  getLeaveApprovers,
  getWorkModeOfEmployee,
  requestForAttendanceRegularization,
} from 'redux/homeSlice';
import {ERROR} from 'utils/string';
import jwt_decode from 'jwt-decode';
import CustomHeader from 'navigation/CustomHeader';
import Loader from 'component/loader/Loader';
import {FontFamily} from 'constants/fonts';
import ShowAlert from 'customComponents/CustomError';

const Regularization = ({navigation, route}) => {
  const [regularizationReason, setRegularzitionReason] = useState([]);
  const [leaveApproversList, setLeaveApproversList] = useState([]);
  // console.log('leaveApproversList:', leaveApproversList);
  const [selectApprover, setSelectApprover] = useState('');
  const [selectReasons, setSelectReasons] = useState('');
  const [commentText, setCommentText] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [approoverId, setApproveId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [approvers, setApprovers] = useState([]);

  // const [dayData, setDayData] = useState([
  //   {
  //     isSelected: false,
  //     type: 'Half day',
  //   },
  //   {isSelected: false, type: 'Full day'},
  // ]);

  const attendanceId = route?.params?.attendanceId;
  const attDate = route?.params?.attDate;
  const attendanceDate = new Date(route?.params?.attDate);
  const date = `${
    attendanceDate.getDate() < 10
      ? '0' + attendanceDate.getDate()
      : attendanceDate.getDate()
  }-${
    +attendanceDate.getMonth() + 1 < 10
      ? '0' + (+attendanceDate.getMonth() + 1)
      : +attendanceDate.getMonth() + 1
  }-${attendanceDate.getFullYear()}`;

  const {userToken: token} = useSelector(state => state.auth);
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
      leaveApprovers?.payload?.map(el => {
        const firstName = el?.leaveApproverFirstName;
        const middleName = el?.leaveApproverMiddleName;
        const lastName = el?.leaveApproverLastName;

        const userName = `${firstName ? firstName : ''} ${
          middleName ? middleName + ' ' : ''
        }${lastName ? lastName : ''}`;
        listOfLeaveApprover?.push(userName);
      });

      setApprovers(leaveApprovers?.payload);
      setLeaveApproversList(listOfLeaveApprover);
    })();

    (async () => {
      const workMode =
        token && (await dispatch(getWorkModeOfEmployee({token, employeeID})));
      setWorkMode(workMode.payload.workMode);
    })();
  }, []);

  const renderRow = (rowData, rowID, highlighted) => {
    return (
      <View
        style={[
          {borderBottomColor: Colors.lightGray, borderBottomWidth: 1},
          highlighted && style.highlighted,
        ]}>
        <Text style={{fontSize: 16, backgroundColor: 'white'}}>{rowData}</Text>
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

  // const onSelectItem = (item, index) => {
  //   let tempArr = [];
  //   dayData &&
  //     dayData?.map((i, ind) => {
  //       if (index === ind) {
  //         tempArr.push((i.isSelected = true));
  //       } else {
  //         tempArr.push((i.isSelected = false));
  //       }
  //     });
  //   setSelectDay(item.type);
  // };

  // const renderItem = ({item, index}) => {
  //   return (
  //     <View style={{paddingHorizontal: wp(2)}} key={index}>
  //       <Pressable
  //         onPress={() => {
  //           onSelectItem(item, index);
  //         }}>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             justifyContent: 'space-around',
  //             width: wp(25),
  //           }}>
  //           <View
  //             style={[
  //               style.checkbox,
  //               {
  //                 backgroundColor: item.isSelected
  //                   ? Colors.reddishTint
  //                   : Colors.white,
  //               },
  //             ]}></View>
  //           <Text
  //             style={{
  //               fontSize: 16,
  //               color: 'black',
  //             }}>
  //             {item.type}
  //           </Text>
  //         </View>
  //       </Pressable>
  //     </View>
  //   );
  // };

  const handleSubmit = async () => {
    if (!selectApprover) {
      alert('Please select Leave Approver.');
      return;
    }

    if (!selectReasons) {
      alert('Please select a reason.');
      return;
    }
    if (!commentText) {
      alert('Please enter a comment.');
      return;
    }

    // if (!selectDay) {
    //   alert('Please select is this regularization for half or full day.');
    //   return;
    // }

    try {
      setIsLoading(true);
      const requestRegularsation =
        token &&
        (await dispatch(
          requestForAttendanceRegularization({
            token,
            body: {
              attendanceId: attendanceId,
              employeeId: employeeID,
              attendanceDate: attDate,
              reasonId: selectReasons,
              attendanceType: 'Full day',
              halfDayInfo: null,
              comment: commentText,
              mode: workMode,
              approverId: approoverId,
              status: 'Open',
            },
          }),
        ));

      if (requestRegularsation?.error) {
        alert(requestRegularsation.error.message);
      } else {
        Alert.alert('Success', 'Regularisation form submitted successfully!', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    } catch (err) {
      console.log('errorRegularization:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={false}
        title="Regularization"
        navigation={navigation}
        isHome={false}
        showHeaderRight={false}
      />
      <View style={style.container}>
        <View
          style={{
            // borderWidth: 1,

            paddingVertical: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.black,
            borderRadius: 50,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: FontFamily.RobotoMedium,
              color: Colors.white,
            }}>
            Date: {date}
          </Text>
        </View>
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
            onSelect={index => {
              setSelectApprover(leaveApproversList[index]);
              const selectedLeaveApprover = approvers[index];
              setApproveId(selectedLeaveApprover?.employeeId);
            }}
            dropdownTextHighlightStyle={{
              color: Colors.white,
              backgroundColor: Colors.white,
            }}
            isFullWidth={true}
            showsVerticalScrollIndicator={false}
            options={leaveApproversList}
            dropdownStyle={{
              width: '50%',
              height:
                leaveApproversList && leaveApproversList.length == 1
                  ? 30
                  : leaveApproversList.length == 2
                  ? 50
                  : 110,
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
            onSelect={item => {
              setSelectReasons(item + 1);
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
          {/* <FlatList
            data={dayData}
            renderItem={renderItem}
            keyExtractor={item => item.type}
            horizontal={true}
          /> */}
        </View>
        <View style={style.textHeader}>
          <Text style={style.text}>Comment</Text>
        </View>
        <View style={style.commentCont}>
          <TextInput
            style={style.comentBox}
            onChangeText={text => {
              setCommentText(text);
            }}
            multiline={true}
          />
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
      {isLoading ? <Loader /> : null}
    </>
  );
};

export default Regularization;
