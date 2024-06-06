import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  containerExceptHeader: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  NameView: {
    paddingVertical: hp(1.5),
    backgroundColor: Colors.colorDodgerBlue2,
    color: 'white',
    paddingHorizontal: wp(5),
    fontWeight: '500',
    fontSize: 18,
  },
  salariesContainer: {flex: 1},
  salaryYearContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'blue',
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
    borderRadius: 8,
    shadowOpacity: 0.3,
    backgroundColor: Colors.white,
    padding: 5,
  },
  salary: {
    borderRadius: 5,
  },
  backGroundImage: {
    height: hp(10.5),
    borderRadius: 20,
    backgroundColor: 'red',
  },
  imageBackground: {borderRadius: 8},
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
  image: {
    height: 20,
    width: 20,
  },
  monthText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  downloadView: {
    width: '100%',
    marginVertical: hp(0.5),
    backgroundColor: Colors.white,
    borderRadius: 6,
    shadowOpacity: 0.2,
    padding: 4,
  },
  downloadTextView: {
    backgroundColor: Colors.lightBlue,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  downloadtext: {
    color: Colors.white,
    fontFamily: FontFamily.RobotoBold,
    fontSize: FontSize.h13,
  },
  noSalaryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noSalaryText: {
    fontSize: FontSize.h16,
    fontFamily: FontFamily.RobotoMedium,
  },
  salaryNotFound: {
    justifyContent: 'center',
    alignItems: 'center',

    flex: 1,
  },
  salaryNotFoundText: {
    // fontSize: 16,
  },
  filterContainer: {
    position: 'absolute',
    bottom: hp(3),
    right: wp(5),
  },
  filterImage: {
    height: 55,
    width: 55,
    borderRadius: 25,
  },
});
