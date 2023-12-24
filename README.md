# Neon Query Bench

A utility for testing the latency required to perform a simple query against
a Neon Postgres database using the [@neondatabase/serverless](https://github.com/neondatabase/serverless)
driver, and for packaging the results into a standard format for consumption.

## Usage

The following environment variables are required:

* `DATABASE_URL` - Neon Postgres database connection string.
* `RECORDER_URL` - A HTTPS URL to POST results to.
* `RECORDER_API_KEY` - The API key required for authorisation to POST to `RECORDER_URL`.
* `RECORDER_REQUEST_TIMEOUT` - (Default: `10000`) Number of milliseconds to wait before timing out the POST request to record results.

```ts
import { getBenchmarkInstance } from "neon-query-bench"

const {
  runner,
  platform,
  recorder
} = getBenchmarkInstance({
  DATABASE_URL: process.env.DATABASE_URL,
  RECORDER_URL: process.env.RECORDER_URL,
  RECORDER_API_KEY: process.env.RECORDER_API_KEY
})

// Run 3 benchmark queries in series against the database
const result = await runner(3)

// POST benchmark results to an endpoint to record them
await recorder({
  platformName: platform.getPlatformName(),
  platformRegion: platform.getPlatformRegion(),
  queryRunnerResult: result
})
```
