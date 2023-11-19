import { Summary } from 'prom-client';

import { performance } from 'node:perf_hooks';

export const promEventLoopUtilization = (register) => {
  let lastELU = performance.eventLoopUtilization();

  const eluMetric = new Summary({
    name: 'nodejs_eventloop_utilization',
    help: 'ratio of time the event loop is not idling in the event provider to the total time the event loop is running',
    maxAgeSeconds: 60,
    ageBuckets: 5,
    percentiles: [0.5, 0.9],
    collect() {
      const currentELU = performance.eventLoopUtilization();
      this.observe(
        performance.eventLoopUtilization(currentELU, lastELU).utilization,
      );
      lastELU = currentELU;
    },
  });

  register.registerMetric(eluMetric);
};
