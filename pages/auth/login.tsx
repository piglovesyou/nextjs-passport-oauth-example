import React from 'react'
import { GetServerSideProps, NextPage } from "next";

const homePage = '/';

const Login: NextPage = () => (
  <main>
    <p>Log in to use</p>
    <p>
      <a href="/api/auth/github">Sign in with github</a>
    </p>
  </main>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [ req, res ] = await require('../../lib/composePassport').initializePassport(ctx.req, ctx.res);
  if (req.user) res.redirect(homePage);
  return {props: {}}
};

export default Login
