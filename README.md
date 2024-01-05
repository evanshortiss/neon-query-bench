# Neon Query Bench

A utility for testing the latency required to perform a simple query against
a Neon Postgres database using the [@neondatabase/serverless](https://github.com/neondatabase/serverless)
driver, and for packaging the results into a standard format for consumption.

## Usage

The following environment variables are required:

* `NQB_DATABASE_URL` - Neon Postgres database connection string.
* `NQB_API_KEY` - An API Key used to prevent unauthenticated calls.

```ts
import { getBenchmarkInstance } from "neon-query-bench"

/**
 * Pass the "env" object on Cloudfalre Workers or "process.env" in Node.js
 * 
 * NQB_DATABASE_URL must be set to a Neon database connection string.
 * NQB_API_KEY can optionally be set to prevent unauthenticated queries.
 */
const { runner, platform } = getBenchmarkInstance(process.env)

// Example endpoint to call if you're using express to expose
// the runner as an HTTP endpoint
app.get('/', (req, res) => {
  // Run 5 (default value) benchmark queries in series against the database
  const {
    neonRegion,
    queryTimes,
    results
  } = await runner({
    // Pass an apiKey value along, but only if required
    apiKey: process.env.NQB_API_KEY ? req.get('x-api-key') : undefined,
    count: 5
  })

  // QueryRecordPayload is the structure expected by clients making the request
  const response: QueryRecordPayload = {
    queryRunnerResult: { neonRegion, queryTimes, results },
    platformName: platform.getPlatformName(),
    platformRegion: platform.getPlatformRegion()
  }

  res.json(response)
})
```
