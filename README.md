# Neon Query Bench

A utility for testing the latency required to perform a simple query against
a Neon Postgres database using the [@neondatabase/serverless](https://github.com/neondatabase/serverless)
driver, and for packaging the results into a standard format for consumption.

## Setup

1. Create a Project in the Neon region you'd like to test latency to.
1. Clone the repository, and run `npm install` from the root of this repository.
1. Create a copy of the `.env.example` file named `.env`.
1. Add the [connection string](https://neon.tech/docs/connect/connect-from-any-app) for your Neon database to the `.env`.
1. Run `npm run drizzle:push` and `npm run seed`.

You now have a Neon database that `neon-query-bench` can be run against.

## Usage

Note, if you're deploying the module on Railway or DigitalOcean you need to
manually set one of these variables:

* `NQB_RAILWAY_REGION` - Use one of the values listed on Railway's [deployment regions page](https://docs.railway.app/reference/deployment-regions#region-options), e.g `us-west4`
* `NQB_DO_REGION` - Use a a slug from Digital Ocean's [app platform availability page](https://docs.digitalocean.com/products/app-platform/details/availability/), e.g `nyc`.

### Via Container Image

The easiest way to use `neon-query-bench` is to deploy a pre-built container. 

The container deployment is tested on:

* Railway
* Fly
* DigitalOcean AppPlatform

The following environment variables are supported:

* `NQB_DATABASE_URL` (required) - The database to test latency against.
* `NQB_API_KEY` (optional) - An API key that can be use to prevent unauthenticated calls to `GET /benchmarks/results`.
* `PORT` - Port to listen on.
* `HOST` - Hostname to listen on.

You can make a GET request to the server to discover the platform, platform
region, version of neon-query-bench, region of the target Neon database, and
run a benchmark.

```bash
# Get the platform, region, etc where this benchmark is running
curl http://$HOSTNAME/benchmarks/metadata

# Run a benchmark and return results
curl http://$HOSTNAME/benchmarks/results
```

### Embed in a Node.js Server

The following environment variables are required:

* `NQB_DATABASE_URL` (required) - The database to test latency against.
* `NQB_API_KEY` (optional) - An API key that can be use to prevent unauthenticated requests..


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
