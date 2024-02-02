import React from 'react';
import {renewToken} from 'Auth/LoginSlice';
import axios from 'axios';
import {ERROR} from 'constants/strings';
import {days} from 'defaultData';
import CryptoJS from 'crypto-js';
import {View} from 'react-native';
import {Text} from 'react-native';

export const attendanceDate = val => {
  let today = new Date();
  let dayOfWeek = today.getDay();
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - dayOfWeek + val,
  );
};

export const startEndDateFormat = date => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
export const todaySelectedDate = () => {
  let today = new Date();
  const date = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
  let monthValue =
    today.getMonth() + 1 > 9
      ? today.getMonth() + 1
      : `0${today.getMonth() + 1}`;
  return `${today.getFullYear()}-${monthValue}-${date}`;
};
export const finalCurrentDate = () => {
  const date = new Date();
  const presentDate = String(date.getDate()).padStart(2, '0');
  const presentMonth = date.toLocaleString('default', {month: 'long'});
  const currentDayIndex = date.getDay();
  const currentDay = days[currentDayIndex];
  const finalTodayDate = `${presentDate}, ${presentMonth}`;
  return {currentDay, finalTodayDate};
};

export const openLeavesCount = function ({leaves}) {
  const openCount = {earnedOpen: 0, rhOpen: 0};
  if (leaves && leaves?.length) {
    for (let leaveData of leaves) {
      const {status, leaveType, totalLeaveDays} = leaveData || {};
      if (status?.toLowerCase() === 'open') {
        if (leaveType?.toLowerCase() === 'earned leave') {
          openCount.earnedOpen = openCount.earnedOpen + totalLeaveDays;
        }
        if (leaveType?.toLowerCase() === 'restricted holiday') {
          openCount.rhOpen = openCount.rhOpen + totalLeaveDays;
        }
      }
    }
  }
  return openCount;
};

export const lunchChargeMessage = function (amount, type) {
  return `You will be charged ₹${amount}/${
    type === 'monthly' ? 'Month' : 'Day'
  }.`;
};

export const centralizeApi = ({
  method = '',
  url,
  data,
  token,
  sendResp,
  refreshToken,
  dispatch,
}) => {
  let config = {
    method,
    url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  if (method.toLocaleLowerCase() === 'post') {
    config = {
      ...config,
      data,
    };
  } else if (method.toLocaleLowerCase() === 'get') {
    config = {
      ...config,
    };
  }
  return axios(config)
    .then(async response => {
      const {resp, status} = response;
      if (status === 200) {
        if (sendResp) {
          return Promise.resolve(resp);
        }
        return Promise.resolve(resp);
      } else {
        return Promise.reject(new Error(ERROR));
      }
    })
    .catch(err => {
      const errorMessage = err?.response?.data?.message;
      if (errorMessage?.toLowerCase() === 'token-expired') {
        dispatch(renewToken({token: refreshToken}));
        return Promise.reject(errorMessage);
      } else {
        let statusCode = 500;
        if (err?.response) {
          statusCode = err?.response.status;
        }
        if (statusCode === 401 || err?.response) {
          let message =
            err?.response?.data?.message ||
            err?.response?.data?.Message ||
            err?.response?.data?.title;
          return Promise.reject(message);
        } else {
          return Promise.reject(new Error(err));
        }
      }
    });
};

export const empFullName = (employee = {}) => {
  return `${employee?.firstName ? employee?.firstName + ' ' : ''}${
    employee?.middleName ? employee?.middleName + ' ' : ''
  }${employee?.lastName ? employee?.lastName + ' ' : ''}`;
};

export const getDateStringFromDateObject = date => {
  const day = date.getDate();
  const month = date.toLocaleString('default', {month: 'short'});
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const getDaysBetweenDates = (date1, date2) => {
  const timeDifference = date2.getTime() - date1.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  return Math.abs(Math.round(daysDifference));
};

export const getCurrentFiscalYear = () => {
  let currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  let fiscalYear = `${currentYear}-${new Date().getFullYear() + 1}`;

  if (currentMonth < 3) {
    fiscalYear = `${currentYear - 1}-${new Date().getFullYear()}`;
  }
  return fiscalYear;
};

export function sortByFiscalYear(date1, date2) {
  const a = new Date(date1?.holidayDate);
  const b = new Date(date2?.holidayDate);
  const fiscalYearA = a.getMonth() >= 3 ? a.getFullYear() : a.getFullYear() - 1;
  const fiscalYearB = b.getMonth() >= 3 ? b.getFullYear() : b.getFullYear() - 1;
  if (fiscalYearA < fiscalYearB) {
    return 1;
  } else if (fiscalYearA > fiscalYearB) {
    return -1;
  } else {
    return a.getTime() - b.getTime();
  }
}

export const sortArrayOfObjectsOnProperty = (arr, property) => {
  arr.length &&
    arr.sort((a, b) => {
      if (!a || !b) {
        return;
      }
      return a[property]?.localeCompare(b[property]);
    });

  return arr;
};

export function decryptData(encryptedData, decryptionKey) {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, decryptionKey);
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
}

export const renderNoLeaves = ({styles, message}) => {
  console.log('styles:', styles);
  return (
    <View style={styles?.noLeavesContainer}>
      <Text style={styles?.noLeavesText}>{message}</Text>
    </View>
  );
};

export function getDaysInMonth(monthIndex, year) {
  console.log('monthIndex:', monthIndex);
  const date = new Date(year, monthIndex - 1, 1);

  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);

  return date.getDate();
}

export const getUniqueArrayOfObjects = arr => {
  return arr.filter((obj, index, self) => {
    return index === self.findIndex(o => o.value === obj.value);
  });
};
export const getTimeStringFromObject = timeObj =>
  `${timeObj.getHours() > 9 ? timeObj.getHours() : '0' + timeObj.getHours()}:${
    timeObj.getMinutes() > 9 ? timeObj.getMinutes() : '0' + timeObj.getMinutes()
  }:${
    timeObj.getSeconds() > 9 ? timeObj.getSeconds() : '0' + timeObj.getSeconds()
  }`;
