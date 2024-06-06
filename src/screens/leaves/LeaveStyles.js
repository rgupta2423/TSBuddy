import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
export default StyleSheet.create({
  mainContainerExcludeHeader: {
    // marginTop: 4,
    flex: 1,
    backgroundColor: Colors.whitishBlue,
  },
  resetDateButtonContainer: {
    alignItems: 'flex-end',
  },

  filterButton: {
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
  },
  filterIcon: {
    height: 55,
    width: 55,
    borderRadius: 25,
  },
  filterCalendarModal: {
    justifyContent: 'flex-end',
  },
  calendarModalContainer: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
  },
  calendarSubContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    // flexDirection: 'row',
  },
  filterCalendarsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 6,
  },
  crossIcon: {},
  filterResetButton: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 5,
    backgroundColor: Colors.lightBlue,
  },
  resetText: {
    color: Colors.white,
  },
  calendarTitleText: {
    color: Colors.purple,
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 8,
    marginTop: hp(2),
  },
  actionSheetBtnContainer: {
    height: hp(7),
    backgroundColor: Colors.white,
    marginTop: hp(1),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSheetBtnText: {
    fontSize: 20,
    color: Colors.lighterBlue,
    fontWeight: '500',
  },
  container: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    borderWidth: 1,
    borderColor: Colors.black,
    marginHorizontal: wp(3),
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: Colors.gainsboro,
    marginBottom: hp(1),
    alignItems: 'center',
  },
  plusView: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.1),
    borderColor: Colors.orange,
    borderRadius: 15,
    borderWidth: 2,
    justifyContent: 'center',
    paddingBottom: 2.5,
  },
  plusText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.orange,
  },
  text1: {
    marginLeft: wp(10),
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.purple,
  },
  // flateListView: {
  //   flexDirection: 'row',
  //   borderRadius: 5,
  //   marginVertical: hp(0.5),
  //   marginHorizontal: wp(2),
  //   backgroundColor: Colors.lightcyan,
  //   shadowOpacity: 0.1,
  //   // elevation: 1,
  // },
  secondView: {
    flex: 2,
    backgroundColor: Colors.lightcyan,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  noLeavesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noLeavesText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 17,
    color: Colors.dune,
  },
});
