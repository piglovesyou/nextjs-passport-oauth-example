import React, { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage, } from 'next';
import { UserIdentity } from './types';

const loginPage = '/auth/login';

const IdentityContext = React.createContext<UserIdentity>(
    (null as unknown) as UserIdentity
);

/**
  Setup every page that requirs authentication

  1. Wrap page component with the HOC "withIdentity()"

  export default withIdentity(() => (...));

  2. Wrap "getServerSideProps" with "authenticate()"

  export const getServerSideProps: GetServerSideProps = authenticate(() => (...));
 */

export const authenticate = (getServerSidePropsInner: GetServerSideProps = async () => ({ props: {} })) => {

  const getServerSideProps: GetServerSideProps = async (ctx) => {
    const [ req, res ] = await require('./composePassport').initializePassport(ctx.req, ctx.res);
    if (!req.user) {
      res.redirect(loginPage);
      return { props: {} };
    }
    const user = req.user;

    const result = await getServerSidePropsInner(ctx);

    return {
      ...result,
      props: {
        user,
        ...result.props,
      }
    };
  };
  return getServerSideProps;
};

export const withIdentity = (PageComponent: NextPage) => {

  const WithIdentity = (props) => {
    const { user, ...appProps } = props;
    useEffect(() => {
      if (!user) location.href = loginPage;
    });
    return (
        <IdentityContext.Provider value={ user }>
          <PageComponent { ...appProps } />
        </IdentityContext.Provider>
    );
  };

  WithIdentity.displayName = `WithIdentity(${ PageComponent.displayName })`;

  return WithIdentity;
};

export const useIdentity = (): UserIdentity => useContext(IdentityContext);
