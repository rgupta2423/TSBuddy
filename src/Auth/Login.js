import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AsyncStorage} from 'react-native';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Colors} from 'colors/Colors';
import {MonthImages} from 'assets/monthImage/MonthImage';
import styles from './LoginStyle';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import LoginVideo from '../assets/video/backgoundVideo.mp4';
import Video from 'react-native-video';
import LoginUnCheck from 'assets/mipmap/loginUncheck.imageset/uncheck.png';
import LoginCheck from 'assets/mipmap/loginCheck.imageset/check.png';
// import {guestLoginStatus} from './LoginSlice';
import {getUserToken, setIsRemeber, setBiometricEnable} from './LoginSlice';
import {useSelector} from 'react-redux';
import {
  COPY_RIGHT,
  //  GUEST_LOGIN,
  REMEMBER_ME,
} from 'utils/string';
import Loader from 'component/loader/Loader';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  // const [isAuth, setIsAuth] = useState(false);

  // const [showBiomatricModal, setshowBiomatricModal] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const [username, setUserName] = useState('gupta.utkarsh@thinksys.com');
  const [password, setPassword] = useState('Thinksys@123');
  const [error, setError] = useState(null);

  const {isRemember} = useSelector(state => state.auth);
  // const {bioMetricEnable} = useSelector(state => state.auth);
  useEffect(() => {
    if (Platform.OS === 'android') {
      dispatch(setBiometricEnable(true));
    }
  }, [dispatch]);

  // const enableTouchId = () => {
  //   const optionalConfigObject = {
  //    title: 'Authentication Required',
  //     imageColor: Colors.lightBlue,
  //     imageErrorColor: Colors.red,
  //     sensorDescription: 'Touch sensor',
  //     sensorErrorDescription: 'Failed',
  //     cancelText: 'Cancel',
  //     fallbackLabel: 'Show Passcode',
  //     unifiedErrors: false,
  //     passcodeFallback: false,
  //   };

  //   TouchID.isSupported(optionalConfigObject)
  //     .then(biometryType => {
  //       if (biometryType === 'FaceID') {
  //       } else {
  //         if (isAuth) {
  //           return null;
  //         }
  //         TouchID.authenticate('Authentication', optionalConfigObject)
  //           .then(success => {
  //             if (token !== '') {
  //               const username = formInput.username;
  //               const password = formInput.password;
  //               dispatch(getUserToken({username, password}));
  //             }
  //           })

  //           .catch(err => {
  //             // BackHandler.exitApp();
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       // Failure code
  //       // setIsBiometric(false);
  //     });
  // };

  const onPressLogin = async () => {
    try {
      setLoading(true);
      let result = await dispatch(getUserToken({username, password}));
      if (result?.error) {
        setError(result.error?.message);
        // ShowAlert({
        //   messageHeader: ERROR,
        //   messageSubHeader: result.error?.message,
        //   buttonText: 'CLOSE',
        //   dispatch,
        //   navigation,
        // });
      } else {
        const {refreshToken} = result?.payload?.data || {};
        await AsyncStorage.setItem(
          'refreshToken',
          JSON.stringify(refreshToken),
        );

        if (isRemember) {
          AsyncStorage.setItem(
            'userDetailsRemeber',
            JSON.stringify({username, password}),
          );
        }
      }
    } catch (error) {
      console.log('error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : null}

      {/* {isLoading ? (
        <View style={styles.loaderContainer}>
          <View style={styles.loaderBackground} />
          <ActivityIndicator size="large" />
        </View>
      ) : null} */}

      {/* {showBiomatricModal && Platform.OS === 'android' ? (
        <Modal
          backdropColor={Colors.smokeyGrey}
          isVisible={showBiomatricModal}
          style={{flex: 1}}>
          <View style={styles.modalContainer}>
            <View style={styles.signInContainerStyle}>
              <Text style={styles.signInTextStyle}>{SIGN_IN}</Text>
            </View>
            <Text style={styles.confirmTextStyle}>{CONFIRM_FINGERPRINT}</Text>
            <View style={styles.imageSensorStyle}>
              <View style={styles.imageContainer}>
                <Image source={fingerPrint1} style={styles.imageStyle} />
              </View>
              <Text style={styles.touchSensorText}>{TOUCH_SENSOR}</Text>
            </View>
            <View style={styles.cancelButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setBiometricEnable(false));
                  setshowBiomatricModal(false);
                }}>
                <Text style={styles.cancelButton}>{CANCEL}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null} */}
      <View style={styles.mainTopContainer}>
        <Video
          source={LoginVideo}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        <View style={styles.imageContainer}>
          <Image
            style={{height: hp(12), width: wp(25)}}
            source={MonthImages.TSBudLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textInputContainer}>
          <View style={styles.textinputView}>
            <View style={styles.iconView}>
              <Image style={styles.image} source={MonthImages.LoginUser} />
            </View>
            <View style={styles.textinput}>
              <TextInput
                style={styles.userNameText}
                maxLength={256}
                name="username"
                returnKeyType="next"
                placeholder="Username"
                placeholderTextColor={Colors.silver}
                onChangeText={e => setUserName(e)}
                value={username}
              />
            </View>
          </View>

          <View style={styles.textinputView}>
            <View style={styles.iconView}>
              <Image
                style={styles.loginLockImage}
                source={MonthImages.LoginLock}
              />
            </View>
            <View style={styles.textinput}>
              <TextInput
                style={styles.passwordTextInput}
                // ref={this.passwordRef}
                name="password"
                // maxLength={256}
                returnKeyType="done"
                secureTextEntry
                placeholder="Password"
                placeholderTextColor={Colors.silver}
                // onChangeText={value => {
                //   this.onChange({name: 'password', value});
                // }}
                // onChange={onChangeTextInput}
                onChangeText={e => setPassword(e)}
                value={password}
              />
            </View>
          </View>
          {/* )}
        /> */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.passwordView}>
            {/* <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>{FORGOT_PASSWORD}</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                dispatch(setIsRemeber(!isRemember));
                if (isRemember) {
                  AsyncStorage.removeItem('userDetailsRemeber');
                }
              }}
              style={styles.forgotPasswordButton}>
              <Image
                style={styles.forgotPasswordIcon}
                source={isRemember ? LoginCheck : LoginUnCheck}
              />
              <Text style={styles.rememberText}>{REMEMBER_ME}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onPressLogin}>
            <View style={styles.loginView}>
              <Text style={styles.loginText}>Login</Text>
            </View>
          </TouchableOpacity>
          {/* <Text style={styles.orText}>OR</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(guestLoginStatus(true));
            }}>
            <Text style={styles.guestLoginText}>{GUEST_LOGIN}</Text>
          </TouchableOpacity> */}
        </View>
        {/* {Platform.OS === 'android' && bioMetricEnable ? (
          <TouchableOpacity onPress={enableTouchId}>
            <View style={styles.bioMetricView}>
              <Image source={fingerPrint} style={{height: 30, width: 35}} />
              <Text style={styles.bioMetricText}>{BIOMETRIC_LOGIN}</Text>
            </View>
          </TouchableOpacity>
        ) : null} */}
      </View>
      <View style={styles.copyRightContainer}>
        <Text style={styles.copyRightStyle}>{COPY_RIGHT}</Text>
      </View>
    </View>
  );
};

export default Login;
