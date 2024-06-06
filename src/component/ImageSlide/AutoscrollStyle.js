import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
export default StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  container: {
    paddingRight: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    paddingVertical: 24,
    minWidth: wp(60),
  },
  backgroundImage: {
    width: '100%',
    minWidth: wp(70),
    borderWidth: 1,
    borderColor: Colors.lightGray2,
    backgroundColor: Colors.lightGray2,
    borderRadius: 9,
    alignItems: 'flex-end',
  },
  textView: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    backgroundColor: Colors.darkTransparentColor,
    marginTop: hp(14),
    width: wp(60),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  happyText: {
    fontSize: 18,
    fontFamily: FontFamily.RobotoLight,
    color: Colors.dune,
  },
  wishText: {
    fontSize: 18,
    fontFamily: FontFamily.RobotoMedium,
    color: Colors.darkishPink,
  },
  image: {
    height: 72,
    width: 72,
    marginBottom: 16,
  },
  birthdayBoyOrGirl: {
    fontSize: 19,
    color: Colors.purpleShade,
    fontFamily: FontFamily.RobotoMedium,
    marginBottom: 10,
  },
  designation: {
    fontSize: 18,
    fontFamily: FontFamily.RobotoLight,
  },
  eventDate: {
    backgroundColor: Colors.skyBlue,
    paddingVertical: 16,
    marginBottom: 32,
    alignItems: 'center',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    shadowColor: Colors.colorDodgerBlue2,
    shadowOffset: {width: 0, height: 2}, // Set the shadow offset
    shadowOpacity: 0.2, // Set the shadow opacity
    shadowRadius: 0.1, // Set the shadow radius
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  eventDateText: {
    fontSize: 16,
    color: Colors.dune,
  },
  anniversaryText: {
    position: 'absolute',
    fontSize: 14,
    bottom: 12,
    left: 16,
    color: Colors.fadedOrange,
  },
  eventContainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventImage: {
    height: 40,
    width: 40,
    marginRight: 24,
  },
  noEventTextCont: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  noEventText: {
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 16,
    color: Colors.lightBlue,
    marginVertical: 4,
  },
});
