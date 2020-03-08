import { compose } from 'flow-middleware';
import cookieSession from "cookie-session";
import passport from "./passport";

const composePassport = compose(
    cookieSession({
      name: 'passportSession',
      signed: false,
      maxAge: 24 * 60 * 60 * 1000,
    }),
    passport.initialize(),
    passport.session(),
);

export default composePassport;

const initializePassport = composePassport();

export { initializePassport }
