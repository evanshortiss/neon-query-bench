import { describe, it } from "node:test"
import assert from "node:assert"
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
})
