import { getConfig } from "./config";
import { getPlatformUtils } from "./platform";
import { getQueryRunner } from "./query";
import { EnvLike } from "./types";

export default function getBenchmarkInstance (env: EnvLike) {
  const config = getConfig(env)
  
  if (!config.API_KEY) {
    console.log('Environment parameters passed to Neon Query Bench did not contain an NQB_API_KEY. Consider adding an API Key for enhanced security.')
  }

  const platform = getPlatformUtils(env)
  const runner = getQueryRunner(config)


  return {
    platform, runner
  }
}

export * from './types'
