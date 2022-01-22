/* eslint-disable no-unused-vars */
import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      // guest?: EntityDataType<GuestEntitiy>;
      // admin?: EntityDataType<AdminEntitiy>;
      // location?: EntityDataType<LocationEntity>;
      deviceId: string;
    }
  }
}
