import { describe, it } from "node:test"
import assert, { fail } from "node:assert"
import { getPlatformUtils } from "../../src/platform"

describe('getPlatformUtils', () => {
  it('should detect vercel and vercel region', () => {
    const utils = getPlatformUtils({
      VERCEL_ENV: 'production',
      VERCEL_REGION: 'iad1'
    })

    const name = utils.getPlatformName()

    assert(name === 'vercel')
    assert(utils.getPlatformRegion() === 'iad1')
  })

  it('should detect fly and fly region', () => {
    const utils = getPlatformUtils({
      FLY_REGION: 'bos',
      FLY_ALLOC_ID: 'ebfe84f4-834e-4fa2-8453-5c8fd4fb041a'
    })

    const name = utils.getPlatformName()

    assert(name === 'fly')
    assert(utils.getPlatformRegion() === 'bos')
  })

  it('should throw an error due to running on an unidentified platform', () => {
    const utils = getPlatformUtils({})

    try {
      const name = utils.getPlatformName()
      fail('an error should have been thrown')
    } catch (e) {
      assert(e instanceof Error)
      assert(e.message.includes('unable to determine hosting platform'))
    }
  })

  it('should throw an error due to a missing NQB_RAILWAY_REGION variable', () => {
    const utils = getPlatformUtils({
      RAILWAY_PROJECT_NAME: 'my-project'
    })

    try {
      const name = utils.getPlatformRegion()
      fail('an error should have been thrown')
    } catch (e) {
      assert(e instanceof Error)
      assert(e.message.includes('failed to determine region for platform railway. the NQB_RAILWAY_REGION environment variable is not set'))
    }
  })

  it('should return the railway region', () => {
    const NQB_RAILWAY_REGION = 'us-west1'
    const utils = getPlatformUtils({
      RAILWAY_PROJECT_NAME: 'my-project',
      NQB_RAILWAY_REGION
    })

    assert(utils.getPlatformRegion() === NQB_RAILWAY_REGION)
  })

  it('should throw an error due to invalid railway region id', () => {
    const NQB_RAILWAY_REGION = 'us-foo2' // this is not a valid region id
    const utils = getPlatformUtils({
      RAILWAY_PROJECT_NAME: 'my-project',
      NQB_RAILWAY_REGION
    })

    try {
      const name = utils.getPlatformRegion()
      fail('an error should have been thrown')
    } catch (e) {
      assert(e instanceof Error)
      assert(e.message.includes(`invalid region "${NQB_RAILWAY_REGION}" for platform railway`))
    }
  })

  describe('digitalocean', () => {
    it('should return the railway region', () => {
      const NQB_DO_REGION = 'nyc'
      const utils = getPlatformUtils({
        NQB_DO_REGION
      })
  
      assert(utils.getPlatformRegion() === NQB_DO_REGION)
    })
  
    it('should throw an error due to invalid digital ocean region id', () => {
      const NQB_DO_REGION = 'dub1' // this is not a valid region id
      const utils = getPlatformUtils({
        NQB_DO_REGION
      })
  
      try {
        const name = utils.getPlatformRegion()
        fail('an error should have been thrown')
      } catch (e) {
        assert(e instanceof Error)
        assert(e.message.includes(`invalid region "${NQB_DO_REGION}" for platform digitalocean`))
      }
    })
  })
})
