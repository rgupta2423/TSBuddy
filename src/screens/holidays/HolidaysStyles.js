import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: hp(0.5),
    marginHorizontal: wp(1),
    backgroundColor: Colors.skyColor,
    shadowOpacity: 0.1,
  },
  itemLeft: {
    flex: 1,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    shadowOpacity: 0.1,
  },
  container: {
    paddingHorizontal: wp(10),
    height: hp(7),
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pastHolidaysContainer: {flexDirection: 'row', alignItems: 'center'},
  flatelistView: {
    flexDirection: 'row',
    borderRadius: 5,
    marginVertical: hp(0.5),
    marginHorizontal: wp(1),
    backgroundColor: Colors.skyColor,
    shadowOpacity: 0.1,
  },
  flatelistView1: {
    flex: 1,
    backgroundColor: Colors.royalBlue,
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    shadowOpacity: 0.1,
  },
  flatelistView2: {
    flex: 7,
    backgroundColor: Colors.white,

    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 25,
  },
  buttomView: {
    backgroundColor: Colors.grey,
    height: 30,
    width: 30,
    borderRadius: 5,
  },
  secondButtomView: {
    backgroundColor: Colors.darkBlue,
    height: 30,
    width: 30,
    borderRadius: 5,
  },
});
