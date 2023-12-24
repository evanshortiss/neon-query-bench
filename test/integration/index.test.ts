import { test } from "node:test"
import assert from "node:assert"
import getBenchmarkInstance from "../../src"

test('integration test (requires a database connection string)', async (t) => {
  const {
    runner,
    platform,
    recorder
  } = getBenchmarkInstance(process.env)

  const result = await runner(3)

  assert(typeof result.neonRegion === 'string')
  assert(result.queryTimes.length === 3)
  assert(result.results.length !== 0)

  recorder({
    platformName: platform.getPlatformName(),
    platformRegion: platform.getPlatformRegion(),
    queryRunnerResult: result
  })
})
