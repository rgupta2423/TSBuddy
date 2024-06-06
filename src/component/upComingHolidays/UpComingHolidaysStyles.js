import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 18,
    paddingBottom: wp(6),
  },
  container: {
    paddingBottom: hp(1),
    paddingHorizontal: wp(3),
    marginTop: hp(1),
  },
  imageView: {
    // display: 'flex',
    // flexDirection: 'row',
    // backgroundColor: Colors.white,
    // marginTop: hp(0.6),
    // shadowOpacity: 0.1,
    // paddingLeft: wp(1),
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginTop: hp(0.6),
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: wp(4),
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset
    shadowOpacity: 0.2, // Set the shadow opacity
    shadowRadius: 0.1, // Set the shadow radius
    elevation: 1,
    marginBottom: 5,
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
    flex: 1,
  },
  textView: {
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(5),
    width: wp(40),
    borderRadius: 5,
    marginVertical: hp(0.5),
    backgroundColor: Colors.darkCyan,
  },
  // image: {height: 40, width: 40, marginTop: hp(1.8), flex: 1},
  image: {height: wp(10), width: wp(10)},
  text1: {marginTop: hp(2.4), flex: 5, marginLeft: wp(1)},
  text2: {
    fontFamily: FontFamily.RobotoBlack,
    fontSize: FontSize.h16,
    color: Colors.white,
  },
  upcomingText: {
    fontFamily: FontFamily.RobotoLight,
    fontSize: FontSize.h18,
    marginTop: hp(1),
    color: Colors.black,
  },
  noHolidaysContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHolidaysText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 16,
    color: Colors.lightBlue,
    marginVertical: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
    flex: 8,
  },
  daysContainer: {
    flex: 1,
  },
  daysText: {
    fontSize: 26,
    fontFamily: FontFamily.RobotoLight,
    paddingLeft: 5,
  },
  typeDateContainer: {
    justifyContent: 'center',
    flex: 2,
  },
  leaveTypeText: {
    fontSize: 18,
    color: '#0F673E',
    fontFamily: FontFamily.RobotoMedium,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
});
