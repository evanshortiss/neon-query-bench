import { test } from "node:test"
import assert from "node:assert"
import getBenchmarkInstance, { QueryRecordPayload } from "../../src"

test('integration test (requires a database connection string)', async (t) => {
  const NQB_API_KEY = 'foo'
  
  const {
    runner,
    platform
  } = getBenchmarkInstance({
    NQB_API_KEY,
    NQB_DATABASE_URL: process.env.NQB_DATABASE_URL
  })

  const { neonRegion, queryTimes, results } = await runner({
    apiKey: NQB_API_KEY,
    count: 3
  })

  assert(typeof neonRegion === 'string')
  assert(queryTimes.length === 3)
  assert(results.length !== 0)
})
