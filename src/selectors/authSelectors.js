export const getUserState = state => state.user;
export const getUserId = state => getUserState(state).userId;
export const getUserError = state => getUserState(state).error;
