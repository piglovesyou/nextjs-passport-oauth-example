import React, { useContext } from 'react';
import { AppInitialProps } from 'next/app';
import { NextPage, } from 'next';
import redirect from 'micro-redirect';

export interface UserIdentity {
  id: number
  name: string
  email: string
}

type IdentityProviderProps = Readonly<AppInitialProps> & {
  user?: UserIdentity
}

const IdentityContext = React.createContext<UserIdentity>(
    (null as unknown) as UserIdentity
);

const loginPage = '/auth/login';

export async function identifyUser(ctx): Promise<UserIdentity | null> {
  const isSSR = Boolean(ctx.req);
  if (isSSR) {
    const composePassport = require('./composePassport');
    const [ proxiedReq ] = await composePassport.initializePassport(ctx.req, ctx.res);
    if (!proxiedReq.user) return null;
    return proxiedReq.user;
  } else {
    // Reuse initial identity result
    const nextData = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
    return nextData.props.pageProps.user;
  }
}

// any is needed to use as JSX element
const withIdentity = (PageComponent: NextPage | any) => {
  return class IdentityProvider extends React.Component<IdentityProviderProps> {
    static displayName = `IdentityProvider(MyApp)`;

    static async getInitialProps(ctx): Promise<IdentityProviderProps> {

      // Get inner app's props
      let appProps: AppInitialProps;
      if (PageComponent.getInitialProps) {
        appProps = await PageComponent.getInitialProps(ctx);
      } else {
        appProps = { pageProps: {} };
      }

      const user = await identifyUser(ctx);
      if (!user) redirect(ctx.res, 302, loginPage);

      return {user,  ...appProps };
    }

    render() {
      const { user, ...appProps } = this.props;

      return (
          <IdentityContext.Provider value={ user }>
            <PageComponent { ...appProps } />
          </IdentityContext.Provider>
      );
    }
  };
};

export default withIdentity;

export const useIdentity = (): UserIdentity => useContext(IdentityContext);
