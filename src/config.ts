import { from } from "env-var";
import { ApplicationConfig } from "./types";

export function getConfig(env: NodeJS.ProcessEnv): ApplicationConfig {
  const { get } = from(env);

  return {
    API_KEY: get("API_KEY").asString(),
    DATABASE_URL: get("DATABASE_URL").required().asUrlString(),
    RECORDER_URL: get('RECORDER_URL').required().asUrlString(),
    RECORDER_API_KEY: get('RECORDER_API_KEY').required().asString(),
    RECORDER_REQUEST_TIMEOUT: get('RECORDER_REQUEST_TIMEOUT').default(10000).asIntPositive()    
  };
}
