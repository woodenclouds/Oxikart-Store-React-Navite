const initialState = {
  isVerified: false,
  token: null,
  username: '',
  role: '',
  user_id: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        isVerified:
          action.payload.isVerified !== undefined
            ? action.payload.isVerified
            : state.isVerified,
        token:
          action.payload.token !== undefined
            ? action.payload.token
            : state.token,
        username:
          action.payload.username !== undefined
            ? action.payload.username
            : state.username,
        role:
          action.payload.role !== undefined ? action.payload.role : state.role,
        user_id:
          action.payload.user_id !== undefined
            ? action.payload.user_id
            : state.user_id,
      };
    case 'RESET_USER':
      return initialState; // Reset the state to the initial state
    default:
      return state;
  }
}

export default userReducer;
