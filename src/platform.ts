import { DigitalOceanAppPlatformRegionIds, EnvLike, PlatformName, RailwayRegionIds } from "./types"

export function getPlatformUtils (env: EnvLike) {
  return {
    /**
     * Returns the platform on which this benchmark is running.
     * @param {EnvLike} env
     */
    getPlatformName (): PlatformName {
      const global = globalThis as any

      if (typeof global?.process !== 'undefined' && typeof global.process.env !== 'undefined') {
        // Checking for the existence of process.env to verify that the runrime is not a cloudflare worker
        const {
          VERCEL_ENV, VERCEL_REGION,
          FLY_REGION, FLY_ALLOC_ID,
          RAILWAY_PROJECT_NAME,
          NQB_DO_REGION
        } = env

        if (VERCEL_ENV && VERCEL_REGION) {
          return 'vercel'
        } else if (FLY_REGION && FLY_ALLOC_ID) {
          return 'fly'
        } else if (RAILWAY_PROJECT_NAME) {
          return 'railway'
        } else if (NQB_DO_REGION) {
          return 'digitalocean'
        } else {
          throw new Error('unable to determine hosting platform from environment')
        }
      } else {        
        // https://developers.cloudflare.com/workers/runtime-apis/cache/
        if (typeof global?.WebSocketPair !== 'undefined' && typeof global?.cache.default !== 'undefined') {
          return 'cloudflare'
        }

        throw new Error('unable to determine hosting platform')
      }
    },
    
    /**
     * Returns the platform region string.
     * Usually this is exposed as an environment variable on each platform.
     * @param {EnvLike} env 
     */
    getPlatformRegion (): string {
      const platformName = this.getPlatformName()

      if (platformName === 'cloudflare') {
        throw new Error('use "request.cf.colo" to obtain the cloudflare worker region')
      }

      const regionEnvMap = {
        'vercel': 'VERCEL_REGION',
        'fly': 'FLY_REGION',
        'railway': 'NQB_RAILWAY_REGION',
        'digitalocean': 'NQB_DO_REGION'
      }

      const targetVariable = regionEnvMap[platformName]

      if (!env[targetVariable]) {
        throw new Error(`failed to determine region for platform ${platformName}. the ${targetVariable} environment variable is not set`)
      }

      const region = env[targetVariable]

      if (!region) {
        throw new Error(`failed to determine region for platform ${platformName}`)
      }

      if (platformName === 'railway') {
        if (RailwayRegionIds.includes(region)) {
          return region
        } else {
          throw new Error(`invalid region "${region}" for platform railway. valid regions are: ${RailwayRegionIds.join(', ')}`)
        }
      }

      if (platformName === 'digitalocean') {
        if (DigitalOceanAppPlatformRegionIds.includes(region)) {
          return region
        } else {
          throw new Error(`invalid region "${region}" for platform digitalocean. valid regions are: ${DigitalOceanAppPlatformRegionIds.join(', ')}`)
        }
      }

      return region
    }
  }
}

