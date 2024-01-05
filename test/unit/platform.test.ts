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
})
