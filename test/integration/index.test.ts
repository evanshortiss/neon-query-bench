import { test } from "node:test"
import assert from "node:assert"
import getBenchmarkInstance from "../../src"

test('integration test (requires a database connection string)', async (t) => {
  const NQB_API_KEY = 'foo'
  
  const {
    runner
  } = getBenchmarkInstance({
    NQB_API_KEY,
    NQB_DATABASE_URL: process.env.NQB_DATABASE_URL
  })

  const { neonRegion, queryTimes, queryTimesCold, queryTimesHot } = await runner({
    apiKey: NQB_API_KEY,
    count: 3
  })

  assert(typeof neonRegion === 'string')
  assert(queryTimesHot.length === 3)
  assert(queryTimesCold.length === 3)

  // This is preserved for backwards compatibility
  assert(queryTimes.length === 3)
  assert(queryTimes === queryTimesCold)
})
