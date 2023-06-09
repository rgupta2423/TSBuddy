import {Colors} from 'colors/Colors';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {FontFamily, FontSize} from 'constants/fonts';
export default StyleSheet.create({
  container: {
    backgroundColor: '#E9F4FC',
    flexDirection: 'row',
    marginVertical: hp(0.8),
    shadowOpacity: 0.2,
    paddingVertical: hp(0.5),
    marginHorizontal: wp(2),
    borderRadius: 5,
  },
  image: {
    height: hp(6),
    width: wp(14),
    borderRadius: 35,
    marginVertical: hp(1),
  },

  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.6,
  },
  desniationText: {
    fontSize: 14,
    color: Colors.lightBlue,
  },
  smallView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // paddingVertical: hp(1),
  },
  reportingText: {paddingTop: hp(1), marginLeft: wp(1), color: 'green'},
  container2: {
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(1),
    backgroundColor: 'white',
    marginVertical: hp(0.5),
    // marginHorizontal: wp(0.1),
    width: wp(33.5),
    height: hp(16),
  },
  backgroundImage: {alignItems: 'center', paddingBottom: hp(0.4)},
  buttomView: {
    width: '100%',
    borderTopWidth: 3,
    borderColor: 'white',
    flexDirection: 'row',
  },
  imagecontainer1: {
    // backgroundColor: 'red',
    borderRightWidth: 1.5,
    borderColor: 'white',
    flex: 1,
    // padding: hp(1),
    paddingVertical: hp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  imagecontainer2: {
    // backgroundColor: 'red',
    borderLeftWidth: 1.5,
    borderColor: 'white',
    flex: 1,
    // padding: hp(1),
    paddingVertical: hp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  secondimage: {
    height: hp(8),
    width: wp(20),
    borderRadius: 35,
    // marginLeft: wp(5),
    marginTop: hp(1),
  },
  nametext2: {
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.8,
    fontSize: FontSize.h11,
    marginHorizontal: 6,
  },
  desText2: {
    fontSize: 10,
    textAlign: 'center',
    color: 'blue',
    opacity: 0.6,
    marginHorizontal: 6,
  },
  iconView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    // backgroundColor: '#C3F8FF',
    // borderTopWidth: 2,
    // borderColor: 'white',
    marginTop: hp(0.5),
  },
  callimageView: {
    borderRightWidth: 4,
    borderColor: Colors.white,
    flex: 1,
  },
  callImage: {height: 20, width: 20},
  mailView: {flex: 1, paddingLeft: wp(6)},
  mailImage: {height: 20, width: 20, marginTop: hp(0.1)},
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
    // position: 'absolute',
    backgroundColor: 'rgba(51, 51, 51, 0.6)',
    // opacity: 0.5,
  },
  loaderBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
});
