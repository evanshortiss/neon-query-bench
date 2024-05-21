import { test } from "node:test"
import assert from "node:assert"
import getBenchmarkInstance from "../../src"

test('integration test (requires a database connection string)', async (t) => {
  const NQB_API_KEY = 'foo'
  
  const {
    runner,
    version,
    neonRegion
  } = getBenchmarkInstance({
    NQB_API_KEY,
    NQB_DATABASE_URL: process.env.NQB_DATABASE_URL
  })

  const { queryTimes } = await runner({
    apiKey: NQB_API_KEY,
    count: 3
  })

  assert(typeof neonRegion === 'string')
  assert(queryTimes.length === 3)
})
