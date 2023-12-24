import { EnvLike, PlatformName } from "./types"

export function getPlatformUtils (env: EnvLike) {
  return {
    /**
     * Returns the platform on which this benchmark is running.
     * @param {EnvLike} env
     */
    getPlatformName (): PlatformName {
      const global = globalThis as any

      if (typeof global?.process !== 'undefined' && typeof global.process.env !== 'undefined') {
        // Checking for the existence of process.env to verify
        // that this isn't a cloudflare worker
        const {
          VERCEL_ENV, VERCEL_REGION,
          FLY_REGION, FLY_ALLOC_ID
        } = env

        if (VERCEL_ENV && VERCEL_REGION) {
          return 'vercel'
        } else if (FLY_REGION && FLY_ALLOC_ID) {
          return 'fly'
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
     * Returns the platform region string. Usually this is exposed as en
     * environment variable on each platform.
     * @param {EnvLike} env 
     */
    getPlatformRegion (): string {
      const platformName = this.getPlatformName()

      if (platformName === 'cloudflare') {
        throw new Error('use "request.cf.colo" to obtain the cloudflare worker region')
      }

      const regionEnvMap = {
        'vercel': 'VERCEL_REGION',
        'fly': 'FLY_REGION'
      }

      const region = env[regionEnvMap[platformName]]

      if (!region) {
        throw new Error(`failed to determine region for platform ${platformName}`)
      }

      return region
    }
  }
}

