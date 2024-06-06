import {Colors} from 'colors/Colors';
import {FontFamily, FontSize} from 'constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainerExcludeHeader: {
    flex: 1,
  },
  attendanceTypeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: Colors.whitishBlue,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 100,
    overflow: 'hidden',
  },
  tabContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  middleType: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  rightType: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  headerRightText: {
    color: Colors.white,
    fontSize: FontSize.h16,
    fontFamily: FontFamily.RobotoMedium,
  },
  textInputContainer: {
    marginHorizontal: 14,
    marginVertical: 7,
    flexDirection: 'row',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 7,
    fontSize: 15,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    height: 20,
    width: 20,
    color: Colors.white,
  },
  headerRightContainer: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 10,
  },
  textColorWhite: {
    color: Colors.white,
    fontSize: FontSize.h13,
  },
  listContainer: {
    flex: 1,
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
