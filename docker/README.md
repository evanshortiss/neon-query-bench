# Neon Query Bench Container

This folder contains the code and Dockerfile required to build a container
image that exposes `neon-query-bench` via a HTTP API.

## API Endpoints

`GET /health` - Simple health check endpoint. Returns the server uptime.
`GET /benchmark/metadata` - Returns [metadata](/src/types.ts), e.g the region of the Neon database being tested against.
`GET /benchmark/results` - Runs a query against the target Neon database

## Building

A GitHub workflow is included to build and publish new versions of this
container image to [DockerHub](https://hub.docker.com/r/evanatneon/neon-query-bench).

Note that images are tagged by the version of `neon-query-bench` found in the
[_package.json_](/docker/package.json). Also, note that the _.npmrc_ in this
folder doesn't allow version ranges. Only specific versions are allowed.
