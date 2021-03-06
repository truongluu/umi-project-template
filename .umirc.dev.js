// ref: https://umijs.org/config/
// noinspection RegExpSingleCharAlternation, SpellCheckingInspection
export default {
  define: {
    "process.env": {
      ...process.env,
      LOGIN_PAGE_BASE: '/user/login',
      AUTH_API: 'https://auth.dev/v1/auth/api'
    }

  }
}
