import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import {AutoScrollFlatList} from 'react-native-autoscroll-flatlist';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import workAnniversaryy from 'assets/allImage/workAnniversary.imageset/workAnniversaryy.jpeg';
import BirthdayImage from 'assets/allImage/birthdayImage.imageset/B5.jpg';
import CarouselAutoScroll from 'component/ImageSlide/CarouselAutoScroll';
import MenuDetails from 'component/menuContent/MenuDetails';
import Item from 'component/menuContent/Item';
import RecentLeaves from 'component/recentappliedLeaves/RecentLeaves';
import RemainingLeaves from 'component/remainingLeaves/RemainingLeaves';
import UpComingHolidays from 'component/upComingHolidays/UpComingHolidays';
const Home = () => {
  const imageArr = [
    workAnniversaryy,
    BirthdayImage,
    BirthdayImage,
    workAnniversaryy,
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{height: hp(23), backgroundColor: 'white'}}>
        <CarouselAutoScroll data={imageArr} />
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
        <MenuDetails />
        <Item />
        <RecentLeaves />
        <RemainingLeaves />
        <UpComingHolidays />
      </ScrollView>
    </View>
  );
};
export default Home;
