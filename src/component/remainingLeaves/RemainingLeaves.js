import React from 'react';
import {View, Text, Dimensions, Pressable} from 'react-native';

import {BarChart, LineChart} from 'react-native-chart-kit';
import {useNavigation} from '@react-navigation/native';

import styles from './RemainingLeavesStyles';
import {Colors} from 'colors/Colors';
import {useSelector} from 'react-redux';
import {LeaveApplyScreen, LeavesSeparate} from 'navigation/Route';

const RemainingLeaves = () => {
  const navigation = useNavigation();
  const {isGuestLogin: isGuestLogin} = useSelector(state => state.auth);
  const {leaveMenuDetails: {remainingLeaves = []} = {}} = useSelector(
    state => state.home,
  );

  const restrictedLeaves = remainingLeaves.find(
    leave => leave.leaveType === 'Restricted Holiday',
  );

  const {leavesData} = useSelector(state => state.home);

  const restrictedLeavesData = [
    isGuestLogin ? 1 : restrictedLeaves?.totalLeavesAllocated || 0,
    isGuestLogin ? 0 : restrictedLeaves?.currentLeaveApplied || 0,
    isGuestLogin ? 1 : restrictedLeaves?.currentLeaveBalance || 0,
  ];

  const earnedLeavesData = [
    isGuestLogin ? 15 : remainingLeaves[0]?.totalLeavesAllocated,
    isGuestLogin ? 7 : remainingLeaves[0]?.currentLeaveApplied,
    isGuestLogin ? 8 : remainingLeaves[0]?.currentLeaveBalance,
  ];

  const barChartGraph = ({data, rh}) => {
    return (
      <View>
        <BarChart
          showVerticalLabels={true}
          verticalLabelRotation={30}
          segments={rh ? 2 : 4}
          spacingInner={0}
          flatColor={true}
          showValuesOnTopOfBars={true}
          showBarTops={false}
          withInnerLines={false}
          fromZero={true}
          withVerticalLabels={false}
          withCustomBarColorFromData={true}
          data={{
            datasets: [
              {
                data,
                colors: [
                  () => Colors.lovelyYellow,
                  () => Colors.lovelyBlue,
                  () => Colors.lovelyGreen,
                  () => Colors.red,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.46}
          height={220}
          chartConfig={{
            backgroundColor: Colors.white,
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            decimalPlaces: 0,
            fillShadowGradientOpacity: '0.5',
            barPercentage: 0.25,
            color: (opacity = 1) =>
              Colors.customColor({opacity, r: 0, g: 0, b: 0}),
            style: {
              borderRadius: 0,
            },
            categoryPercentage: 0.5,
          }}
          style={styles.barChartStyle}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.remainingText}>Manage Leaves</Text>
        {!isGuestLogin && (
          <Pressable
            onPress={() => {
              ////////////////////////////////////////////////////////////////
              const openLeaves = {rhOpen: 0, earnedOpen: 0};

              for (const leave of leavesData) {
                if (
                  leave?.leaveType?.toLowerCase() === 'earned leave' &&
                  leave.status?.toLowerCase() === 'open'
                ) {
                  const totalDays = leave?.totalLeaveDays;
                  openLeaves.earnedOpen += totalDays;
                }
                if (
                  leave?.leaveType?.toLowerCase() === 'restricted holiday' &&
                  leave.status?.toLowerCase() === 'open'
                ) {
                  const totalDays = leave?.totalLeaveDays;
                  openLeaves.rhOpen += totalDays;
                }
              }

              navigation.navigate('Calendar', {
                screen: 'CalendarMain',
                params: {
                  screen: LeavesSeparate,
                  params: {
                    screen: LeaveApplyScreen,
                    params: {
                      leavesData,
                      openLeavesCount: openLeaves,
                      applyLeave: true,
                      hasToPop: true,
                    },
                  },
                },
              });
            }}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Apply</Text>
          </Pressable>
        )}
      </View>
      {remainingLeaves?.length === 0 ? (
        <View style={styles.noLeavesContainer}>
          <Text style={styles.noLeavesText}>No remaining leaves found.</Text>
        </View>
      ) : (
        <View style={styles.leavesContainer}>
          <View style={styles.graphsContainer}>
            <View>
              {earnedLeavesData && earnedLeavesData?.length
                ? barChartGraph({data: earnedLeavesData})
                : null}

              <Text style={styles.earnedLeaveText}>Earned Leave</Text>
            </View>
            <View>
              {restrictedLeavesData?.length
                ? barChartGraph({data: restrictedLeavesData, rh: true})
                : null}
              <Text style={styles.RHLeaveText}>Restricted Leave</Text>
            </View>
          </View>
          <View style={styles.leavesTypeContainer}>
            <View style={styles.leaveType}>
              <View style={styles.leavesType1} />
              <Text>Allocated</Text>
            </View>
            <View style={styles.leaveType}>
              <View style={styles.leavesType2} />
              <Text>Taken</Text>
            </View>
            <View style={styles.leaveType}>
              <View style={styles.leavesType3} />
              <Text>+ve Balance</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default RemainingLeaves;
