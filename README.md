# Neon Query Bench

A utility for testing the latency required to perform a simple query against
a Neon Postgres database using the [@neondatabase/serverless](https://github.com/neondatabase/serverless)
driver, and for packaging the results into a standard format for consumption.

## Usage

The following environment variables are required:

* `NQB_DATABASE_URL` - Neon Postgres database connection string.
* `NQB_API_KEY` - An API Key used to prevent unauthenticated calls.

Note, if you're deploying the module on Railway you need to set the
`NQB_RAILWAY_REGION` to one of the values listed on their deployment
[regions page](https://docs.railway.app/reference/deployment-regions#region-options),
since it's not automatically injected into a runtime environment variable.

```ts
import { getBenchmarkInstance } from "neon-query-bench"

/**
 * Pass the "env" object on Cloudfalre Workers or "process.env" in Node.js
 * 
 * NQB_DATABASE_URL must be set to a Neon database connection string.
 * NQB_API_KEY can optionally be set to prevent unauthenticated queries.
 */
const { runner, platform, version } = getBenchmarkInstance(process.env)

// Example endpoint to call if you're using express to expose
// the runner as an HTTP endpoint
app.get('/', (req, res) => {
  // Run 5 (default value) benchmark queries in series against the database
  const {
    // The region in which the Neon database tested against resides
    neonRegion,
    // Cold queries are the first set of queries executed. These can be
    // considered "cold" since the function just started up and had no
    // existing database connection established
    queryTimesCold,
    // Hot queries are a second set of queries executed. Generally speaking
    // these queries will have better performance since the process is 
    // "warm" and already has a database connection established
    queryTimesHot
  } = await runner({
    // Pass an apiKey value along, but only if required
    apiKey: process.env.NQB_API_KEY ? req.get('x-api-key') : undefined,
    // Number of queries to perform for both hot and cold runs
    count: 5
  })

  // QueryRecordPayload is the structure expected by clients making the request
  // The "queryTimes" is the same as the "queryTimesCold", for backwards compat
  const response: QueryRecordPayload = {
    queryRunnerResult: { neonRegion, queryTimes, queryTimesCold, queryTimesHot },
    // Platform details, e.g 'vercel' and 'iad1'
    platformName: platform.getPlatformName(),
    platformRegion: platform.getPlatformRegion(),
    // The version of the neon-quer-bench module used in these tests
    version
  }

  res.json(response)
})
```
