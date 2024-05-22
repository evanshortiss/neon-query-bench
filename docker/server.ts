import fastify from 'fastify';
import nqb from 'neon-query-bench'

const server = fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  }
});
const { platform, runner, neonRegion, version } = nqb(process.env)

server.get('/health', async () => {
  return {
    status: 'ok',
    uptime: uptime(),
  };
});

server.get('/benchmark/metadata', async () => {
  return {
    version,
    neonRegion,
    platform: platform.getPlatformName(),
    region: platform.getPlatformRegion()
  }
})

server.get<{ Querystring: { count: number }, Headers: { 'x-api-key'?: string } }>('/benchmark/results', async (req) => {
  const { queryTimes } = await runner({
    apiKey: req.headers['x-api-key'] ? req.headers['x-api-key'].toString() : undefined,
    count: req.query.count ? parseInt(req.query.count.toString()) : 5
  })

  return {
    queryTimes
  }
})

server.listen({
  port: parseInt(process.env.PORT || '3000'),
  host: process.env.HOST || '0.0.0.0'
})

// Convert uptime to human readable format with days, hours, minutes, seconds
const uptime = () => {
  const totalSeconds = Math.floor(process.uptime());
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
