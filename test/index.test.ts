import { test } from "node:test"
import assert from "node:assert"
import { getQueryRunner } from "../src"

test('', async (t) => {
  const result = await getQueryRunner(process.env)(3)

  assert(typeof result.neonRegion === 'string')
  assert(result.queryTimes.length === 3)
  assert(result.results.length !== 0)
})
