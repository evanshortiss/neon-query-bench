import { from } from "env-var";
import { ApplicationConfig } from "./types";

export function getConfig(env: NodeJS.ProcessEnv): ApplicationConfig {
  const { get } = from(env);

  return {
    API_KEY: get("NQB_API_KEY").asString(),
    DATABASE_URL: get("NQB_DATABASE_URL").required().asUrlString()
  };
}
