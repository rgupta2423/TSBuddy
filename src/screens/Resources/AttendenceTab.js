import React from 'react';
import {ScrollView} from 'react-native';
import styles from './AttendenceTabStyle';
import AttendenceTabLayout from './AttendenceTabLayout';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetDailyAttendanceByEmpId} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';
import {renderNoLeaves} from 'utils/utils';
import Loader from 'component/loader/Loader';

const AttendenceTab = ({employeeID, employeeName}) => {
  const dispatch = useDispatch();
  const {userToken: token} = useSelector(state => state.auth);

  const [attendenceArray, setAttendenceArray] = useState([]);
  const [loading, setLoading] = useState(false);

  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const getDailyAttaindance = await dispatch(
        GetDailyAttendanceByEmpId({token, employeeID, month, year}),
      );
      setLoading(false);

      const outputAttendance = getDailyAttaindance.payload;
      setAttendenceArray(outputAttendance);

      if (getDailyAttaindance?.error) {
        ShowAlert({
          messageHeader: ERROR,
          messageSubHeader: getDailyAttaindance?.error?.message,
          buttonText: 'Close',
          dispatch,
        });
      }
    })();
  }, [dispatch, employeeID, month, token, year]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.mainContainer}>
      {attendenceArray?.length > 0
        ? attendenceArray?.map(attendenceData => {
            return (
              <AttendenceTabLayout
                key={attendenceData.attendanceDate}
                data={attendenceData}
                employeeName={employeeName}
              />
            );
          })
        : renderNoLeaves({styles, message: 'No Attendance Data Found.'})}
    </ScrollView>
  );
};

export default AttendenceTab;
