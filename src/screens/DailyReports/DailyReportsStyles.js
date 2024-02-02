import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const styles = StyleSheet.create({
  headerBarTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.lightGray2,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20,
  },
  mainContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: Colors.whitishBlue,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    paddingVertical: 14,
  },
  headerTabText: {
    // flex: 1,
    textAlign: 'center',
    fontSize: FontSize.h16,
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.lightBlack,
  },
  borderRadiusLeft: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  borderRadiusRight: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  backgroundPurple: {
    backgroundColor: Colors.purpleShade,
  },
  colorWhite: {
    color: Colors.white,
  },
  colorGray: {
    color: Colors.lightGray1,
  },
  borderVertical: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.lightGray2,
  },
  attendanceStatusContainer: {
    borderColor: Colors.lightishBlue,
    borderWidth: 1,
    borderRadius: 10,
    width: '48.5%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
    marginBottom: 12,
  },
  percentageContainer: {
    backgroundColor: Colors.blueishTint,
    width: '34%',
    paddingVertical: 4,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitleText: {
    fontSize: 15,
    fontFamily: FontFamily.RobotoMedium,
  },
  statusBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countText: {
    fontSize: FontSize.h22,
    fontFamily: FontFamily.RobotoMedium,
  },
  titleContainer: {
    marginBottom: 10,
  },
  percentageColor: {
    color: Colors.white,
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h13,
  },
  mainLeaveTabContainer: {
    flex: 1,
  },
  statusBoxesContainer: {
    // flexDirection: 'row',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  bottomBarTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.lightGray2,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 20,
  },
  bottomBarTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  borderVerticalRight: {
    borderRightWidth: 1,
    borderColor: Colors.lightGray2,
  },
  searchContainer: {
    backgroundColor: Colors.white,
    width: '70%',
    flexDirection: 'row', // Make the TextInput and icon appear in a row
    alignItems: 'center', // Align items vertically in the middle
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    borderRadius: 50,
    justifyContent: 'space-between',
  },
  customSearchContainer: {
    width: '100%',
    marginBottom: 14,
    paddingHorizontal: 10,
  },
  textInput: {
    paddingVertical: 10,
    fontSize: FontSize.h16,
    color: Colors.dune,
    flex: 1,
    paddingHorizontal: 5,
  },
  searchIcon: {
    height: 20,
    width: 20,
    color: Colors.black,
  },
  textInputContainer: {
    flexDirection: 'row', // Make the TextInput and icon appear in a row
    alignItems: 'center', // Align items vertically in the middle
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  allEmployeesContainer: {
    position: 'relative',
    flex: 1,
  },
  datePickerMainContainer: {},
  datePickerTitleText: {
    FontFamily: FontFamily.RobotoThin,
    fontSize: FontSize.h17,
    color: Colors.dune,
    paddingHorizontal: 8,
  },
  calenderContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 50,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    marginTop: 10,
  },
  workStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginVertical: 14,
  },

  typeOfWork: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeCircle: {
    borderColor: Colors.purpleShade,
  },
  officeCircle: {
    borderColor: Colors.greenishTint,
  },
  weekOffCircle: {
    borderColor: Colors.lightGray1,
  },
  circle: {
    height: wp(4),
    width: wp(4),
    borderRadius: wp(2),
    borderWidth: 3.4,
    marginRight: 4,
  },
  workModeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalChildContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 10,
  },
  modalFirstChild: {
    zIndex: 9999,
  },
  workModeTitle: {
    color: Colors.lovelyPurple,
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h17,
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  title: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h15,
    letterSpacing: 0.6,
    marginBottom: 14,
  },
  modesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  mode: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkBoxModeText: {
    fontSize: FontSize.h16,
    color: Colors.dune,
    marginRight: 8,
  },
  containerStyleEmployeePicker: {},
  listItemLabelStyleEmployeePicker: {},
  labelStyleEmployeePicker: {},
  searchContainerStyleEmployeePicker: {
    borderWidth: 0,
  },
  searchTextInputStyle: {
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  stylesEmployeePicker: {
    marginBottom: 20,
    borderColor: Colors.grey,
  },
  dropDownStyleEmployeePicker: {},
  dropDownContainerStyleEmployeePicker: {
    borderColor: Colors.grey,
  },

  createWorkModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.lovelyPurple,
    borderRadius: 50,
    backgroundColor: Colors.white,
  },
  createText: {
    color: Colors.lovelyPurple,
    fontSize: FontSize.h16,
    marginLeft: 10,
  },
  datesContainer: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    zIndex: -1,
    // marginBottom: 16,
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginBottom: 14,
  },
  fromDateContainer: {
    marginTop: 10,
    width: '47%',
  },
  dateTitleText: {
    marginBottom: hp(1),
    fontSize: FontSize.h15,
    color: Colors.black,
    fontFamily: FontFamily.RobotoLight,
  },
  fromDateSelect: {
    borderRadius: wp(25),
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  fromDatePlaceholder: {
    fontSize: 14,
  },
  toDateMainContainer: {
    marginTop: 10,
    width: '47%',
  },
  toDateTitleText: {
    fontSize: FontSize.h15,
    color: Colors.black,
    marginBottom: hp(1),
    fontFamily: FontFamily.RobotoLight,
  },
  toDateSelect: {
    borderRadius: wp(25),
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingHorizontal: wp(3.2),
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },
  toDatePlaceholder: {
    fontSize: 14,
  },
  noLeaveContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noLeaveFound: {
    color: Colors.dune,
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h15,
    letterSpacing: 0.5,
  },
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 100,
    height: '100%',
    // justifyContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  noEmployeesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEmployeesText: {
    color: Colors.dune,
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h15,
    letterSpacing: 0.5,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
  },
  opacity60: {
    opacity: 0.6,
  },
  leavesListMainContainer: {
    flex: 1,
  },
  employeeFlatlist: {
    flex: 1,
  },
  paddingHorizontal10: {
    paddingHorizontal: 10,
  },
  fullContentLoaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewStyle: {
    flex: 1,
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1,
  },
});

export default styles;
