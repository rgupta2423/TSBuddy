import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
export default StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: Colors.white,
    width: wp(56),
    marginTop: hp(1),
    marginRight: wp(4),
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    // opacity: 1,
    paddingVertical: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagebackground: {
    maxHeight: hp(18),
    width: wp(50),
    borderColor: Colors.black,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
  },
  menuView: {
    backgroundColor: Colors.menuTransparentColor,
    width: '42%',
    height: '100%',
    paddingLeft: wp(4),
  },
  likeView: {
    flexDirection: 'row',
    paddingLeft: wp(2),
    paddingVertical: hp(0.8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackBtn: {
    width: wp(20),
    height: hp(3.5),
    padding: 5,
    borderRadius: 4,
  },
  textStyle: {color: 'white', fontWeight: 'bold'},
  foodTypeText: {
    color: Colors.black,
    fontSize: 18,
    fontFamily: FontFamily.RobotoMedium,
    paddingTop: hp(1.6),
    paddingBottom: hp(1.2),
  },
  feedbackContainer: {
    backgroundColor: Colors.skyBlue,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset
    shadowOpacity: 0.2, // Set the shadow opacity
    shadowRadius: 0.1, // Set the shadow radius
    elevation: 1,
    marginRight: wp(4),
    paddingVertical: 16,
    marginBottom: 32,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  opacity50: {
    opacity: 0.5,
  },
  foodImage: {
    height: wp(26),
    width: wp(26),
    borderRadius: wp(13),
    overflow: 'hidden',
  },
  foodItem: {
    color: Colors.dune,
    fontSize: 14,
    textAlign: 'center',
  },
});
