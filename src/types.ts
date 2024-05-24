import { User } from "./schema";

export type EnvLike = Record<string, string|undefined>

export type ApplicationConfig = {
  API_KEY?: string;
  DATABASE_URL: string;
};

export type PlatformName = 'fly'|'vercel'|'cloudflare'|'railway'|'digitalocean'

// https://docs.railway.app/reference/deployment-regions
export const RailwayRegionIds = ['us-west1','us-east4','europe-west4','asia-southeast1']

// https://docs.digitalocean.com/platform/regional-availability/
export const DigitalOceanRegionIds = ['nyc1','nyc3','sfo2','sfo3','ams3','sgp1','lon1','fra1','tor1','blr1','syd1']

export type QueryRunnerResult = {
  queryTimes: { start: number, end: number }[]
}

export type QueryRunnerMetadata = {
  platformName: PlatformName,
  platformRegion: string,
  neonRegion: string,
  version: string
}
