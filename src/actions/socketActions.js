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

export const GAME_STARTED = 'GAME_STARTED';
export const gameStarted = (startRound, userId) => ({
  type: GAME_STARTED,
  payload: { startRound, userId }
});

export const GUEST_ANSWERED = 'GUEST_ANSWERED';
export const guestAnswered = (guess) => ({
  type: GUEST_ANSWERED,
  payload: guess
});

export const CORRECTLY_ANSWERED = 'CORRECTLY_ANSWERED';
export const correctylyAnswered = (answer, nickname) => ({
  type: CORRECTLY_ANSWERED,
  payload: { answer, nickname }
});
