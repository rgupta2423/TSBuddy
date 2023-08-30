import {API_URL} from '@env';
//let year = new Date().getFullYear();
let year = new Date().getFullYear();
let month = new Date().getMonth();

export default {
  authTokenAPI: `${API_URL}/Account/login`,
  holidaysAPI: `${API_URL}/Holiday?year=${year}`,
  leaveDetails: `${API_URL}/Leave/AppliedLeaves?empId=`,
  employeeProfileAPI: `${API_URL}/EmployeeProfile/GetEmployeeByName?name=`,
  calenderEventAPI: `${API_URL}/Event/GetEvents?month=${month + 1}`,
  attendenceAPI: `${API_URL}/Attendance/GetDailyAttendanceByEmpId?empId=`,
  getUserFeedback: `${API_URL}/FoodRequest?dailyMenuId=`,
  giveFeedbackPost: `${API_URL}/FoodRequest/AddFeedback`,
  getAllEmployees: `${API_URL}/EmployeeProfile/GetAllEmployeeDetails`,
  getSalaryDataAPI: `${API_URL}/SalarySlip`,
  requestLunchApi: `${API_URL}/FoodRequest/AddLunchRequest`,
  getMenuFeedbackTotalCount: `${API_URL}/FoodRequest/TotalFoodResponseCount`,
  attendenceAPI: `${API_URL}/Attendance/GetDailyAttendanceByEmpId?empId=`,
  getTodayMenuGet: `${API_URL}/EmployeeDashBoard/GetEmployeeDashBoard`,
  applyLeave: `${API_URL}/Leave/AddLeave`,
  getEmployeesByLeaveApprover: `${API_URL}/EmployeeProfile/GetEmployeesByLeaveApprover`,
  getResourcesEmployeesLeaves: `${API_URL}/EmployeeProfile/GetEmployeeLeaves?empId=`,
  updateLeaveStatus: `${API_URL}/EmployeeProfile/UpdateLeaveStatus`,
  GetDailyAttendanceByEmpId: `${API_URL}/Attendance/GetDailyAttendanceByEmpId`,
  getLeaveApprovers: `${API_URL}/Leave/GetLeaveApprover?empId=`,
  addMealFeedback: `${API_URL}/FoodRequest/AddMealFeedback`,
  getLunchRequests: `${API_URL}/FoodRequest/GetLunchRequest?empId=`,
  cancelLunchRequest: `${API_URL}/FoodRequest/CancelLunchRequest`,
  updateEmployeeLeave: `${API_URL}/Leave/UpdateEmployeeLeave`,
  getResourceLeaves: `${API_URL}/Leave/GetAllocatedLeaves?empId=`,
  getAttRegularizationReason: `${API_URL}/Attendance/GetAttRegularizationReason`,
  AttendanceRegularizationRequest: `${API_URL}/Attendance/AttendanceRegularizationRequest`,
  getEmployeeRegularizationRequest: `${API_URL}/Attendance/GetEmployeeRegularizationRequest?empId=`,
  updateAttRegularizeStatus: `${API_URL}/Attendance/UpdateAttRegularizeStatus`,
  getEmployeeWorkMode: `${API_URL}/Attendance/GetEmployeeWorkMode?empId=`,
  getTodayCheckInTime: `${API_URL}/Attendance/GetTodayAttendanceInTime`,
  getEmployeeShift: `${API_URL}/FoodRequest/GetEmployeeShift?empId=`,
  getTotalLeaveDays: `${API_URL}/Leave/GetTotalLeaveDays?employeeId=`,
  getLunchPlanID: `${API_URL}/FoodRequest/GetPlans`,
  getLunchCancelDeadline: `${API_URL}/FoodRequest/GetTimeAndDate`,
  getTodayLunchRequests: `${API_URL}/FoodRequest/GetLunchRequestByDate?date=`,
  getAllResourcesAttendance: `${API_URL}/EmployeeProfile/GetEmployeesLeaveAndAttendanceByDate?date=`,
  WfhApplication: `${API_URL}/Leave/WfhApplication`,
  getPolicies: `${API_URL}/Policy/GetPolicies`,
  getDailyLunchRequests: `${API_URL}/FoodRequest/GetLunchRequestByDate?date=`,
  addMenuDetails: `${API_URL}/FoodRequest/AddToday'sMenu`,
  renewToken: `${API_URL}/Account/RenewToken`,
  getTodayLunchRequests: `${API_URL}/FoodRequest/GetLunchRequestByDate?date=`,
  getAllResourcesAttendance: `${API_URL}/EmployeeProfile/GetEmployeesLeaveAndAttendanceByDate?date=`,
  getConfigData: `${API_URL}/FoodRequest/GetConfigDetails`,
  createNewAttendance: `${API_URL}/Attendance/CreateAttendance`,
};
