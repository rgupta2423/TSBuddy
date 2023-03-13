import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'utils/Responsive';
import styles from './SalaryDetailsStyles';
import moment from 'moment';
import {deductionData, earnindData} from 'utils/DummyData';
import {SalaryPDFDownloadScreen} from 'navigation/Route';
const SalaryDetail = ({route, navigation}) => {
  const data = route.params;
  const [show, setShow] = useState(false);
  const [secondShow, setSecondShow] = useState(false);
  const renderData = [
    {lable: 'Arrear Amount', value: data.arrear_amount},
    {lable: 'Bank Account No', value: data.bank_account_no},
    {lable: 'Bank Name', value: data.bank_name},
    {lable: 'Creation', value: moment(data.creation).format(`DD-MMM-YYYY`)},
    {lable: 'Employee ID', value: data.employee},
    {lable: 'Employee Name', value: data.employee_name},
    {lable: 'Fiscal Year', value: data.fiscal_year},
    {lable: 'Gross Pay', value: data.gross_pay},
    {lable: 'Leave Encashment Amount', value: data.leave_encashment_amount},
    {lable: 'Month', value: data.month},
    {lable: 'Net Pay', value: data.net_pay},
    {lable: 'Pan Number', value: data.pan_number},
    {lable: 'Payment Days', value: data.payment_days},
    {lable: 'Rounded Total', value: data.rounded_total},
    {lable: 'Total Days', value: data.total_days_in_month},
    {lable: 'Total Deduction', value: data.total_deduction},
  ];

  const earnindData = [
    {lable: 'House Rent Allowance', value: '4000'},
    {lable: 'Basic', value: '5565605'},
    {lable: 'Standard Deduction', value: '10000'},
    {lable: 'Parking Reimbursement', value: '600.00'},
    {lable: 'Special Allowance', value: '5675656'},
  ];
  const deductionData = [
    {lable: 'Employee PF', value: '60000'},
    {lable: 'Meal Charges', value: '600'},
    {lable: 'Meal Charges', value: '600'},
    {lable: 'Meal Charges', value: '600'},
    {lable: 'Meal Charges', value: '800'},
  ];
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={MonthImages.backArrowS}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textView}>
          <Text style={styles.text1}>Salary Detail</Text>
        </View>
      </View>
      <View style={styles.imageView}>
        <Image
          source={data.monthImage}
          style={{height: 80, width: 120, marginRight: wp(4)}}
        />
        <Text style={styles.monthText}>
          {data.month} {data.year}
        </Text>
        <TouchableOpacity
          onPress={() => {
            // setSalaryDetailsData(elemnt);
            navigation.navigate(SalaryPDFDownloadScreen, data);
          }}>
          <Image
            source={MonthImages.download}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{flex: 1, marginBottom: hp(2)}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingHorizontal: wp(1)}}>
          {renderData.map((element, index) => {
            return (
              <View key={index} style={styles.labelView}>
                <Text style={{flex: 0.6}}>{element.lable}</Text>
                <Text style={{color: Colors.grey, flex: 0.4}}>
                  {element.value}
                </Text>
              </View>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              setShow(show ? false : true);
            }}>
            <View style={styles.earningView}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Earnings
              </Text>
              <View style={styles.minusImageView}>
                <Image
                  source={show ? MonthImages.plus : MonthImages.minus}
                  style={{height: 15, width: 15}}
                />
              </View>
            </View>
          </TouchableOpacity>
          {show ? (
            <View>
              {earnindData.map((elemnt, index) => {
                return (
                  <View key={index} style={styles.earningTextView}>
                    <Text style={{flex: 0.6}}>{elemnt.lable}</Text>
                    <Text style={{color: 'gray', flex: 0.4}}>
                      {elemnt.value}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              setSecondShow(secondShow ? false : true);
            }}>
            <View style={styles.deductionView}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Deductions
              </Text>
              <View style={styles.deductionImageView}>
                <Image
                  source={secondShow ? MonthImages.plus : MonthImages.minus}
                  style={{height: 15, width: 15}}
                />
              </View>
            </View>
          </TouchableOpacity>
          {secondShow ? (
            <View>
              {deductionData.map((elemnt, index) => {
                return (
                  <View key={index} style={styles.deductionTextView}>
                    <Text style={{flex: 0.6}}>{elemnt.lable}</Text>
                    <Text style={{color: 'gray', flex: 0.4}}>
                      {elemnt.value}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default SalaryDetail;
