import {Colors} from 'colors/Colors';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import MenuSVG from 'assets/newDashboardIcons/bars-sort.svg';
import {Text} from 'react-native';
import {FontFamily} from 'constants/fonts';

const CombineHeader = ({
  isFirstComponent,
  isLastComponent,
  navigation,
  leftClickHandler,
  title,
  rightClickHandler,
}) => {
  const drawer = () => (
    <Pressable
      style={styles.leftArrowContainer}
      onPress={() => {
        navigation.openDrawer();
      }}>
      <MenuSVG fill={Colors.white} height={24} width={24} />
    </Pressable>
  );

  return (
    <View style={styles.headerContainer}>
      {isFirstComponent ? (
        drawer()
      ) : (
        <Pressable onPress={leftClickHandler} style={styles.leftArrowContainer}>
          <MonthImages.ArrowLeft
            stroke={Colors.white}
            height={28}
            width={28}
            style={styles.arrowIcon}
          />
        </Pressable>
      )}
      <View style={styles.headerMidContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <Pressable
        onPress={rightClickHandler}
        style={[
          styles.rightArrowContainer,
          isLastComponent && styles.lessOpacity,
        ]}>
        <MonthImages.ArrowRight
          stroke={Colors.white}
          height={28}
          width={28}
          color={Colors.lightGray1}
          style={styles.arrowIcon}
        />
      </Pressable>
    </View>
  );
};

export default CombineHeader;

const styles = StyleSheet.create({
  leftArrowContainer: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    paddingVertical: 8,
    borderColor: Colors.white,
  },
  headerContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 4,
    backgroundColor: Colors.lighterBlue,
    borderColor: Colors.white,
  },
  arrowIcon: {},
  headerMidContainer: {
    flex: 3,
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: FontFamily.RobotoMedium,
  },
  rightArrowContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderLeftWidth: 1,
    borderColor: Colors.white,
  },
  lessOpacity: {
    opacity: 0.6,
  },
});
