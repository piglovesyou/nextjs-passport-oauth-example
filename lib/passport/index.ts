import passport from 'passport'
import { Profile } from "passport-github";
import { UserIdentity } from "../withIdentity";
import github from './github'

passport.use(github)

export interface PassportSession {
  passport: { user: UserIdentity }
}

passport.serializeUser((user: Profile, done) => {
  const { id, displayName, username, profileUrl, photos } = user
  done(null, { id, displayName, username, profileUrl, photos })
})
passport.deserializeUser(async (serializedUser, done) => {
  if (!serializedUser) {
    return done(new Error(`User not found: ${serializedUser}`))
  }

  done(null, serializedUser)
})

export default passport;
