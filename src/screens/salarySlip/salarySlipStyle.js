import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
export default StyleSheet.create({
  NameView: {
    paddingVertical: hp(1.5),
    backgroundColor: Colors.colorDodgerBlue2,
    color: 'white',
    paddingHorizontal: wp(5),
    fontWeight: '500',
    fontSize: 18,
  },
  yearMainView: {
    flexDirection: 'row',
    paddingVertical: hp(1),
    alignItems: 'center',
    paddingRight: wp(1),
  },
  line: {flex: 3, backgroundColor: 'gray', height: 1},
  yearTextView: {
    flex: 1,
    backgroundColor: 'rgb(225,225,225)',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 1,
  },
  yearText: {
    color: Colors.darkBlue,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  MapView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  ViewForMOnth: {
    width: '31.8%',
    marginVertical: hp(0.5),
    marginHorizontal: 2.1,
  },
  backgroundImageView: {
    width: '100%',
    height: hp(11.15),
    marginHorizontal: 3.1,
    borderRadius: 8,
    //  borderWidth: 1,
    shadowOpacity: 0.3,
    backgroundColor: 'white',
    padding: 2,
  },
  backGroundImage: {height: hp(10.5), borderRadius: 20, backgroundColor: 'red'},
  smalllImageView: {
    height: 40,
    width: 40,
    backgroundColor: 'blue',
    borderBottomRightRadius: 30,
    borderTopRightRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
  },
  monthText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  downloadView: {
    width: '99%',
    height: hp(5.4),
    marginVertical: hp(0.5),
    // marginTop: hp(1),
    marginHorizontal: wp(1),
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(1),
    shadowOpacity: 0.2,
  },
  downloadTextView: {
    backgroundColor: Colors.lightBlue,
    paddingVertical: hp(1),
    // height: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  downloadtext: {color: 'white', fontWeight: 'bold', fontSize: 17},
  salaryNotFound: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
  },
  salaryNotFoundText: {
    // fontSize: 16,
  },
});
