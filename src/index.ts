import { getConfig } from "./config";
import { getPlatformUtils } from "./platform";
import { getQueryRunner } from "./query";
import { getRecorder } from "./record";

export default function getBenchmarkInstance (params: Record<string, string|undefined>) {
  const config = getConfig(params)

  const platform = getPlatformUtils(params)
  const runner = getQueryRunner(config)
  const recorder = getRecorder(config)

  return {
    platform, runner, recorder
  }
}
