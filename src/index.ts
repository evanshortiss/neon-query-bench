import { getConfig } from "./config";
import { getPlatformUtils } from "./platform";
import { getQueryRunner } from "./query";
import { getRecorder } from "./record";

export default function getBenchmarkInstance (env: Record<string, string|undefined>) {
  const config = getConfig(env)

  const platform = getPlatformUtils(env)
  const runner = getQueryRunner(config)
  const recorder = getRecorder(config)

  return {
    platform, runner, recorder
  }
}
