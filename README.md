# Next.js Passport OAuth Example

Next.js Passport example havily insipired by [andycmaj/nextjs-passport-session-auth](https://github.com/andycmaj/nextjs-passport-session-auth) with [flow-middleware](https://github.com/piglovesyou/flow-middleware) integration.

## Features

* [flow-middleware](https://github.com/piglovesyou/flow-middleware) lets you use any [Express middlewares](https://github.com/rajikaimal/awesome-express#middleware)
* `withIdentity` HOC resolves `user` information on any `PageComponents` (I extended @andycmaj's to make it work with any session middlewares)
* Ready to use [appConfig.ts](https://github.com/piglovesyou/nextjs-passport-oauth-example/blob/master/lib/appConfig.ts#L20-L30), thanks to @andycmaj

## How to use

Set required environment variables. Use `.env.template` if you use a dotenv tool.

```
export GITHUB_CLIENTID=<your github app's client id>
export GITHUB_CLIENTSECRET=<your github app's client secret>
```

Install it and run:

```bash
yarn
yarn dev
```
