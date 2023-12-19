import { from } from "env-var";

export type ApplicationConfig = {
  DATABASE_URL: string;
};

export function getConfig(env: NodeJS.ProcessEnv): ApplicationConfig {
  const { get } = from(env);

  return {
    DATABASE_URL: get("DATABASE_URL").required().asUrlString(),
  };
}
