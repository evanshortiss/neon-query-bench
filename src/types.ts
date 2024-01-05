import { User } from "./schema";

export type EnvLike = Record<string, string|undefined>

export type ApplicationConfig = {
  API_KEY?: string;
  DATABASE_URL: string;
};

export type PlatformName = 'fly'|'vercel'|'cloudflare'

export type QueryRunnerResult = {
  results: (typeof User.$inferSelect)[],
  neonRegion: string,
  queryTimes: { start: number, end: number }[]
}

export type QueryRecordPayload = {
  platformName: PlatformName,
  platformRegion: string,
  queryRunnerResult: QueryRunnerResult
}
