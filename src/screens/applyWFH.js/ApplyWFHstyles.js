import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.whitishBlue,
    flexDirection: 'column',
    flex: 1,
  },
  resourcePickerContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zIndex9999: {
    zIndex: 9999,
  },
  selectResourceText: {
    fontSize: FontSize.h17,
    fontFamily: FontFamily.RobotoMedium,
    marginRight: 10,
  },
  resourceSelectContainerStyle: {
    flex: 1,
  },
  leaveApproverSelect: {
    borderRadius: 4,
  },
  containerContentContainerStyle: {},
  contentContainer: {
    flex: 1,
  },
  secondView: {
    backgroundColor: Colors.white,
    marginHorizontal: wp(4),
    marginVertical: 5,
    paddingHorizontal: wp(2),
    paddingVertical: hp(2),
    borderRadius: 12,
    flex: 0.4,
  },
  dropDownView: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  daysCount: {
    marginBottom: hp(1.6),
    fontSize: 18,
    color: Colors.black,
  },
  dropDownContainer: {
    zIndex: 9999,
  },
  thirdView: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
  },
  fromDate: {
    marginBottom: hp(1),
    fontSize: 18,
    color: Colors.black,
  },
  fourthView: {
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

  fifthView: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
  },
  toDate: {
    fontSize: 18,
    color: Colors.black,
    marginBottom: hp(1),
  },
  selectToDate: {
    opacity: 1,
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
  buttomView: {
    marginBottom: 20,
    shadowOpacity: 0.1,
    marginHorizontal: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
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
  lessOpacity: {
    opacity: 0.5,
  },
  buttonClear: {
    marginTop: 15,
    backgroundColor: Colors.grayishWhite,
    paddingHorizontal: wp(8.6),
    borderRadius: 200,
    paddingVertical: hp(1.4),
  },
  clear: {
    color: Colors.black,
    textAlign: 'center',
    fontSize: 17,
  },
  buttonApply: {
    marginTop: 15,
    backgroundColor: Colors.lovelyPurple,
    paddingHorizontal: wp(9.2),
    borderRadius: 200,
    paddingVertical: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  apply: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 17,
  },
  wfhHistoryContainer: {
    flex: 0.5,
  },
  appliedView: {
    marginHorizontal: wp(4),
  },
  wfhHistoryText: {
    color: Colors.lovelyPurple,
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttomText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.lightBlue,
    marginRight: wp(5),
  },
  selectedDated: {
    fontSize: 14,
  },
  flatlistStyle: {
    height: '100%',
  },
  WFHListLoaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noWFHContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noWFH: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 16,
    color: Colors.lightBlue,
    marginVertical: 4,
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
    marginRight: 10,
    marginLeft: 0,
  },
  daysContainer: {
    alignItems: 'center',
    marginRight: 8,
  },
  days: {
    fontSize: 25,
    fontFamily: FontFamily.RobotoLight,
  },
  requestText: {
    fontSize: 11.5,
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
  dropDownMainStyles: {
    borderRadius: 50,
    borderColor: Colors.grey,
    marginBottom: hp(3),
    zIndex: 999,
  },
  borderRadius5: {
    borderRadius: 5,
  },
  dropDownContainerStyles: {
    // height: 40,
  },
  dropDownStyle: {
    backgroundColor: Colors.lightBlue,
    borderBottomWidth: 1,
  },
  dropdownLabelStyle: {
    fontSize: 13,
    textAlign: 'left',
    color: Colors.black,
    alignSelf: 'center',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    zIndex: -1,
  },
  totalLeaveDays: {
    fontSize: 12,
    fontFamily: FontFamily.RobotoMedium,
  },
  dateContainer: {
    marginTop: 4,
  },
  formattedDate: {
    fontSize: 15,
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.dune,
    marginBottom: hp(1),
  },
  appliedContainer: {
    flexDirection: 'row',
  },
  appliedOn: {
    fontSize: 11,
    color: Colors.lightGray1,
  },
  appliedDate: {
    fontSize: 12,
    color: Colors.lightGray1,
    fontFamily: FontFamily.RobotoMedium,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  dismissTitle: {
    fontSize: FontSize.h13,
  },
  pending: {
    fontSize: 12,
    color: Colors.gold,
  },
  rejectedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejected: {
    fontSize: 12,
    color: Colors.darkBrown,
  },
  approvedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  approved: {
    fontSize: 12,
    color: Colors.darkLovelyGreen,
  },

  dropDownContainerStyleEmployeePicker: {
    borderColor: Colors.grey,
  },
});
