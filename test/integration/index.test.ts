import { test } from "node:test"
import assert from "node:assert"
import getBenchmarkInstance from "../../src"

test('integration test (requires a database connection string)', async (t) => {
  const NQB_API_KEY = 'foo'
  
  const {
    runner,
    neonRegion
  } = getBenchmarkInstance({
    NQB_API_KEY,
    NQB_DATABASE_URL: process.env.NQB_DATABASE_URL,
    RAILWAY_PROJECT_NAME: 'foo',
    RAILWAY_REGION: 'us-west4'
    // VERCEL_ENV: 'production',
    // VERCEL_REGION: 'iad1'
  })

  const { queryTimes } = await runner({
    apiKey: NQB_API_KEY,
    count: 10
  })

  assert(typeof neonRegion === 'string')
  assert(queryTimes.length === 10)
  console.log(queryTimes.map(({ start, end }) => end - start))
})
