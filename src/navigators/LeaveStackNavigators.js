import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LeaveDetails from 'screens/leaves/LeaveDetails';
import Leaves from 'screens/leaves/Leaves';
import {MonthImages} from 'assets/monthImage/MonthImage';
import MenuIcon from 'assets/allImage/Menu.imageset/menu2.png';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'utils/Responsive';
import {DrawerActions} from '@react-navigation/native';
import {Colors} from 'colors/Colors';

const Stack = createNativeStackNavigator();
const LeavesStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="LeavesPage" headerMode="none">
      <Stack.Screen
        name="LeavesPage"
        component={Leaves}
        // options={{headerShown: false}}
        options={props => {
          return {
            headerStyle: {backgroundColor: '#1b5583', height: 55},
            drawerLabel: '',
            title: 'Leaves',
            headerLeft: () => {
              return (
                <Pressable
                  onPress={() => {
                    props.navigation.toggleDrawer();
                  }}>
                  <Image
                    source={MenuIcon}
                    style={{height: 20, width: 20, color: '#fff'}}
                  />
                </Pressable>
              );
            },
            drawerIcon: ({tintColor}) => (
              <View>
                <Image
                  source={MonthImages.leavesImage}
                  // style={[styles.icon, { tintColor: tintColor }]}
                  style={{height: 50, width: 50}}
                />
                <Text
                  style={{
                    color: 'white',
                    paddingTop: hp(1),
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: 16,
                  }}>
                  Leaves
                </Text>
              </View>
            ),

            headerTitle: props => {
              return (
                <TouchableOpacity>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        marginLeft: Platform.OS === 'ios' ? 0.1 : wp(32),
                        //paddingTop: hp(0.5),
                        fontSize: 16,
                        fontWeight: 'bold',
                        // paddingRight: 8,
                      }}>
                      Leave
                    </Text>
                    {/* <Image
                      source={MonthImages.info_scopy}
                      style={{height: 20, width: 20}}
                    /> */}
                  </View>
                </TouchableOpacity>
              );
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Image
                  source={MonthImages.searchIconwhite}
                  style={{
                    height: 25,
                    width: 25,
                    marginRight: 20,
                    color: 'white',
                  }}
                />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack.Screen
        name="LeavesDetailsPage"
        component={LeaveDetails}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default LeavesStackNavigator;
