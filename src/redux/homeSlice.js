import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import endPoints from '../config';
import {API_URL} from '@env';

import axios from 'axios';
import {MonthImages} from 'assets/monthImage/MonthImage';
import {LEAVE, LEAVE_ALLOCATION, REGULARISATION, WFH} from 'utils/string';
// import {centralizeApi} from 'utils/utils';

const initialState = {
  isShowModal: false,
  salarySlipData: {},
  employeeShift: [],
  employeeShiftError: undefined,
  salarySlipDataLoading: false,
  salarySlipDataError: false,
  employeeData: {},
  employeeDataLoading: false,
  employeeDataError: false,
  holidayData: [],
  holidayDataLoading: false,
  holidayDataError: false,
  dateData: '',
  holidayDataIWithImage: {},
  holidayDataWithImageLoading: false,
  holidayDataWithImageError: false,
  leavesData: [],
  leavesDataError: undefined,
  isLeaveDataLoading: false,
  employeeProfile: {},
  employeeProfileLoading: false,
  employeeProfileError: false,
  calendereventDataLoading: false,
  calendereventData: {},
  calendereventDataError: false,
  attendenceDataPending: false,
  attendenceData: [],
  attendenceDataError: false,
  recentAppliedLeaves: [],
  remainingLeaves: [],
  leaveMenuDetails: {},
  menuDetailsLoading: false,
  foodMenuDatailsError: null,
  menuFeedbackError: null,
  dailyMenuID: '',
  userFeedback: [],
  resourcesEmployeeDataLoading: false,
  resourcesEmployeeData: [],
  resourcesEmployeeDataError: null,
  fromNavigatedScreen: '',
  configData: [],
};

const breakfast = 'breakfast';
const lunch = 'lunch';
const snacks = 'snacks';

// =============================================

// removeReduxVariables ='All variables are needed to remove from redux state and have to use with useState.'

// export const getLeaveApprover = createAsyncThunk(
//   'home/getLeaveApprovers',
//   async token => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     };

//     try {
//       const {data, status} = await axios.get(
//         `${endPoints.getLeaveApprovers}${employeeID}`,
//         config,
//       );

//       if (status === 200) {
//         return Promise.resolve(data);
//       } else {
//         return Promise.reject('Something went wrong!');
//       }
//     } catch (err) {
//       let statusCode = 500;
//       if (err?.response) {
//         statusCode = err?.response?.status;
//       }
//       if (statusCode == 401) {
//         return Promise.reject(err?.response?.data?.message);
//       } else if (statusCode === 400) {
//         return Promise.reject(err?.response?.data);
//       } else {
//         return Promise.reject(new Error(err));
//       }
//     }
//   },
// );

