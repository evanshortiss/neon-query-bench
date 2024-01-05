# Neon Query Bench

A utility for testing the latency required to perform a simple query against
a Neon Postgres database using the [@neondatabase/serverless](https://github.com/neondatabase/serverless)
driver, and for packaging the results into a standard format for consumption.

## Usage

The following environment variables are required:

* `NQB_DATABASE_URL` - Neon Postgres database connection string.
* `NQB_API_KEY` - An API Key used to prevent unauthenticated calls.

```js
import { getBenchmarkInstance } from "neon-query-bench"

const {
  runner,
  platform
} = getBenchmarkInstance({
  // Used to secure access to the runner
  NQB_API_KEY: process.env.NQB_API_KEY,

  // The database to run benchmark queries against
  NQB_DATABASE_URL: process.env.NQB_DATABASE_URL
})

// Example endpoint to call if you're using express to expose
// the runner as an HTTP endpoint
app.get('/', (req, res) => {
  // Run 3 benchmark queries in series against the database
  const result = await runner(req.get('x-api-key'), 3)

  res.json(result)
})
```
