export const getSocketState = state => state.socket;
export const getIsDrawing = state => getSocketState(state).isDrawing;
export const getGameId = state => getSocketState(state).gameId;
export const getRoundId = state => getSocketState(state).roundId;
export const getIsPlaying = state => getSocketState(state).isPlaying;
export const getGuesses = state => state.guesses;
