import passport from '../../../lib/passport'
import middlewares from "../../../lib/middlewares";

export default function handle(req, res) {
  middlewares(
      passport.authenticate(req.query.provider)
  )()(req, res);
}
