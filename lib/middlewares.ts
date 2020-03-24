import { compose } from 'flow-middleware';
import cookieSession from "cookie-session";
import passport from "./passport";

const middlewares = compose(
    cookieSession({
      name: 'passportSession',
      signed: false,
      maxAge: 24 * 60 * 60 * 1000,
    }),
    passport.initialize(),
    passport.session(),
);

export default middlewares;

export const initialize = middlewares();

