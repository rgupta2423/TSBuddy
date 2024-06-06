import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import style from './RegularzationStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAttReguarzationReason,
  getLeaveApprovers,
  getWorkModeOfEmployee,
  requestForAttendanceRegularization,
} from 'redux/homeSlice';
import {ERROR, LEAVE_APPROVER_FAIL_FETCH} from 'utils/string';
import jwt_decode from 'jwt-decode';
import CustomHeader from 'navigation/CustomHeader';
import Loader from 'component/loader/Loader';
import ShowAlert from 'customComponents/CustomError';
import DropDownPicker from 'react-native-dropdown-picker';

const Regularization = ({navigation, route}) => {
  const [regularizationReason, setRegularzitionReason] = useState([]);
  const [leaveApproversList, setLeaveApproversList] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openLeaveApprovers, setOpenLeaveApprovers] = useState(false);
  const [openReason, setOpenReason] = useState(false);
  const [leaveApproversValue, setLeaveApproversValue] = useState(null);
  const [reasonValue, setReasonValue] = useState(null);

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

  useEffect(() => {
    (async () => {
      const regularizationReasonList = await dispatch(
        getAttReguarzationReason(token),
      );
      regularizationReasonList?.payload?.map(el =>
        regReasonList?.push({value: el?.id, label: el?.reason}),
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
      const uniqueNamesSet = new Set();
      const uniqueObjects = leaveApprovers?.payload.filter(obj => {
        if (!uniqueNamesSet.has(obj.employeeId)) {
          uniqueNamesSet.add(obj.employeeId);
          return true;
        }
        return false;
      });

      if (!leaveApprovers.payload) {
        alert(LEAVE_APPROVER_FAIL_FETCH);
      }

      const listOfLeaveApprovers = uniqueObjects.map(approver => {
        return {
          value: `${approver?.employeeId}`,
          label: `${
            approver.leaveApproverFirstName
              ? approver.leaveApproverFirstName + ' '
              : ''
          }${
            approver.leaveApproverMiddleName
              ? approver.leaveApproverMiddleName + ' '
              : ''
          }${approver.leaveApproverLastName || ''}`,
        };
      });

      setLeaveApproversList(listOfLeaveApprovers);
      // setLeaveApproversValue(listOfLeaveApprovers[0].value);
    })();

    (async () => {
      const getWorkMode =
        token && (await dispatch(getWorkModeOfEmployee({token, employeeID})));
      setWorkMode(getWorkMode.payload.workMode);
    })();
  }, [dispatch, employeeID, token]);

  const handleSubmit = async () => {
    if (!leaveApproversValue) {
      alert('Please select Leave Approver.');
      return;
    }

    if (!reasonValue) {
      alert('Please select a reason.');
      return;
    }
    if (!commentText) {
      alert('Please enter a comment.');
      return;
    }

    try {
      setIsLoading(true);

      const body = {
        attendanceId: attendanceId,
        employeeId: employeeID,
        attendanceDate: attDate,
        reasonId: reasonValue,
        attendanceType: 'Full day',
        halfDayInfo: null,
        comment: commentText,
        mode: workMode,
        approverId: leaveApproversValue,
        status: 'Open',
      };
      const requestRegularsation =
        token &&
        (await dispatch(
          requestForAttendanceRegularization({
            token,
            body,
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
        <View style={style.dateContainer}>
          <Text style={style.dateText}>Date: {date}</Text>
        </View>
        <View style={style.textHeader}>
          <Text style={style.text}>Leave Approver</Text>
        </View>

        <View style={[style.dropdownCont, style.leaveApproverContainer]}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            scrollEnabled={true}
            placeholder={'Select Leave Approver....'}
            open={openLeaveApprovers}
            value={leaveApproversValue}
            items={leaveApproversList}
            setOpen={setOpenLeaveApprovers}
            setValue={setLeaveApproversValue}
          />
        </View>
        <View style={style.textHeader}>
          <Text style={style.text}>Reason</Text>
        </View>
        <View style={[style.dropdownCont, style.reasonContainer]}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            scrollEnabled={true}
            placeholder={'Select Reason....'}
            open={openReason}
            value={reasonValue}
            items={regularizationReason}
            setOpen={setOpenReason}
            setValue={setReasonValue}
          />
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
            <View style={[style.btn, style.cancelBtnContainer]}>
              <Text style={style.cancelBtnText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}>
            <View style={[style.btn, style.submitBtnContainer]}>
              <Text style={style.submitBtnText}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? <Loader /> : null}
    </>
  );
};

export default Regularization;
