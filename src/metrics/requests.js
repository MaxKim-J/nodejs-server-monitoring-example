import { Counter, Histogram } from 'prom-client';

export function promTotalRequests(register, app) {
  const requestsCounter = new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
  });

  app.use((_, __, next) => {
    requestsCounter.inc();
    next();
  });

  register.registerMetric(requestsCounter);
}

export function promRequestLatency(register, app) {
  const requestsDuration = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    buckets: [0.1, 0.2, 0.5, 1, 2, 5],
  });

  app.use((_, res, next) => {
    const start = process.hrtime();

    res.on('finish', () => {
      const duration = process.hrtime(start);
      const durationInSeconds = duration[0] + duration[1] / 1e9;
      requestsDuration.observe(durationInSeconds);
    });

    next();
  });

  register.registerMetric(requestsDuration);
}
