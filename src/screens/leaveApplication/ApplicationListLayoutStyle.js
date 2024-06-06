import {FontFamily, FontSize} from 'constants/fonts';
const {Colors} = require('colors/Colors');
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listItemMainContainer: {
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2},
    backgroundColor: Colors.white,
    shadowOpacity: 0.2,
    shadowRadius: 0.1,
    elevation: 1,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  request: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  appliedRequestsLeft: {
    flexDirection: 'row',
    flex: 8,
  },
  noDataFoundText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 16,
    color: Colors.lightBlue,
    marginVertical: 4,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leave: {
    alignItems: 'center',
    marginRight: wp(1),
  },
  totalDaysText: {
    fontSize: 25,
    fontFamily: FontFamily.RobotoLight,
  },
  daysText: {
    fontSize: 12,
    fontFamily: FontFamily.RobotoMedium,
  },
  empId: {
    fontSize: 12,
    fontFamily: FontFamily.RobotoMedium,
  },
  datesContainer: {
    marginLeft: 20,
    marginTop: 4,
    flex: 1,
  },
  dates: {
    fontSize: 15,
    fontFamily: FontFamily.RobotoRegular,
    color: Colors.dune,
    marginBottom: hp(1),
  },
  reguCont: {
    flexDirection: 'row',
    flex: 1,
  },
  reguText: {
    fontSize: 11,
    color: Colors.lightGray1,
    // flex: 1,
  },
  reguTitleText: {
    fontSize: 12,
    color: Colors.lightGray1,
    fontFamily: FontFamily.RobotoMedium,
    flex: 1,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: Colors.gold,
  },
  statusText2: {
    fontSize: 12,
    color: Colors.darkBrown,
  },
  statusText3: {
    fontSize: 12,
    color: Colors.darkLovelyGreen,
  },
  leaveAllocationStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  leaveAllocationStatusSingle: {},
  leaveAllocationStatusTitle: {
    fontSize: FontSize.h14,
    fontFamily: FontFamily.RobotoMedium,
    color: Colors.dune,
  },
  leaveAllocationStatus: {
    fontSize: FontSize.h12,
    fontFamily: FontFamily.RobotoLight,
    color: Colors.lightGray1,
  },
  textGreen: {
    color: Colors.darkLovelyGreen,
  },

  textGold: {
    color: Colors.gold,
  },

  textBrown: {
    color: Colors.darkBrown,
  },
  loaderContainer: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  flatlist: {
    flex: 1,
  },
  flatlistContainer: {
    flex: 1,
    // borderWidth: 1,
  },
});

export default styles;
