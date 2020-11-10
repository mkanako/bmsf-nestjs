enum NODE_ENVS {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

const env = process.env.NODE_ENV || NODE_ENVS.DEVELOPMENT

if (!Object.values(NODE_ENVS).includes(env as NODE_ENVS)) {
  throw new Error('invalid "NODE_ENV" : ' + env)
}

export default () => ({
  port: parseInt(process.env.APP_PORT || '8000'),
  isDev: Object.is(env, NODE_ENVS.DEVELOPMENT),
  isProd: Object.is(env, NODE_ENVS.PRODUCTION),
  isTest: Object.is(env, NODE_ENVS.TEST),
  env,
})
