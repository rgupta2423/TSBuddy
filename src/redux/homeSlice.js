import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {employeeData} from '../../db';
import {holidayDatawithImage} from '../../db';
import {salaryData} from '../../slaryData';
import endPoints from '../config';
import axios from 'axios';
// import {v4 as uuidv4} from 'uuid';

const initialState = {
  isLoading: true,
  isShowModal: false,
  salarySlipData: [],
  salarySlipDataLoading: false,
  salarySlipDataError: false,
  employeeData: {},
  employeeDataLoading: false,
  employeeDataError: false,
  holidayData: {},
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
  attendenceData: {},
  attendenceDataError: false,
  recentAppliedLeaves: [],
  remainingLeaves: [],
  foodMenuDatails: [],
  menuDetailsLoading: false,
  foodMenuDatailsError: null,
  menuFeedback: {},
};

// =============================================

export const getMenuFeedback = createAsyncThunk(
  'dataReducer/menuFeedback',
  async token => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const feedback = await axios.get(
        endPoints.getMenuFeedbackTotalCount,
        config,
      );

      return Promise.resolve(feedback.data);
    } catch (err) {
      console.log('err:', err);
    }
  },
);
// =============================================

// ============================================================================================

// your userSlice with other reducers

export const getTodayMenuDetails = createAsyncThunk(
  'dataReducer/menuDetails',
  async token => {
    var config = {
      method: 'get',
      url: endPoints.getTodayMenuGet,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    // try {
    //   const menuDetails = await axios.get(endPoints.getTodayMenuGet, config);

    //   return Promise.resolve(menuDetails);
    // } catch (err) {
    //   let statusCode = 500;
    //   if (err?.response) {
    //     statusCode = err?.response?.status;
    //   }
    //   if (statusCode == 401) {
    //     return Promise.reject(err?.response?.data?.message);
    //   } else {
    //     return Promise.reject(new Error(err));
    //   }
    // }

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

// ============================================================================================

export const getHolidaysData = createAsyncThunk(
  'dataReducer/holidayData',
  async token => {
    var config = {
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

// ========================================================================================

export const getLeaveDetails = createAsyncThunk(
  'home/getWalkThroughList',
  async ({token, employeeID}) => {
    var config = {
      method: 'get',
      url: `${endPoints.leaveDetails}${employeeID}`,
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

export const getEmployeeProfileData = createAsyncThunk(
  'dataReducer/employeeProfile',
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
        if (statusCode == 401) {
          return Promise.reject(err?.response?.data?.message);
        } else {
          return Promise.reject(new Error(err));
        }
      });
  },
);

export const getCalendereventData = createAsyncThunk(
  'dataReducer/getCalendereventData',
  async token => {
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
  'dataReducer/getAttendencaeData',
  async ({token, employeeID, visisbleMonth, visibleYear}) => {
    var config = {
      method: 'get',
      url: `${endPoints.attendenceAPI}${employeeID}&month=${5}&year=${2018}`,
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
  async () => {
    return Promise.resolve(salaryData);
    //  fetch('http://localhost:4000/salaryData')
    //     .then(res => {
    //       res.json();
    //     })
    //     .then(result => {
    //       return Promise.resolve(result);
    //     })
    //     .catch(err => {
    //       return Promise.reject(err);
    //     });
    //   return Promise.resolve(salaryData);
  },
);

export const getEmployeeData = createAsyncThunk(
  'dataReducer/employeeData',
  async token => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const allEmployees = await axios.get(endPoints.getAllEmployees, config);

      return Promise.resolve(allEmployees.data);
    } catch (err) {
      console.log('err:', err);
    }
  },
);

export const getholidayDataIWithImage = createAsyncThunk(
  'dataReducer/holidayDataIWithImage',
  async () => {
    return Promise.resolve(holidayDatawithImage);
  },
);

const homeSlice = createSlice({
  name: 'dataa',
  initialState,
  reducers: {
    loadingStatus: (state, action) => {
      state.isLoading = action.payload;
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
  },
  extraReducers: builder => {
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

    // builder.addCase(getTodayMenuDetails.pending, state => {
    //   state.menuDetailsLoading = true;
    // });

    // builder.addCase(getTodayMenuDetails.fulfilled, (state, action) => {
    //   state.menuDetailsLoading = false;
    //   state.foodMenuDatails = action.payload;
    //   state.foodMenuDatailsError = undefined;
    // });

    // builder.addCase(getTodayMenuDetails.rejected, (state, action) => {
    //   state.menuDetailsLoading = false;
    //   state.foodMenuDatails = [];
    //   state.foodMenuDatailsError = action.payload;
    // });

    builder.addCase(getLeaveDetails.pending, (state, action) => {
      state.isLeaveDataLoading = true;
    });
    builder.addCase(getLeaveDetails.fulfilled, (state, action) => {
      state.isLeaveDataLoading = false;
      // const dataWithId = action.payload.map(item => ({...item, id: uuidv4()}));

      state.leavesData = action.payload;
      state.leavesDataError = undefined;
    });
    builder.addCase(getLeaveDetails.rejected, (state, action) => {
      state.isLeaveDataLoading = false;
      state.leavesData = [];
      state.leavesDataError = action.payload;
    });
    builder.addCase(getholidayDataIWithImage.pending, state => {
      state.holidayDataWithImageLoading = true;
    });
    builder.addCase(getholidayDataIWithImage.fulfilled, (state, action) => {
      state.holidayDataWithImageLoading = false;
      state.holidayDataIWithImage = action.payload;
      state.holidayDataWithImageError = undefined;
    });
    builder.addCase(getholidayDataIWithImage.rejected, (state, action) => {
      state.holidayDataWithImageLoading = false;
      state.holidayDataIWithImage = [];
      state.holidayDataWithImageError = action.payload;
    });

    //fgfgfg
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
      state.employeeProfile = [];
      state.employeeProfileError = action.payload;
    });
    builder.addCase(getCalendereventData.pending, state => {
      state.calendereventDataLoading = true;
    });
    builder.addCase(getCalendereventData.fulfilled, (state, action) => {
      state.calendereventDataLoading = false;
      state.calendereventData = action.payload;
      state.calendereventDataError = undefined;
    });
    builder.addCase(getCalendereventData.rejected, (state, action) => {
      state.calendereventDataLoading = false;
      state.calendereventData = [];
      state.calendereventDataError = action.payload;
    });
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
  },
});

export default homeSlice.reducer;
export const {
  loadingStatus,
  modalStatus,
  dateOfModal,
  setRecentAppliedLeaves,
  setRemainingLeaves,
} = homeSlice.actions;
