import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './salarySlipStyle';
import SalarSlipModal from 'modals/SalarySlipModal';
import {authLoginStatus} from 'Auth/LoginSlice';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {monthImages} from 'defaultData';
import {SalaryDetailsScreen, SalaryPDFDownloadScreen} from 'navigation/Route';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomHeader from 'navigation/CustomHeader';
import {getSalarySlipData} from 'redux/homeSlice';
import ShowAlert from 'customComponents/CustomError';
import {ERROR} from 'utils/string';

const SalarySlip = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);
  const {salarySlipData} = useSelector(state => state.home);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [filteredSelectedDate, setFilteredSelectedDate] = useState();
  const [filterCalenderOpen, setFilterCalenderOpen] = useState(false);
  const {isGuestLogin} = useSelector(state => state.auth);

  const [salarySlips, setSalarySlips] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(authLoginStatus(false));
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  const submitPassword = () => {
    setisAuthenticated(true);
  };

  useEffect(() => {
    const getSalarySlips = async function () {
      try {
        const salarySlipsResponse = await dispatch(getSalarySlipData(token));

        if (salarySlipsResponse?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: salarySlipsResponse?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }
        setSalarySlips(salarySlipsResponse.payload);
      } catch (err) {
        console.log('errSalary:', err);
      }
    };

    if (!isGuestLogin) {
      getSalarySlips();
    }
  }, [dispatch, navigation, token, isGuestLogin]);

  const filterSalarySleepData = date => {
    setFilteredSelectedDate(date);
    setFilterCalenderOpen(false);
    // const selectedYear = filteredSelectedDate?.toString()?.split(' ')[3];
    // const selctedMonth = new Date(filteredSelectedDate).getMonth();

    // for (key in newyearWiseData) {
    //   if (key === selectedYear) {
    //     let selectedYearData = newyearWiseData[key];
    //     finalData = selectedYearData.filter(
    //       element => parseInt(element.month) === parseInt(selctedMonth),
    //     );
    //   }
    // }
    // setnewyearWiseData(finalData);
  };

  return (
    <>
      <CustomHeader
        showDrawerMenu={true}
        title="Finance"
        navigation={navigation}
        isHome={false}
        showHeaderRight={true}
      />
      <View style={styles.containerExceptHeader}>
        {salarySlipData[2]?.employeeName ? (
          <Text style={styles.NameView}>{salarySlipData[2]?.employeeName}</Text>
        ) : null}

        {!isAuthenticated ? (
          <SalarSlipModal submitPassword={submitPassword} />
        ) : salarySlips.length ? (
          <ScrollView>
            {salarySlips?.map((salarySlip, ind) => {
              const month = salarySlip.month;
              const fiscalYear = salarySlip.fiscalYear;
              const [firstYear, secondYear] = fiscalYear.split('-');

              const finalSalaryYear = month > 3 ? firstYear : secondYear;

              return (
                <View key={ind} style={styles.ViewForMOnth}>
                  <View style={styles.backgroundImageView}>
                    <TouchableOpacity
                      style={styles.salary}
                      onPress={() => {
                        navigation.navigate(SalaryDetailsScreen, {
                          ...salarySlip,
                          monthImage: monthImages[salarySlip.month].monthImage,
                        });
                      }}>
                      <ImageBackground
                        resizeMode="cover"
                        imageStyle={styles.imageBackground}
                        source={monthImages[salarySlip.month].monthImage}
                        style={styles.backGroundImage}>
                        {/* <View style={styles.smalllImageView}>
                  <Image
                    source={salarySlip.monthIcon}
                    style={styles.image}
                  />
                </View> */}
                        <Text style={styles.monthText}>
                          {salarySlip.monthName}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>

                  {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(SalaryPDFDownloadScreen, salarySlip);
                  }}> */}
                  <View style={styles.downloadView}>
                    <View style={styles.downloadTextView}>
                      {/* <Text style={styles.downloadtext}>Download</Text> */}
                      <Text style={styles.downloadtext}>{`${
                        monthImages[salarySlip.month].monthName
                      }-${finalSalaryYear}`}</Text>
                    </View>
                  </View>
                  {/* </TouchableOpacity> */}
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.noSalaryContainer}>
            <Text style={styles.noSalaryText}>No Salary Slips Found.</Text>
          </View>
        )}

        <DateTimePickerModal
          isVisible={filterCalenderOpen}
          mode="date"
          onConfirm={date => {
            filterSalarySleepData(date);
          }}
          onCancel={() => {
            setFilterCalenderOpen(false);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            setFilterCalenderOpen(true);
          }}
          style={styles.filterContainer}>
          <Image source={MonthImages.filterIcon2x} style={styles.filterImage} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SalarySlip;
// https://github.com/RadhikaThinksys/TSBuddy/invitations

// <View style={styles.salariesContainer}>
//   {keyOfObject ? (
//     keyOfObject?.length > 0 ? (
//       keyOfObject?.map((el, index) => {
//         return (
//           <ScrollView key={index} style={styles.salaryYearContainer}>
//             <View key={index} style={{paddingHorizontal: wp(1)}}>
//               <View style={styles.yearMainView}>
//                 <View style={styles.line} />
//                 <View style={styles.yearTextView}>
//                   <Text style={styles.yearText}>{el}</Text>
//                 </View>
//               </View>
//               <View style={styles.MapView}>
//                 {newyearWiseData &&
//                   Object.keys(newyearWiseData).length !== 0 &&
//                   newyearWiseData[el].map((salarySlip, ind) => {
//                     return (
//                       <View key={ind} style={styles.ViewForMOnth}>
//                         <View style={styles.backgroundImageView}>
//                           <TouchableOpacity
//                             style={styles.salary}
//                             onPress={() => {
//                               navigation.navigate(
//                                 SalaryDetailsScreen,
//                                 salarySlip,
//                               );
//                             }}>
//                             <ImageBackground
//                               resizeMode="cover"
//                               imageStyle={styles.imageBackground}
//                               source={salarySlip.monthImage}
//                               style={styles.backGroundImage}>
//                               <View style={styles.smalllImageView}>
//                                 <Image
//                                   source={salarySlip.monthIcon}
//                                   style={styles.image}
//                                 />
//                               </View>
//                               <Text style={styles.monthText}>
//                                 {salarySlip.monthName}
//                               </Text>
//                             </ImageBackground>
//                           </TouchableOpacity>
//                         </View>
//                         <TouchableOpacity
//                           onPress={() => {
//                             navigation.navigate(
//                               SalaryPDFDownloadScreen,
//                               salarySlip,
//                             );
//                           }}>
//                           <View style={styles.downloadView}>
//                             <View style={styles.downloadTextView}>
//                               <Text style={styles.downloadtext}>
//                                 Download
//                               </Text>
//                             </View>
//                           </View>
//                         </TouchableOpacity>
//                       </View>
//                     );
//                   })}
//               </View>
//             </View>
//           </ScrollView>
//         );
//       })
//     ) : (
//       <View style={styles.salaryNotFound}>
//         <Text style={styles.salaryNotFoundText}>
//           Salary Slips Not found!
//         </Text>
//       </View>
//     )
//   ) : null}
// </View>
