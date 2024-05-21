import { describe, it } from "node:test"
import assert from "node:assert"
import getBenchmarkInstance from "../../src"

describe('module', () => {
  it('should instantiate and expose version, platform, and runner properties', () => {
    const env = {
      // Fake vercel environment variables
      VERCEL_ENV: 'production',
      VERCEL_REGION: 'iad1',
      // Module specific environment variables
      NQB_API_KEY: 'foo',
      NQB_DATABASE_URL: 'postgres://localhost:5432'
    }
    
    const {
      version,
      runner,
      platform
    } = getBenchmarkInstance(env)

    assert(require('semver').valid(version))
    assert(typeof runner === 'function')
    assert(typeof platform.getPlatformName() === 'string')
    assert(typeof platform.getPlatformRegion() === 'string')
  })
})
