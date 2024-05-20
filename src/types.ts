import { User } from "./schema";

export type EnvLike = Record<string, string|undefined>

export type ApplicationConfig = {
  API_KEY?: string;
  DATABASE_URL: string;
};

export type PlatformName = 'fly'|'vercel'|'cloudflare'|'railway'

// https://docs.railway.app/reference/deployment-regions
export const RailwayRegionIds = ['us-west1','us-east4','europe-west4','asia-southeast1']

export type QueryRunnerResult = {
  neonRegion: string,
  queryTimes: { start: number, end: number }[]
  queryTimesCold: { start: number, end: number }[]
  queryTimesHot: { start: number, end: number }[]
}

export type QueryRecordPayload = {
  platformName: PlatformName,
  platformRegion: string,
  queryRunnerResult: QueryRunnerResult,
  version: string
}
