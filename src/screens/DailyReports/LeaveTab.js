import React from 'react';
import {ScrollView, View} from 'react-native';

import styles from './DailyReportsStyles';
import DailyLeaveReportStatus from './DailyLeaveReportStatus';
import AllLeavesList from './AllLeavesList';

const LeaveTabContent = ({
  isLoadingLeave,
  leavesCount,
  leaves,
  selectStartDate,
  selectEndDate,
}) => {
  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={[styles.scrollViewStyle, styles.mainLeaveTabContainer]}
      contentContainerStyle={styles.scrollViewContentContainerStyle}>
      {/* <View style={styles.mainLeaveTabContainer}> */}
      <DailyLeaveReportStatus leavesCount={leavesCount} />
      <AllLeavesList
        leaves={leaves}
        selectStartDate={selectStartDate}
        selectEndDate={selectEndDate}
        isLoadingLeave={isLoadingLeave}
      />
      {/* </View> */}
    </ScrollView>
  );
};

export default LeaveTabContent;
