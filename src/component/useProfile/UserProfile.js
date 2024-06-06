import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import styles from './userProfileStyles';
import {widthPercentageToDP as wp} from 'utils/Responsive';
import {useIsFocused} from '@react-navigation/native';
import {MonthImages} from 'assets/monthImage/MonthImage';
import RefreshIcon from 'assets/allImage/refresh.imageset/refreshIcon.png';
import {Colors} from 'colors/Colors';
import {useNavigation} from '@react-navigation/native';
import CommunicationModal from 'modals/CommunicationModal';
import {getEmployeeData, modalStatus} from 'redux/homeSlice';
import {ERROR} from 'constants/strings';
import ShowAlert from 'customComponents/CustomError';
import defaultUserIcon from 'assets/allImage/DefaultImage.imageset/defaultUserIcon.png';
import CrossIcon from 'assets/allImage/cross.imageset/cross.png';
import NotFound from 'assets/allImage/noInternet.imageset/internet2x.png';

const UserProfile = ({route}) => {
  const flatListRef = useRef(null);
  const isFocussed = useIsFocused();
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fromNavigatedScreen = route.params.screenName;

  const {isShowModal: isShowModall} = useSelector(state => state.home);

  const {userToken: token, isGuestLogin} = useSelector(state => state.auth);
  const [showHoriZontal, setShowHorizontal] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [numValue, setNumValue] = useState(3);
  const [empDetail, setClickData] = useState({});
  const [allEmpData, setEmpData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchedName, setSearchedName] = useState('');
  const [isFetchingEmployees, setIsFetchingEmployees] = useState(false);
  let skipCount = allEmpData.length || 0;
  const [employeesCount, setEmployeesCount] = useState(0);

  useEffect(() => {
    if (showTextInput) {
      inputRef.current.focus();
    }
  }, [showTextInput]);

  const fetchInitialData = useCallback(async () => {
    setSearchedName('');
    await fetchEmployeesData({
      isInitial: true,
      currentEmployees: {
        page: 1,
        skip: 0,
        take: 18,
      },
    });
  }, [fetchEmployeesData]);

  useEffect(() => {
    (async () => {
      await fetchEmployeesData({
        isInitial: true,
        currentEmployees: {
          page: 1,
          skip: 0,
          take: 18,
        },
      });
    })();
  }, [fetchEmployeesData]);

  const fetchEmployeesData = useCallback(
    async ({isInitial, currentEmployees, isSearching}) => {
      if (!isGuestLogin) {
        setIsFetchingEmployees(true);

        const result = await dispatch(
          getEmployeeData({token, currentEmployees}),
        );
        setIsFetchingEmployees(false);
        if (isInitial && !isSearching) {
          setTotalCount(result?.payload?.count);
        }

        if (result?.error) {
          ShowAlert({
            messageHeader: ERROR,
            messageSubHeader: result?.error?.message,
            buttonText: 'Close',
            dispatch,
            navigation,
          });
        }

        if (result && result?.payload && result?.payload?.data) {
          if (isInitial) {
            setEmpData(result.payload.data);
          } else {
            setEmpData([...allEmpData, ...result?.payload?.data]);
          }
          setEmployeesCount(result?.payload?.count);
        }
      }
    },
    [allEmpData, dispatch, navigation, token, isGuestLogin],
  );

  const arr = [];
  for (let i = 0; i < 1000; i++) {
    arr.push(i);
  }

  const onChangeText = async enteredName => {
    setSearchedName(enteredName);
  };

  const loadMoreData = () => {
    if (employeesCount > skipCount) {
      // if (scrollBegin && employeesCount > skipCount) {
      fetchEmployeesData({
        currentEmployees: {
          page: 1,
          skip: skipCount,
          take: 18,
        },
      });
    }
  };

  const handleCall = useCallback(
    (cellNumber, employeeName) => {
      setClickData({
        medium: cellNumber,
        nameOfEmployee: employeeName,
        text: 'Call ',
      });
      dispatch(modalStatus(true));
    },
    [dispatch],
  );

  const handleMail = useCallback(
    (companyEmail, employeeName) => {
      setClickData({
        medium: companyEmail,
        nameOfEmployee: employeeName,
        text: 'Send Mail to ',
      });
      // setClickData('fghfgh');
      dispatch(modalStatus(true));
    },
    [dispatch],
  );

  const listFooterComponent = () => {
    return (
      <View style={styles.bottomLoaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const renderItem = useCallback(
    (item, index, nav, isShowingHoriZontal) => {
      let {
        designation,
        companyEmail,
        image,
        cellNumber,
        employeeName,
        managerInfoDto,
        firstName,
        middleName,
        lastName,
      } = item;

      const managerInfo = {...managerInfoDto};

      const managerEmployeeName = `${managerInfoDto?.firstName} ${
        managerInfoDto?.middleName ? managerInfoDto?.middleName + ' ' : ''
      }${managerInfoDto?.lastName ? managerInfoDto?.lastName : ''}`;
      managerInfo.employeeName = managerEmployeeName;
      // console.log('managerInfoDto:', managerInfoDto);
      managerInfoDto = managerInfo;

      // console.log('managerEmployeeName:', managerEmployeeName, managerInfo);
      const name = `${firstName} ${middleName ? middleName + ' ' : ''}${
        lastName ? lastName : ''
      }`;
      employeeName = name;

      return (
        <View
          key={index}
          style={
            {
              // backgroundColor: Colors.white,
            }
          }>
          {isShowingHoriZontal ? (
            <TouchableOpacity
              onPress={() => {
                nav.navigate('UserDetail', {
                  designation,
                  companyEmail,
                  image,
                  cellNumber,
                  employeeName,
                  managerInfoDto,
                });
              }}>
              <View style={styles.container}>
                <View style={styles.cardContainer}>
                  {/* <Image source={{uri: imageURL}} style={styles.image} /> */}

                  {image ? (
                    <Image source={{uri: image}} style={styles.image} />
                  ) : (
                    <Image source={defaultUserIcon} style={styles.image} />
                  )}
                </View>
                <View style={styles.empCont}>
                  <Text style={styles.nameText}>{employeeName}</Text>
                  <Text style={styles.desniationText}>{designation}</Text>
                  <View style={styles.smallView}>
                    <Image
                      source={MonthImages.userPS}
                      style={styles.dummyUserIconImage}
                    />
                    <Text style={styles.reportingText}>
                      {managerInfoDto.employeeName}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            // <View style={{padding: 10, borderWidth: 1, height: 320}}></View>

            <ImageBackground
              resizeMode="contain"
              style={styles.backgroundImage}
              source={MonthImages.empbgS}>
              <TouchableOpacity
                style={styles.container2}
                onPress={() => {
                  nav.navigate('UserDetail', {
                    designation,
                    companyEmail,
                    image,
                    cellNumber,
                    employeeName,
                    managerInfoDto,
                  });
                }}>
                {image ? (
                  <Image
                    source={{uri: image}}
                    style={styles.image} // Define the width and height as needed
                  />
                ) : (
                  <Image source={defaultUserIcon} style={styles.image} />
                )}
                <Text numberOfLines={1} style={styles.nametext2}>
                  {employeeName}
                </Text>
                <Text numberOfLines={1} style={styles.desText2}>
                  {designation}
                </Text>
              </TouchableOpacity>
              <View style={styles.buttomView}>
                <Pressable
                  style={styles.imagecontainer1}
                  onPress={() => handleCall(cellNumber, employeeName)}>
                  <Image
                    style={styles.callImage}
                    source={MonthImages.callEmp}
                  />
                </Pressable>
                <Pressable
                  style={styles.imagecontainer2}
                  onPress={() => handleMail(companyEmail, employeeName)}>
                  <Image
                    style={styles.mailImage}
                    source={MonthImages.mailEmp}
                  />
                </Pressable>
              </View>
            </ImageBackground>
          )}
        </View>
      );
    },
    [handleCall, handleMail],
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <View style={styles.mainCont}>
      <View style={styles.headerContainer}>
        <View style={styles.backArrowCont}>
          <Pressable
            onPress={() => {
              navigation.pop();
              navigation.navigate(fromNavigatedScreen);
            }}>
            <Image
              source={MonthImages.backArrowS}
              style={styles.backArrowImage}
            />
          </Pressable>
        </View>
        <View style={styles.headerMid}>
          <Text style={styles.headerEmpText}>Employees</Text>
          <Image
            source={MonthImages.info_scopy}
            style={styles.backArrowImage}
          />
        </View>
        <View style={styles.swapIconCont}>
          {showHoriZontal ? (
            <Pressable
              onPress={() => {
                setNumValue(3);
                setShowHorizontal(false);
              }}>
              <Image
                source={MonthImages.thumbnailS}
                style={{marginRight: wp(4)}}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setNumValue(1);
                setShowHorizontal(true);
              }}>
              <Image source={MonthImages.listS} style={{marginRight: wp(4)}} />
            </Pressable>
          )}
          <Pressable
            onPress={() => {
              setShowTextInput(prevState => !prevState);
              inputRef.current?.focus();
            }}>
            <Image
              source={MonthImages.searchIconwhite}
              style={styles.searchIcon}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.refreshIconContainer}>
        <Pressable
          onPress={() => {
            fetchInitialData();
          }}
          style={styles.refreshPressable}>
          <Image source={RefreshIcon} style={styles.refreshIcon} />
        </Pressable>
      </View>
      {showTextInput ? (
        <View style={styles.searchIconDown}>
          <Pressable
            disabled={searchedName.length === 0}
            onPress={async () => {
              let currentEmployee = {
                page: 1,
                skip: 0,
                take: 18,
              };

              if (searchedName.length) {
                currentEmployee = {
                  page: 1,
                  skip: 0,
                  take: totalCount,
                  name: searchedName,
                };
              }
              await fetchEmployeesData({
                isInitial: true,
                currentEmployees: currentEmployee,
                isSearching: true,
              });

              flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
            }}>
            <Image
              source={MonthImages.searchIconwhite}
              style={styles.searchImageIcon}
            />
          </Pressable>

          <TextInput
            autoFocus={true}
            value={searchedName}
            selectionColor={Colors.white}
            color={Colors.white}
            ref={inputRef}
            // value={e}
            onChangeText={onChangeText}
            isEditble
            style={styles.textInput}
          />
          <Pressable
            onPress={() => {
              setSearchedName('');
              fetchInitialData();
            }}
            style={styles.clearButton}>
            <Image source={CrossIcon} style={styles.crossIcon} />
          </Pressable>
        </View>
      ) : null}
      {isShowModall && isFocussed ? (
        <CommunicationModal empDetail={empDetail} />
      ) : null}

      {allEmpData?.length === 0 && !isFetchingEmployees ? (
        <View style={styles.noFoundContainer}>
          <Image source={NotFound} style={styles.noFoundImage} />
          <Text style={styles.noFoundText}>No Employee Found!</Text>
        </View>
      ) : (
        <FlatList
          initialNumToRender={36}
          estimatedItemSize={100}
          maxToRenderPerBatch={60}
          windowSize={18}
          removeClippedSubviews={true}
          legacyImplementation={false}
          onScrollBeginDrag={() => {
            // setScrollBegin(true);
          }}
          ListFooterComponent={isFetchingEmployees && listFooterComponent}
          onEndReachedThreshold={0}
          scrollsToTop={false}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreData}
          onMomentumScrollBegin={() => {
            // setScrollBegin(true);
          }}
          onMomentumScrollEnd={() => {
            // setScrollBegin(false);
          }}
          data={allEmpData}
          numColumns={numValue}
          key={numValue}
          //numColumns={1}
          keyExtractor={keyExtractor}
          ref={flatListRef}
          renderItem={({item, index}) => {
            return renderItem(item, index, navigation, showHoriZontal);
          }}
        />
      )}
    </View>
  );
};

export default UserProfile;
