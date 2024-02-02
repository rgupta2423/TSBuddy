import React from 'react';
import StatusBoxes from './StatusBoxes';
import AllEmployeesList from './AllEmployeesList';
import {ScrollView, StyleSheet} from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view'
const AttendanceTab = ({
  isLoadingAllEmployees,
  isLoadingDashboard,
  employeeStatusData,
  allEmployees,
}) => {
  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.scrollViewContentContainerStyle}>
      <StatusBoxes
        isLoadingDashboard={isLoadingDashboard}
        employeeStatusData={employeeStatusData}
      />

      <AllEmployeesList
        allEmployees={allEmployees}
        isLoadingAllEmployees={isLoadingAllEmployees}
      />
    </ScrollView>
  );
};

export default AttendanceTab;

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1,
  },
});
