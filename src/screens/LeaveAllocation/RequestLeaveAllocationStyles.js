import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainContainerExcludedHeader: {
    flex: 1,
  },

  headerRightContainer: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  headerRightText: {
    color: Colors.white,
    fontSize: FontSize.h16,
    fontFamily: FontFamily.RobotoMedium,
  },
  listItem: {
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: hp(0.5),
    marginHorizontal: wp(2),
    backgroundColor: Colors.lightcyan,
    shadowOpacity: 0.1,
  },
  leftStatus: {
    flex: 2.5,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    shadowOpacity: 0.1,
  },
  backgroundGrey: {
    backgroundColor: Colors.grey,
  },
  backgroundPink: {
    backgroundColor: Colors.darkPink,
  },
  backgroundGreen: {
    backgroundColor: Colors.parrotGreenLight,
  },
  leaveType: {
    textAlign: 'center',
    fontSize: 18,
  },
  textAlignCenter: {
    textAlign: 'center',
    fontSize: FontSize.h12,
  },
  secondView: {
    flex: 7.5,
    backgroundColor: Colors.lightcyan,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightFirstContainer: {
    flex: 4,
  },
  leaveAppIdText: {
    fontWeight: 'bold',
    opacity: 0.7,
    fontSize: 16,
  },
  lessOpacity: {
    opacity: 0.6,
  },
  dismissContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2.1,
  },
  dismissButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dismissTitle: {
    fontSize: FontSize.h14,
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
});

export default styles;
