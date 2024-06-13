import React from 'react';
import {Colors} from 'colors/Colors';
import {FontFamily} from 'constants/fonts';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import MenuSVG from 'assets/newDashboardIcons/bars-sort.svg';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {useRoute, CommonActions, StackActions} from '@react-navigation/native';
import {employeeProfileScreen} from 'navigation/Route';
import AppIcon from 'assets/mipmap/appIcon120-1.png';
import SearchIcon from 'assets/newDashboardIcons/user-magnifying-glass.svg';
import {heightPercentageToDP as hp} from 'utils/Responsive';

const CustomHeader = function ({
  showDrawerMenu,
  title,
  navigation,
  isHome,
  showHeaderRight,
  headerRight,
  name,
  hasToPop,
  // navigation2,
}) {
  const route = useRoute();
  const screenName = route.name;

  return (
    <View
      style={[
        styles.mainContainer,
        isHome ? styles.backgroundColorWhitishBlue : styles.backgroundColorBlue,
      ]}>
      {showDrawerMenu ? (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <MenuSVG
            fill={isHome ? Colors.black : Colors.white}
            height={24}
            width={24}
          />
        </TouchableOpacity>
      ) : (
        <Pressable
          onPress={() => {
            // navigation.goBack();
            if (hasToPop) {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                }),
              );
            } else {
              navigation.goBack();
            }
            // navigation.navigate('CalendarMain');
          }}>
          <Image source={MonthImages.backArrowS} style={styles.backArrowIcon} />
        </Pressable>
      )}

      <View style={styles.headerIconContainer}>
        {isHome ? (
          <Image
            resizeMode="stretch"
            source={AppIcon}
            style={styles.headerLogo}
          />
        ) : (
          <Text style={styles.headerTitle}>{title}</Text>
        )}
      </View>

      {showHeaderRight ? (
        <View style={styles.headerRightContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                // dispatch(setFromNavigatedScreen({screenName}));
                navigation.navigate(employeeProfileScreen, {screenName});
                // navigation.navigate(name);
                // navigation.navigate('LeavesScreeen', {screenName});
              }}>
              <SearchIcon
                fill={isHome ? Colors.black : Colors.white}
                height={26}
                width={26}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        headerRight
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 2,
    alignItems: 'center',
    minHeight: hp(5.5),
  },
  backgroundColorBlue: {
    backgroundColor: Colors.lighterBlue,
  },
  backArrowIcon: {
    height: 20,
    width: 20,
  },
  backgroundColorWhitishBlue: {
    backgroundColor: Colors.whitishBlue,
  },
  headerRightContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: FontFamily.RobotoMedium,
  },
  headerIconContainer: {
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
    // marginLeft: wp(22),
  },
  headerLogo: {
    // width: 108,
    // height: 40,
    height: 40,
    width: 64,
  },
});
