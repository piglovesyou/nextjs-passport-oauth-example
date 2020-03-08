import passport from '../../../lib/passport'
import composePassport from "../../../lib/composePassport";

export default function handle(req, res) {
  composePassport(
      passport.authenticate(req.query.provider)
  )()(req, res);
}
