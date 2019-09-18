export const BEGIN_LISTENING = 'BEGIN_LISTENING';
export const beginListening = () => ({
  type: BEGIN_LISTENING
});

export const END_LISTENING = 'END_LISTENING';
export const endListening = () => ({
  type: END_LISTENING
});

export const JOINED_GAME = 'JOINED_GAME';
export const joinedGame = (gameId) => ({
  type: JOINED_GAME,
  payload: gameId
});

export const WRONG_ANSWER = 'WRONG_ANSWER';
export const wrongAnswer = (answer, isUsersGuess) => ({
  type: WRONG_ANSWER,
  payload: { answer, isUsersGuess }
});

export const CORRECTLY_ANSWERED = 'CORRECTLY_ANSWERED';
export const correctylyAnswered = (answer, nickname) => ({
  type: CORRECTLY_ANSWERED,
  payload: { answer, nickname }
});

export const START_NEW_ROUND = 'START_NEW_ROUND';
export const startNewRound = (round, userId, drawer) => ({
  type: START_NEW_ROUND,
  payload: { round, userId, drawer }
});

export const ROUND_OVER = 'ROUND_OVER';
export const roundOver = () => ({
  type: ROUND_OVER
});
