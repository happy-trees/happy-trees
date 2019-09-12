export const RECEIVE_STROKE = 'RECEIVE_STROKE';
export const receiveStroke = data => ({
  type: RECEIVE_STROKE,
  payload: data
});

export const EMIT_STROKE = 'EMIT_STROKE';
export const emitStroke = data => ({
  type: EMIT_STROKE,
  payload: data
});
