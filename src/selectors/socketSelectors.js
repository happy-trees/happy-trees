export const getSocketState = state => state.socket;
export const getIsDrawing = state => getSocketState(state).isDrawing;
export const getGameId = state => getSocketState(state).gameId;
