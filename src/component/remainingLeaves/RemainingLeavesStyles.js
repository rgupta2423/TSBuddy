import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  barChartStyle: {
    marginVertical: 10,
    marginLeft: -12,
  },
  mainContainer: {paddingHorizontal: 20},
  container: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    marginTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.5),
  },
  leavesContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset
    shadowOpacity: 0.2, // Set the shadow opacity
    shadowRadius: 0.1, // Set the shadow radius
    elevation: 1,
    paddingVertical: wp(6),
    marginBottom: hp(3.2),
  },
  graphsContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  earnedLeaveText: {
    textAlign: 'center',
    position: 'absolute',
    top: 200,
    left: wp(10),
    fontSize: 16,
    fontFamily: FontFamily.RobotoLight,
    marginTop: hp(0.5),
  },
  RHLeaveText: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    top: 200,
    left: 32,
    fontSize: 16,
    fontFamily: FontFamily.RobotoLight,
    marginTop: hp(0.5),
  },
  remainingText: {
    fontFamily: FontFamily.RobotoLight,
    fontSize: FontSize.h18,
    color: Colors.black,
  },
  leavesTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leaveType: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    justifyContent: 'space-around',
    // paddingRight: 10,
    marginHorizontal: 16,
    // paddingHorizontal: 10,
    // minWidth: wp(20),
  },
  leavesType1: {
    height: 14,
    width: 14,
    backgroundColor: Colors.lovelyYellow,
    borderRadius: 7,
    marginRight: 5,
  },
  leavesType2: {
    height: 14,
    width: 14,
    backgroundColor: Colors.lovelyBlue,
    borderRadius: 7,
    marginRight: 5,
  },
  leavesType3: {
    height: 14,
    width: 14,
    backgroundColor: Colors.lovelyGreen,
    borderRadius: 7,
    marginRight: 5,
  },
  leavesType4: {
    height: 12,
    width: 12,
    backgroundColor: Colors.red,
    marginRight: 5,
  },
  leaveTextColor: {},
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.purpleShade,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: FontSize.h16,
    color: Colors.purpleShade,
  },
  noLeavesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noLeavesText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 16,
    color: Colors.lightBlue,
    marginVertical: 4,
  },

  //

  containerGraph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#333',
  },
  barGraph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  barContainer: {
    marginRight: 8,
  },
  bar: {
    width: 24,
    backgroundColor: 'blue',
    borderRadius: 4,
  },
  barLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    marginTop: 8,
    width: '100%',
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#333',
    width: 24,
    textAlign: 'center',
  },
});
