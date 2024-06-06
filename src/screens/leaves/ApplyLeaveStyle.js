import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  screenWidth,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  mainBottomContainer: {
    flex: 1,
  },
  mainContainerContentContainerStyle: {
    flexGrow: 1,
  },
  swiperContainer: {
    height: hp(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
  },
  headerSliderText: {
    fontSize: FontSize.h16,
    fontFamily: FontFamily.RobotoBold,
    color: Colors.dune,
  },
  resourcePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    // zIndex: 99999,
  },
  selectResourceText: {
    fontSize: FontSize.h17,
    fontFamily: FontFamily.RobotoMedium,
  },
  formContainer: {
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  fromToContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.whitishGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginTop: 8,
  },
  calenderContainer: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 5,
    height: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fromContainer: {
    width: '50%',
    paddingRight: 12,
  },
  toContainer: {
    width: '50%',
  },
  zIndex1000: {zIndex: 1000},
  fromText: {
    fontWeight: '700',
    marginBottom: 5,
    marginLeft: 4,
    fontSize: 15,
  },
  toText: {
    fontWeight: '700',
    marginBottom: 5,
    marginLeft: 4,
    fontSize: 15,
  },
  reasonText: {
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 4,
  },
  reasonContainer: {
    backgroundColor: Colors.whitishGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginTop: 8,
  },
  resourceReasonText: {
    backgroundColor: Colors.white,
    height: hp(8),
    fontSize: 20,
    textAlignVertical: 'top',
  },
  reasonTextInput: {
    backgroundColor: Colors.white,
    height: hp(8),
    fontSize: 16,
    textAlignVertical: 'top',
  },
  leaveApproverContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.whitishGray,
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    marginTop: 8,
    justifyContent: 'center',
    zIndex: 0,
  },
  negativeZIndex: {
    zIndex: -1,
  },
  leaveApproverText: {
    fontWeight: 'bold',
    marginRight: wp(12),
  },
  leaveApproverName: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: hp(2),
    // position: 'absolute',
    // bottom: 0,
  },
  selectLeaveApproversDropdown: {
    borderRadius: 4,
  },
  resourceButtonContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 24,
    paddingVertical: 6,
    marginBottom: hp(2),
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: Colors.white,
    paddingHorizontal: 32,
    borderRadius: 5,
    paddingVertical: 6,
  },
  resourceButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    borderRadius: 5,
    paddingVertical: 6,
  },
  mainPart: {
    flex: 1,
    justifyContent: 'space-between',
  },
  applyText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sliderComp: {
    width: wp(48),
    marginRight: wp(2),
  },
  leaveCard: {
    width: screenWidth - wp(25),
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginHorizontal: wp(4),
    marginVertical: 5,
    // paddingVertical:hp(2)
  },
  leaveTextContainer: {
    borderBottomWidth: 0.8,
    paddingBottom: hp(0.5),
  },
  leaveText: {
    textAlign: 'center',
    color: Colors.black,
    fontWeight: '700',
  },
  bottomPart: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  remainingContainer: {
    width: wp(11),
    height: wp(11),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.parrotGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(3),
  },
  remainingText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.parrotGreen,
  },
  verticalLine: {
    height: '85%',
    borderWidth: 0.4,
    borderColor: 'black',
  },
  leaveDetails: {
    // alignItems: 'center',
    alignContent: 'center',
    marginLeft: wp(3),
  },
  allocated: {
    flex: 1,
    justifyContent: 'center',
  },
  taken: {
    flex: 1,
  },
  allocatedText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '600',
  },
  takenText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '600',
  },
  headerContainer: {flex: 1},
  headerSliderContentContainerStyle: {flexGrow: 1},
  headerSlider: {
    backgroundColor: Colors.lighterBlue,
    paddingHorizontal: wp(2.4),
    paddingVertical: hp(1.2),
    flex: 1,
  },
  platformStyle: {
    marginBottom: hp(5),
    marginHorizontal: '5%',
  },
  marginBottom: hp(2),
  dropDownContainerStyle: {borderColor: Colors.borderColor},
  searchContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
    height: 40,
  },

  row: {
    padding: 8,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
  highlighted: {
    // backgroundColor: 'red',
  },
  rowText: {
    fontSize: 16,
  },
  cardRightImage: {
    height: 20,
    width: 20,
  },
  cardRightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingTop: 4,
    position: 'absolute',
    right: 0,
  },
  rightButtonCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonText: {
    fontSize: 16,
  },
  selectLeaveDropdown: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderRadius: 3,
    paddingVertical: 5,
    // height: 32,
  },
  selectLeaveDropdownStyle: {
    width: '45%',
    height: 0,
    paddingLeft: 6,
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
  downloadBTN: {
    width: wp(6),
    height: hp(3),
  },
  leaveApproverSelect: {
    borderRadius: 4,
  },

  resourceSelectContainerStyle: {
    width: '50%',
    // height: 150,
  },
  halfDayDropdownContainer: {
    zIndex: 9999,
  },
  halfDayDropdown: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    // opacity: totalNumberOfLeaveDays === 1 ? 1 : 0.5,
    borderRadius: 3,
    paddingVertical: 5,
    // height: 32,
  },
  lessOpacity: {
    opacity: 0.6,
  },
  halfDayDropdownStyles: {
    width: '45%',
    paddingLeft: 10,
    height: 100,
  },
  justifyContentFlexEnd: {justifyContent: 'flex-end'},
  cardLeftImage: {height: 20, width: 20},
  imageRight: {height: 20, width: 20},
  backgroundGreen: {backgroundColor: Colors.green},
  backgroundWhite: {backgroundColor: Colors.white},
});
