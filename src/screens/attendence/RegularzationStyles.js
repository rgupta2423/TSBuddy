import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
import {StyleSheet} from 'react-native';
import {heightPercentageToDP, widthPercentageToDP} from 'utils/Responsive';
export default StyleSheet.create({
  container: {
    margin: 10,
  },
  dateContainer: {
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 50,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
    fontFamily: FontFamily.RobotoMedium,
    color: Colors.white,
  },
  textHeader: {
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
  dropdownCont: {
    marginLeft: 10,
    marginRight: 10,
  },
  leaveApproverContainer: {
    zIndex: 9999,
  },
  reasonContainer: {
    zIndex: 999,
  },
  halfFullCont: {
    marginLeft: 12,
    marginRight: 22,
    marginTop: 20,
  },
  commentCont: {
    marginLeft: 10,
    marginRight: 10,
  },
  comentBox: {
    borderWidth: 1,
    height: 100,
    borderRadius: 4,
    textAlignVertical: 'top',
    backgroundColor: Colors.white,
  },
  btnCont: {
    justifyContent: 'flex-end',
    marginTop: 25,
  },
  btn: {
    borderRadius: 17,
    width: '100%',
    alignItems: 'center',
    padding: 2,
    height: heightPercentageToDP(5),
    justifyContent: 'center',
  },
  submitBtnContainer: {backgroundColor: Colors.parrotGreen, marginTop: 10},
  submitBtnText: {color: 'white', fontSize: 18, fontWeight: 'bold'},
  cancelBtnContainer: {marginRight: 10, backgroundColor: Colors.reddishTint},
  cancelBtnText: {color: 'white', fontSize: 18, fontWeight: 'bold'},

  checkbox: {
    width: widthPercentageToDP(5),
    height: heightPercentageToDP(2.5),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.red,
  },
  highlighted: {
    backgroundColor: Colors.lightGray,
  },
});
