import { getConfig } from "./config";
import getDatabaseWrapper from "./db";
import { getPlatformUtils } from "./platform";
import { getQueryRunner } from "./query";
import { EnvLike } from "./types";
const { version } = require('../package.json')

export default function getBenchmarkInstance (env: EnvLike) {
  const config = getConfig(env)
  
  if (!config.API_KEY) {
    console.log('Environment parameters passed to Neon Query Bench did not contain an NQB_API_KEY. Consider adding an API Key for enhanced security.')
  }
  const neonRegion = new URL(config.DATABASE_URL).hostname.split(/\.([^]*)/)[1];
  const platform = getPlatformUtils(env)

  const runner = getQueryRunner(
    config,
    getDatabaseWrapper(config.DATABASE_URL, platform.getPlatformName() === 'vercel' ? 'http' : 'ws')
  )

  return {
    platform, runner, version, neonRegion
  }
}

export * from './types'
