import 'express-session';
import { SiweSession } from '../modules/auth/interfaces/siwe-session.interface.js';

declare module 'express-session' {
  interface SessionData {
    siweNonce?: string;
    siwe?: SiweSession;
  }
}

declare global {
  namespace Express {
    interface Request {
      siwe?: SiweSession;
    }
  }
}

export {};
