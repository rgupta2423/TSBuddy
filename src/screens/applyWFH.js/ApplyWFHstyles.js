import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.whitishBlue,
  },
  container: {
    backgroundColor: Colors.lighterBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    // paddingVertical: hp(2),
    alignItems: 'center',
  },
  lunchTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: hp(0.5),
  },
  text1: {
    color: Colors.white,
    // marginRight: wp(2),
    fontSize: 18,
    fontFamily: FontFamily.RobotoMedium,
  },
  secondView: {
    backgroundColor: Colors.white,
    top: hp(1),
    marginHorizontal: wp(4),
    marginVertical: wp(4),
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    display: 'flex',
    borderRadius: 12,
    marginBottom: hp(2),
  },
  dropDownView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  thirdView: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    // marginTop: hp(2),
  },
  fourthView: {
    borderRadius: wp(25),
    borderWidth: 1,
    width: wp(40),
    // justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
  },

  fifthView: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
    // marginTop: hp(2),
  },
  sixthView: {
    borderRadius: wp(25),
    borderWidth: 1,
    width: wp(40),
    alignItems: 'center',
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
  },
  submitView: {
    backgroundColor: Colors.darkBlue,
    paddingVertical: hp(1.5),
    width: wp(50),
    marginHorizontal: wp(20),
  },
  buttomView: {
    height: windowHeight >= 700 ? hp(35) : hp(28),
    shadowOpacity: 0.1,
    // top: hp(2),
    marginHorizontal: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
  },
  appliedView: {
    marginHorizontal: wp(4),
    // backgroundColor: Colors.lightGray,
    // paddingVertical: hp(1.5),
    // borderBottomWidth: 1,
  },
  appliedText: {
    color: Colors.lovelyPurple,
    fontWeight: 'bold',
    fontSize: 18,
  },
  monthlyRequestView: {
    marginTop: hp(1),
    shadowOpacity: 0.4,
    borderRadius: 2,
    backgroundColor: Colors.lightGray,
  },
  monthlyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  cancelView: {
    backgroundColor: Colors.red,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(1),
    borderRadius: 4,
  },
  buttomTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingVertical: hp(3),
  },
  buttomText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightBlue,
    marginRight: wp(5),
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  selectedDated: {
    fontSize: 14,
  },
  request: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  appliedRequestsLeft: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    flex: 1,
    marginRight: 10,

    marginLeft: 0,
  },
  requestText: {
    fontSize: 11.5,
    // marginRight: 14,
  },
  requestType: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 40,
    color: Colors.dune,
  },
  requestTypeContainer: {
    backgroundColor: Colors.whitishPink,
    borderRadius: 8,
    marginRight: 16,
  },
  cancelButton: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    color: Colors.white,
  },
  image: {
    width: 20,
    aspectRatio: 1,
  },
  datesContainer: {
    flexDirection: 'row',
    zIndex: -1,
  },
  reasonViewBox: {
    width: '100%',
    alignItems: 'center',
    zIndex: -1,
  },
  reasonInputBox: {
    paddingLeft: 15,
    fontSize: 17,
    borderWidth: 0.5,
    borderColor: Colors.lightGray1,
    borderRadius: 10,
    width: '95%',
    height: 110,
    marginTop: 20,
    textAlignVertical: 'top',
  },
});
