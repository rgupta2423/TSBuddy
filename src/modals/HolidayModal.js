import React, {memo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {holidayDatawithImage} from '../../db';
import {bounce} from 'react-native/Libraries/Animated/Easing';

const HolidayModal = ({HolidaysData, holidaysShowModal}) => {
  const {description, holidayDate, newDateFormate, holidaysSetShowModal} =
    HolidaysData;
  const [image, setImage] = useState('');
  const [definition, setDefinition] = useState('');

  let daysArray = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let day = new Date(holidayDate).getDay();
  let dayName = daysArray[day];

  useEffect(() => {
    holidayDatawithImage &&
      holidayDatawithImage.length &&
      holidayDatawithImage.map(el => {
        if (el.nameOfHolidays.toLowerCase() === description.toLowerCase()) {
          setImage(el.imageOfHoliday);
          setDefinition(el.descriptions);
        }
      });
  }, []);

  return (
    <>
      {holidaysShowModal ? (
        <TouchableWithoutFeedback
          onPress={() => {
            holidaysSetShowModal(false);
          }}>
          <Modal
            backdropOpacity={0.2}
            // animationType="fade"
            animationIn={'bounceIn'}
            animationOut={'jello'}
            transparent={true}
            closeOnClick={true}
            isVisible={holidaysShowModal}
            onBackdropPress={() => {
              holidaysSetShowModal(false);
            }}
            onBackButtonPress={() => {
              holidaysSetShowModal(false);
            }}>
            <View style={styles.container}>
              <ImageBackground
                source={image}
                resizeMode="contain"
                style={{height: '100%', width: '100%'}}>
                <View style={styles.secondContainer}>
                  <Text style={{color: Colors.darkBlue}}>{newDateFormate}</Text>
                  <Text style={{color: Colors.darkBlue}}>{dayName}</Text>
                </View>
                <View style={styles.thirdView}>
                  <Text style={styles.textline}>{description}</Text>
                  <Text style={{opacity: 0.6, fontSize: 16}}>{definition}</Text>
                </View>
              </ImageBackground>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      ) : null}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '34.5%',
    width: '90%',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginBottom: 200,
    borderRadius: 5,
  },
  secondContainer: {
    backgroundColor: Colors.white,
    padding: 2,
    width: wp(32),
    height: hp(12),
    marginTop: hp(16),
    marginLeft: wp(4),
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdView: {
    backgroundColor: Colors.white,
    paddingHorizontal: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(3),
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
  },
  textline: {
    color: Colors.blue,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: hp(1),
  },
});
export default memo(HolidayModal);
