import { NextPage } from "next";
import React from 'react'
import { identifyUser } from "../../lib/withIdentity";
import redirect from 'micro-redirect';

const homePage = '/';

const Login: NextPage = () => (
  <main>
    <p>Log in to use</p>
    <p>
      <a href="/api/auth/github">Sign in with github</a>
    </p>
  </main>
)

Login.getInitialProps = async (ctx) => {
  const user = await identifyUser(ctx);
  if (user) redirect(ctx.res, 302, homePage);
  return {};
}

export default Login
