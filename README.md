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

Here's a simple example that assumes you're exposing the runner via an express
web server:

```ts
import { getBenchmarkInstance } from "neon-query-bench"

/**
 * Pass the "env" object on Cloudfalre Workers or "process.env" in Node.js
 * 
 * NQB_DATABASE_URL must be set to a Neon database connection string.
 * NQB_API_KEY can optionally be set to prevent unauthenticated queries.
 */
const { runner, platform, version, neonRegion } = getBenchmarkInstance(process.env)

// Example endpoint to call if you're using express to expose
// the runner as an HTTP endpoint
app.get('/', (req, res) => {
  // Run 5 (default value) benchmark queries in series against the database
  const {
    queryTimes
  } = await runner({
    // Pass the api key supplied with the incoming request to the runner. This
    // is only required if a key was passed when calling getBenchmarkInstance
    apiKey: req.get('x-api-key'),
    // Number of queries to perform for both hot and cold runs
    count: 5
  })

  const response = {
    // Array of start and end times for queries, {start: timestamp, end: timestamp}
    queryTimes,
    // Neon region, pulled from connection string, e.g 'us-west-2.aws.neon.tech'
    neonRegion,
    // Platform details, e.g 'vercel' and 'iad1'
    platformName: platform.getPlatformName(),
    platformRegion: platform.getPlatformRegion(),
    // The version of the neon-query-bench module
    version
  }

  res.json(response)
})
```
