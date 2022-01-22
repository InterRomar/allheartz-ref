import { Handler } from 'express';
import HTTP_STATUS_CODES from 'http-status-codes';

const readDeviceId: Handler = async (req, res, next) => {
  try {
    const deviceId = req.headers['device-id'] as string || '';

    if (!deviceId) {
      return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json([{
        path: 'headers.device-id',
        message: 'Missed device id',
        type: 'missed',
      }]);
    }

    req.deviceId = deviceId;

    next();
  } catch (err) {
    next(err);
  }
};

export default readDeviceId;
