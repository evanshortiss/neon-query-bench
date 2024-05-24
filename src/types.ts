export type EnvLike = Record<string, string|undefined>

export type ApplicationConfig = {
  API_KEY?: string;
  DATABASE_URL: string;
};

export type PlatformName = 'fly'|'vercel'|'cloudflare'|'railway'|'digitalocean'

// https://docs.railway.app/reference/deployment-regions
export const RailwayRegionIds = ['us-west1','us-east4','europe-west4','asia-southeast1']

// https://docs.digitalocean.com/products/app-platform/details/availability/
export const DigitalOceanAppPlatformRegionIds = ['nyc', 'ams', 'sfo', 'sgp', 'lon', 'fra', 'tor', 'blr', 'syd']

export type QueryRunnerResult = {
  queryTimes: { start: number, end: number }[]
}

export type QueryRunnerMetadata = {
  platformName: PlatformName,
  platformRegion: string,
  neonRegion: string,
  version: string
}
