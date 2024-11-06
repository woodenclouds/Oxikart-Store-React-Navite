export const SET_USER_INFO = 'SET_USER_INFO';
export const RESET_USER = 'RESET_USER';

export const setUserInfo = userInfo => ({
  type: SET_USER_INFO,
  payload: userInfo,
});

export const resetUser = () => ({
  type: RESET_USER,
});