export const dismissSelfLeaveAllocationRequest = createAsyncThunk(
  'dismissSelfLeaveAllocationRequest',
  async ({token, body}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const url = endPoints.dismissSelfLeaveAllocationRequest;

    try {
      const {data, status} = await axios.post(url, body, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const updateLeaveAllocationRequest = createAsyncThunk(
  'updateLeaveAllocationRequest',
  async ({token, body}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const url = endPoints.updateLeaveAllocationRequest;

    try {
      const {data, status} = await axios.post(url, body, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);
export const getAllEmployeesForHR = createAsyncThunk(
  'getAllEmployeesForHR',
  async ({token}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const url = endPoints.getAllEmployeesForHR;

    try {
      const {data, status} = await axios.get(url, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

// export const getSelfLeaveRegularisationRequests = createAsyncThunk(
//   'getSelfLeaveRegularisationRequests',
//   async ({token, empId}) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     };

//     const url = endPoints.getSelfLeaveRegularisationRequest + empId;

//     try {
//       const {data, status} = await axios.get(url, config);

//       if (status === 200) {
//         return Promise.resolve(data);
//       } else {
//         return Promise.reject('Something went wrong!');
//       }
//     } catch (err) {
//       let statusCode = 500;
//       if (err?.response) {
//         statusCode = err?.response?.status;
//       }
//       if (statusCode === 401) {
//         return Promise.reject(err?.response?.data?.message);
//       } else if (statusCode === 400) {
//         return Promise.reject(err?.response?.data);
//       } else {
//         return Promise.reject(new Error(err));
//       }
//     }
//   },
// );

export const getSelfLeaveAllocationRequests = createAsyncThunk(
  'getSelfLeaveAllocationRequests',
  async ({token}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = endPoints.getSelfLeaveAllocationRequest;

    try {
      const {data, status} = await axios.get(url, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      if (err?.response) {
        return Promise.reject(err?.response?.data);
      }
      return Promise.reject(new Error(err));
    }
  },
);

export const createLeaveAllocationRequest = createAsyncThunk(
  'createLeaveAllocationRequest',
  async ({token, body}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = endPoints.createLeaveAllocationRequest;

    try {
      const {data, status} = await axios.post(url, body, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      if (err?.response) {
        return Promise.reject(err?.response?.data);
      }
      return Promise.reject(new Error(err));
    }
  },
);

export const getRemainingLeavesByEmpId = createAsyncThunk(
  'home/getRemainingLeavesByEmpId',
  async function ({token, empId}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const url = endPoints.getRemLeavesById + empId;

    try {
      const {data, status} = await axios.get(url, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getRegularisationsForManager = createAsyncThunk(
  'home/getRegularisationsForManager',
  async function ({token, body, endPoint}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const url = API_URL + endPoint;

    try {
      const {data, status} = await axios.post(url, body, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getLeaveApplicationData = createAsyncThunk(
  'home/getLeaveApplicationData',
  async function ({token, body, selectedType}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    const endPointsObj = {
      [LEAVE]: endPoints.getLeavesByHR,
      [REGULARISATION]: endPoints.getRegularisationsByHR,
      [WFH]: endPoints.getWFHByHR,
      [LEAVE_ALLOCATION]: endPoints.getLeaveAllocationRequests,
    };

    const url = endPointsObj[selectedType];

    try {
      const {data, status} = await axios.post(url, body, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

// export const getEmployeesLeavesFromLeaveApplication = createAsyncThunk(
//   'home/getEmployeesLeavesFromLeaveApplication',
//   async ({token, empId}) => {
//     const config = {
//       method: 'get',
//       url: endPoints.getEmployeesLeavesFromLeaveApplication + empId,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     };

//     return axios(config)
//       .then(response => {
//         const {data, status} = response;
//         if (status === 200) {
//           return Promise.resolve(data);
//         } else {
//           return Promise.reject(new Error('Something Went Wrong!'));
//         }
//       })
//       .catch(err => {
//         let statusCode = 500;
//         if (err?.response) {
//           statusCode = err?.response.status;
//         }
//         if (statusCode == 401) {
//           return Promise.reject(err?.response?.data?.message);
//         } else {
//           return Promise.reject(new Error(err));
//         }
//       });
//   },
// );

export const getWorkModeByEmployeeId = createAsyncThunk(
  'getWorkModeEmployees',
  async ({token, employeeId}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${endPoints.getWorkModeById}${employeeId}`;

    try {
      const {data, status} = await axios.get(url, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401 || statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getWorkModeEmployees = createAsyncThunk(
  'getWorkModeEmployees',
  async ({token, dateStart, dateEnd}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${endPoints.getWorkModeEmployees}${dateStart}&toDate=${dateEnd}`;

    try {
      const {data, status} = await axios.get(url, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401 || statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getLeaveReport = createAsyncThunk(
  'getLeaveReport',
  async ({token, dateStart, dateEnd}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${endPoints.getFullLeaveReport}${dateStart}&toDate=${dateEnd}`;

    try {
      const {data, status} = await axios.get(url, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401 || statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getAllDailyEmployees = createAsyncThunk(
  'getDailyEmployeesCount',
  async ({token, date}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = endPoints.getDailyAllEmployees + date;

    try {
      const {data, status} = await axios.get(url, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401 || statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getDailyEmployeesCount = createAsyncThunk(
  'getDailyEmployeesCount',
  async ({token, date}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = endPoints.getDailyAttendanceCount + date;

    try {
      const {data, status} = await axios.get(url, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401 || statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const addDailyMenuDetails = createAsyncThunk(
  'addDailyMenuDetails',
  async ({token, body}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = endPoints.addMenuDetails;

    try {
      const {data, status} = await axios.post(url, body, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401 || statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getConfigData = createAsyncThunk(
  'getConfigData',
  async ({token}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = endPoints.getConfigData;

    try {
      const {data, status} = await axios.get(url, config);
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error());
      }
    } catch (err) {
      let statusCode = 500;

      if (err?.response) {
        statusCode = err?.response?.status;
      }

      if (statusCode === 400 || statusCode === 401) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

// export const getPermissions = createAsyncThunk(
//   'getPermissions',
//   async ({token}) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const url = endPoints.getPermissionAccess;

//     try {
//       const {data, status} = await axios.get(url, config);
//       if (status === 200) {
//         return Promise.resolve(data);
//       } else {
//         return Promise.reject(new Error());
//       }
//     } catch (err) {
//       let statusCode = 500;

//       if (err?.response) {
//         statusCode = err?.response?.status;
//       }

//       if (statusCode === 400 || statusCode === 401) {
//         return Promise.reject(err?.response?.data);
//       } else {
//         return Promise.reject(new Error(err));
//       }
//     }
//   },
// );

export const getAllResourcesAttendence = createAsyncThunk(
  'getAllResourcesAttendence',
  async ({token, date}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = endPoints.getAllResourcesAttendance + date;

    try {
      const {data, status} = await axios.get(url, config);
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error());
      }
    } catch (err) {
      let statusCode = 500;

      if (err?.response) {
        statusCode = err?.response?.status;
      }

      if (statusCode === 400 || statusCode === 401) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getTodayLunchRequests = createAsyncThunk(
  'getTodayLunchRequests',
  async ({token, date}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = endPoints.getTodayLunchRequests + date;

    try {
      const {data, status} = await axios.get(url, config);
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error());
      }
    } catch (err) {
      let statusCode = 500;

      if (err?.response) {
        statusCode = err?.response?.status;
      }

      if (statusCode === 400 || statusCode === 401) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

// export const lunchRequestCancellationDeadline = createAsyncThunk(
//   'lunchRequestCancellationDeadline',
//   async ({token}) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const url = endPoints.getLunchCancelDeadline;

//     try {
//       const {data, status} = await axios.get(url, config);
//       if (status === 200) {
//         return Promise.resolve(data);
//       } else {
//         return Promise.reject(new Error());
//       }
//     } catch (err) {
//       let statusCode = 500;

//       if (err?.response) {
//         statusCode = err?.response?.status;
//       }

//       if (statusCode === 400 || statusCode === 401) {
//         return Promise.reject(err?.response?.data);
//       } else {
//         return Promise.reject(new Error(err));
//       }
//     }
//   },
// );

export const getLunchPlans = createAsyncThunk(
  'getLunchPlans',
  async ({token}) => {
    const {getLunchPlanID: url} = endPoints;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const {data, status} = await axios.get(url, config);
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error());
      }
    } catch (err) {
      let statusCode = 500;

      if (err?.response) {
        statusCode = err?.response?.status;
      }

      if (statusCode === 400 || statusCode === 401) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getFinalizedLeaveDays = createAsyncThunk(
  'getFinalizedLeaveDays',
  async ({token, employeeId, fromDate, toDate}) => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    const {getTotalLeaveDays} = endPoints;

    const url = `${getTotalLeaveDays}${employeeId}&fromDate=${fromDate}&toDate=${toDate}`;

    var config = {
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    // const url = `http://10.101.23.48:81/api/Leave/GetTotalLeaveDays?employeeId=10868&fromDate=2023-06-14&toDate=2023-06-26`;

    try {
      // const {data, status} = await axios.get(url, config);
      // const {data, status} = await axios.get(url, config);
      const {data, status} = await axios(config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error());
      }
    } catch (err) {
      let statusCode = 500;

      if (err?.response) {
        statusCode = err?.response?.status;
      }

      if (statusCode === 400 || statusCode === 401) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getEmployeeShift = createAsyncThunk(
  'getEmployeeShift',
  async ({token, id}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const {getEmployeeShiftUrl} = endPoints;

    try {
      const {data, status} = await axios.get(
        `${getEmployeeShiftUrl}${id}`,
        config,
      );
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error());
      }
    } catch (err) {
      let statusCode = 500;

      if (err?.response) {
        statusCode = err?.response?.status;
      }

      if (statusCode === 400 || statusCode === 401) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getPolicies = createAsyncThunk(
  'home/getPolicies',
  async ({token}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const {getPolicies} = endPoints;
    try {
      const {data, status} = await axios.get(getPolicies, config);
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        Promise.reject(new Error('Something went wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode == 401 || statusCode == 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getTodayCheckInTime = createAsyncThunk(
  'getTodayCheckInTime',
  async ({token}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const {getTodayCheckInTimeURL} = endPoints;

    try {
      const {data, status} = await axios.get(getTodayCheckInTimeURL, config);
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401 || statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const addMealFeedback = createAsyncThunk(
  'addMealFeedback',
  async ({token, body}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const apiUrl = endPoints.addMealFeedback;

    try {
      const {data, status} = await axios.post(apiUrl, body, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode == 401 || statusCode == 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getResourseLeaveDetails = createAsyncThunk(
  'getResourseLeaveDetails',
  async ({token, id}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const apiUrl = `${endPoints.getResourceLeaves}${id}`;
    // http://10.101.23.48:81/api/Leave/GetAllocatedLeaves?empId=10860
    // http://10.101.23.48:81/api/Leave/GetAllocatedLeaves?empId=EMP/10860

    try {
      const {data, status} = await axios.get(apiUrl, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (error) {
      let statusCode = 500;
      if (error?.response) {
        statusCode = error?.response?.status;
      }
      if (statusCode == 401 || statusCode == 400) {
        return Promise.reject(error?.response?.data);
      } else {
        return Promise.reject(new Error(error));
      }
    }
  },
);
export const cancelSubscribedLunchRequest = createAsyncThunk(
  'cancelSubscribedLunchRequest',
  async ({token, body}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const apiUrl = `${endPoints.cancelLunchRequest}`;

    try {
      const {data, status} = await axios.post(apiUrl, body, config);

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode == 401 || statusCode == 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getSubscribedLunchRequests = createAsyncThunk(
  'home/getSubscribedLunchRequests',
  async ({token, employeeID}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const apiUrl = `${endPoints.getLunchRequests}${employeeID}`;

    try {
      const requests = await axios.get(apiUrl, config);
      const {data, status} = requests;
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something went wrong.'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getWorkModeOfEmployee = createAsyncThunk(
  'home/workMode',
  async function ({token, employeeID}) {
    var config = {
      method: 'get',
      url: `${endPoints.getEmployeeWorkMode}${employeeID}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(async responce => {
        const {data, status} = responce;

        if (status == 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something went wrong!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.responce) {
          statusCode = err?.responce.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const getLeaveApprovers = createAsyncThunk(
  'home/getLeaveApprovers',
  async ({token, employeeID}) => {
    var config = {
      method: 'get',
      url: `${endPoints.getLeaveApprovers}${employeeID}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(async response => {
        const {data, status} = response;

        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong2!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const updateLeaveStatus = createAsyncThunk(
  'home/updateLeaveStatus',
  async ({token, body}) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const {data, status} = await axios.post(
        endPoints.updateLeaveStatus,
        body,
        config,
      );

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode == 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const applyForWfhLeave = createAsyncThunk(
  'home/applyWfh',
  async function ({token, body}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const {data, status} = await axios.post(
        endPoints.WfhApplication,
        body,
        config,
      );

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong');
      }
    } catch (err) {
      let statusCode = 500;
      if (err.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode == 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

// export const createNewAttendance = createAsyncThunk(
//   'home/newAttendance',
//   async function ({token, body}) {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     };
//     try {
//       const {data, status} = await axios.post(
//         endPoints.createNewAttendance,
//         body,
//         config,
//       );

//       if (status === 200) {
//         return Promise.resolve(data);
//       } else {
//         return Promise.reject('Something went wrong');
//       }
//     } catch (err) {
//       let statusCode = 500;
//       if (err.response) {
//         statusCode = err?.response?.status;
//       }
//       if (statusCode == 401) {
//         return Promise.reject(err?.response?.data?.message);
//       } else if (statusCode === 400) {
//         return Promise.reject(err?.response?.data);
//       } else {
//         return Promise.reject(new Error(err));
//       }
//     }
//   },
// );

export const getAllEmployeeListForHR = createAsyncThunk(
  'home/allEmployeeForHR',
  async function ({token}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const {data, status} = await axios.get(
        endPoints.getAllEmployeeForHR,
        config,
      );

      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong');
      }
    } catch (err) {
      let statusCode = 500;
      if (err.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const createAttendance = createAsyncThunk(
  'home/createAttendance',
  async function ({token, body}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    console.log('body:', body, token);

    try {
      const {data, status} = await axios.post(
        endPoints.createNewAttendance,
        body,
        config,
      );
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      console.log('err500:', err);
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const applyForLeave = createAsyncThunk(
  'home/applyLeave',
  async function ({token, body}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const {data, status} = await axios.post(
        endPoints.applyLeave,
        body,
        config,
      );
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      console.log('errrrrrr:', err);
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const applyForUpdateedLeave = createAsyncThunk(
  'home/updateEmployeeLeave',
  async function ({token, body}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const {data, status} = await axios.post(
        endPoints.updateEmployeeLeave,
        body,
        config,
      );
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode == 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const requestForAttendanceRegularization = createAsyncThunk(
  'home/requestForAttendanceRegularization',
  async function ({token, body}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const {data, status} = await axios.post(
        endPoints.AttendanceRegularizationRequest,
        body,
        config,
      );
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode === 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const updateAttRegularizeStatus = createAsyncThunk(
  'home/updateAttRegularizeStatus',
  async function ({token, body}) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      const {data, status} = await axios.post(
        endPoints.updateAttRegularizeStatus,
        body,
        config,
      );
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject('Something went wrong!');
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response?.status;
      }
      if (statusCode == 401) {
        return Promise.reject(err?.response?.data?.message);
      } else if (statusCode === 400) {
        return Promise.reject(err?.response?.data);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const getEmployeeRegularizationRequest = createAsyncThunk(
  'home/getEmployeeRegularizationRequest',
  async ({token, empId}) => {
    const config = {
      method: 'get',
      url: `${endPoints.getEmployeeRegularizationRequest}${empId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const getSingleUserFeedback = createAsyncThunk(
  'home/getSingleUserFeedback',
  async ({token, menuID}) => {
    const config = {
      method: 'get',
      url: `${endPoints.getUserFeedback}${menuID}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        }
        // else {
        //   return Promise.reject(new Error('Something Went Wrong1!'));
        // }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
); // removeReduxVariables

// export const giveMenuFeedback = createAsyncThunk(
//   'home/giveMenuFeedback',
//   async ({token, menuID, userData, feedbackType, index}) => {
//     const isLike = feedbackType === 'like';
//     let value;
//     if (isLike) value = 1;
//     else value = 0;

//     let type;
//     if (index === 0) type = 'breakfast';
//     if (index === 1) type = 'lunch';
//     if (index === 2) type = 'meal';

//     const apiEndpoint = endPoints.giveFeedbackPost;

//     userData.dailyMenuId = menuID;
//     userData[type] = value;

//     return axios
//       .post(apiEndpoint, userData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(response => {
//         const {data, status} = response;
//         if (status === 200) {
//           data.index = index;
//           return Promise.resolve(data);
//         } else {
//           return Promise.reject(new Error('Something Went Wrong!'));
//         }
//       })
//       .catch(err => {
//         let statusCode = 500;
//         if (err?.response) {
//           statusCode = err?.response.status;
//         }
//         if (statusCode == 401) {
//           return Promise.reject(err?.response?.data?.message);
//         } else {
//           return Promise.reject(new Error(err));
//         }
//       });
//   },
// );

// export const getMenuFeedback = createAsyncThunk(
//   'home/menuFeedback',
//   async token => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     try {
//       const feedback = await axios.get(
//         endPoints.getMenuFeedbackTotalCount,
//         config,
//       );
//       return Promise.resolve(feedback.data);
//     } catch (err) {
//       let statusCode = 500;
//       if (err?.response) {
//         statusCode = err?.response.status;
//       }
//       if (statusCode == 401) {
//         return Promise.reject(err?.response?.data?.message);
//       } else {
//         return Promise.reject(new Error(err));
//       }
//     }
//   },
// );

// =============================================

// ============================================================================================

// your userSlice with other reducers

export const getTodayMenuDetails = createAsyncThunk(
  'home/getTodayMenuDetails',
  async token => {
    const config = {
      method: 'get',
      url: endPoints.getTodayMenuGet,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

// ============================================================================================

// =============================================

// ============================================================================================

// your userSlice with other reducers
export const getEmployeesAtManagerEnd = createAsyncThunk(
  'home/getEmployeesAtManagerEnd',
  async token => {
    const config = {
      method: 'get',
      url: endPoints.getEmployeesAtManagerEnd,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode === 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const getEmployeesByLeaveApprover = createAsyncThunk(
  'home/getEmployeesByLeaveApprover',
  async token => {
    const config = {
      method: 'get',
      url: endPoints.getEmployeesByLeaveApprover,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const getResourcesEmployeesLeaves = createAsyncThunk(
  'getResourcesEmployeesLeaves',
  async ({token, empID}) => {
    const config = {
      method: 'get',
      url: endPoints.getResourcesEmployeesLeaves + empID,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode === 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const getAttReguarzationReason = createAsyncThunk(
  'getReguarzationReason',
  async token => {
    const config = {
      method: 'get',
      url: endPoints.getAttRegularizationReason,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode === 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const GetDailyAttendanceByEmpId = createAsyncThunk(
  'dailyAttendanceByEmpId',
  async ({token, employeeID, year, month}) => {
    const config = {
      method: 'get',
      url: `${endPoints.GetDailyAttendanceByEmpId}?empId=${employeeID}&month=0${month}&year=${year}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode === 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

// =======================

export const getHolidaysData = createAsyncThunk(
  'home/holidayData',
  async token => {
    const config = {
      method: 'get',
      url: endPoints.holidaysAPI,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(async response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong1!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

// ==========================

export const getLeaveDetails = createAsyncThunk(
  'home/getWalkThroughList',
  async ({token, empID}) => {
    var config = {
      method: 'get',
      url: `${endPoints.leaveDetails}${empID}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(async response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong2!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode === 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);
export const getEmployeeProfileData = createAsyncThunk(
  'home/employeeProfile',
  async ({token, employeeID}) => {
    var config = {
      method: 'get',
      url: `${endPoints.employeeProfileAPI}${employeeID}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return axios(config)
      .then(async response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong3!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode === 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const getCalendereventData = createAsyncThunk(
  'home/getCalendereventData',
  async ({token}) => {
    var config = {
      method: 'get',
      url: endPoints.calenderEventAPI,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then(async response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong1!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);
export const getAttendencaeData = createAsyncThunk(
  'home/getAttendencaeData',
  async ({token, employeeID, visisbleMonth, visibleYear}) => {
    const uri = `${endPoints.attendenceAPI}${employeeID}&month=${visisbleMonth}&year=${visibleYear}`;

    const config = {
      method: 'get',
      url: uri,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then(async response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong3!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const getSalarySlipData = createAsyncThunk(
  'dataReducer/salarySlipData',
  async token => {
    var config = {
      method: 'get',
      url: endPoints.getSalaryDataAPI,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    return axios(config)
      .then(async response => {
        const {data, status} = response;
        if (status === 200) {
          return Promise.resolve(data);
        } else {
          return Promise.reject(new Error('Something Went Wrong1!'));
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode === 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const getEmployeeData = createAsyncThunk(
  'home/employeeData',
  async ({token, currentEmployees}) => {
    const config = {
      method: 'post',
      url: `${endPoints.getAllEmployees}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: currentEmployees,
    };

    try {
      const allEmployees = await axios(config);
      const {data, status} = allEmployees;
      if (status === 200) {
        return Promise.resolve(data);
      } else {
        return Promise.reject(new Error('Something Went Wrong1!'));
      }
    } catch (err) {
      let statusCode = 500;
      if (err?.response) {
        statusCode = err?.response.status;
      }
      if (statusCode == 401) {
        return Promise.reject(err?.response?.data?.message);
      } else {
        return Promise.reject(new Error(err));
      }
    }
  },
);

export const requestLunchSubmission = createAsyncThunk(
  'dataReducer/requestLunchSubmission',
  async formInput => {
    const {token, ...extraPayload} = formInput;
    const url = endPoints.requestLunchApi;
    var config = {
      method: 'post',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: extraPayload,
    };

    return axios(config)
      .then(result => {
        const {data = {}, status} = result || {};

        if (status === 200) {
          return Promise.resolve({data, formInput});
        } else {
          return Promise.reject('something went wrong');
        }
      })
      .catch(err => {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response?.status;
        }
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else if (statusCode === 400) {
          return Promise.reject(err?.response?.data);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    homeReset: (state, action) => {
      state.employeeProfile = {};
    },

    modalStatus: (state, action) => {
      state.isShowModal = action.payload;
    },
    dateOfModal: (state, action) => {
      state.dateData = action.payload;
    },
    setRecentAppliedLeaves: (state, action) => {
      state.recentAppliedLeaves = action.payload;
    },

    setRemainingLeaves: (state, action) => {
      state.remainingLeaves = action.payload;
    },

    setFromNavigatedScreen: (state, action) => {
      state.fromNavigatedScreen = action?.payload?.screenName;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSingleUserFeedback.fulfilled, (state, action) => {
      const data = action.payload;

      const breakfastRating = data?.breakfast;
      const lunchRating = data?.lunch;
      const snacksRating = data?.meal;

      const feedbackArray = [
        {
          type: breakfast,
          feedback: breakfastRating,
        },
        {
          type: lunch,
          feedback: lunchRating,
        },
        {
          type: snacks,
          feedback: snacksRating,
        },
      ];

      state.userFeedback = feedbackArray;
    });

    // builder.addCase(giveMenuFeedback.fulfilled, (state, action) => {
    //   const feedbackArray = [...state.userFeedback];
    //   // return;

    //   if (feedbackArray.length) {
    //     feedbackArray[action?.payload?.index].feedback = action?.payload?.isLike
    //       ? 1
    //       : 0;
    //   }

    //   state.userFeedback = feedbackArray;
    // });
    // builder.addCase(giveMenuFeedback.rejected, (state, action) => {
    // });
    builder.addCase(getSalarySlipData.pending, state => {
      state.salarySlipDataLoading = true;
    });
    builder.addCase(getSalarySlipData.fulfilled, (state, action) => {
      state.salarySlipDataLoading = false;
      state.salarySlipData = action.payload;
      state.salarySlipDataError = undefined;
    });
    builder.addCase(getSalarySlipData.rejected, (state, action) => {
      state.salarySlipDataLoading = false;
      state.salarySlipData = [];
      state.salarySlipDataError = action.payload;
    });
    builder.addCase(getEmployeeShift.fulfilled, (state, action) => {
      state.employeeShift = action.payload;
      state.employeeShiftError = undefined;
    });
    builder.addCase(getEmployeeShift.rejected, (state, action) => {
      state.employeeShift = [];
      state.employeeShiftError = action.payload;
    });

    builder.addCase(getEmployeeData.pending, state => {
      state.employeeDataLoading = true;
    });
    builder.addCase(getEmployeeData.fulfilled, (state, action) => {
      state.employeeDataLoading = false;
      state.employeeData = action.payload;
      state.employeeDataError = undefined;
    });
    builder.addCase(getEmployeeData.rejected, (state, action) => {
      state.employeeDataLoading = false;
      state.employeeData = [];
      state.employeeDataError = action.payload;
    });
    builder.addCase(getHolidaysData.pending, state => {
      state.holidayDataLoading = true;
    });
    builder.addCase(getHolidaysData.fulfilled, (state, action) => {
      state.holidayDataLoading = false;
      state.holidayData = action.payload;
      state.holidayDataError = undefined;
    });
    builder.addCase(getHolidaysData.rejected, (state, action) => {
      state.holidayDataLoading = false;
      state.holidayData = [];
      state.holidayDataError = action.payload;
    });

    // builder.addCase(getMenuFeedback.pending, state => {});

    builder.addCase(getTodayMenuDetails.pending, state => {
      state.menuDetailsLoading = true;
    });

    builder.addCase(getTodayMenuDetails.fulfilled, (state, action) => {
      state.menuDetailsLoading = false;
      state.foodMenuDatailsError = undefined;
      const totalFoodArr = [
        {
          type: breakfast,
          food: action.payload?.foodMenus[0]?.breakfast,
          img_url: MonthImages.breakfastImgS,
        },
        {
          type: lunch,
          food: action.payload?.foodMenus[0]?.lunch,
          img_url: MonthImages.Lunch,
        },
        {
          type: snacks,
          food: action.payload?.foodMenus[0]?.eveningSnack,
          img_url: MonthImages.snacksS,
        },
      ];

      const data = {...action.payload, foodMenus: totalFoodArr};
      state.dailyMenuID = action.payload?.foodMenus[0]?.dailyMenuId || '';
      state.leaveMenuDetails = data;
    });

    builder.addCase(getTodayMenuDetails.rejected, (state, action) => {
      state.menuDetailsLoading = false;
      state.leaveMenuDetails = {};
      state.foodMenuDatailsError = action.payload;
    });

    // builder.addCase(getLeaveDetails.pending, (state, action) => {
    //   state.isLeaveDataLoading = true;
    // });

    builder.addCase(getLeaveDetails.fulfilled, (state, action) => {
      const reversedLeaves = action.payload.slice().reverse();

      state.isLeaveDataLoading = false;
      // const dataWithId = action.payload.map(item => ({...item, id: uuidv4()}));

      state.leavesData = reversedLeaves;
      state.leavesDataError = undefined;
    });

    // builder.addCase(getLeaveDetails.rejected, (state, action) => {
    //   state.isLeaveDataLoading = false;
    //   state.leavesData = [];
    //   state.leavesDataError = action.payload;
    // });

    //fgfgfg
    builder.addCase(getConfigData.fulfilled, (state, action) => {
      state.configData = action.payload;
    });
    builder.addCase(getEmployeeProfileData.pending, state => {
      state.employeeProfileLoading = true;
    });
    builder.addCase(getEmployeeProfileData.fulfilled, (state, action) => {
      state.employeeProfileLoading = false;
      state.employeeProfile = action.payload;
      state.employeeProfileError = undefined;
    });
    builder.addCase(getEmployeeProfileData.rejected, (state, action) => {
      state.employeeProfileLoading = false;
      state.employeeProfile = {};
      state.employeeProfileError = action.payload;
    });
    // builder.addCase(getCalendereventData.pending, state => {
    //   state.calendereventDataLoading = true;
    // });
    // builder.addCase(getCalendereventData.fulfilled, (state, action) => {
    //   // state.calendereventDataLoading = false;
    //   state.calendereventData = {};
    //   state.calendereventDataError = undefined;
    // });
    // builder.addCase(getCalendereventData.rejected, (state, action) => {
    //   state.calendereventDataLoading = false;
    //   state.calendereventData = {};
    //   state.calendereventDataError = action.payload;
    // });
    builder.addCase(getAttendencaeData.pending, state => {
      state.attendenceDataPending = true;
    });
    builder.addCase(getAttendencaeData.fulfilled, (state, action) => {
      state.attendenceDataPending = false;
      state.attendenceData = action.payload;
      state.attendenceDataError = undefined;
    });
    builder.addCase(getAttendencaeData.rejected, (state, action) => {
      state.attendenceDataPending = false;
      state.attendenceData = [];
      state.attendenceDataError = action.payload;
    });
    // request lunch integration
    builder.addCase(requestLunchSubmission.pending, state => {
      state.requestLunchDataPending = true;
    });
    builder.addCase(requestLunchSubmission.fulfilled, (state, action) => {
      state.requestLunchDataPending = false;
      state.requestLunchData = action.payload;
      state.requestLunchDataError = undefined;
    });
    builder.addCase(requestLunchSubmission.rejected, (state, action) => {
      state.requestLunchDataPending = false;
      state.requestLunchData = [];
      state.requestLunchDataError = action.payload;
    });
  },
});

export default homeSlice.reducer;
export const {
  modalStatus,
  dateOfModal,
  setRecentAppliedLeaves,
  setRemainingLeaves,
  setFromNavigatedScreen,
  homeReset,
} = homeSlice.actions;
