export function sendSuccess(res, { status = 200, data, meta } = {}) {
  return res.status(status).json({
    data,
    ...(meta ? { meta } : {})
  });
}

export function sendError(res, { status, code, message, requestId, details }) {
  return res.status(status).json({
    error: {
      code,
      message,
      requestId,
      ...(details ? { details } : {})
    }
  });
}
