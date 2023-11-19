import { collectDefaultMetrics } from 'prom-client';

export function promDefaultMetrics(register) {
  return collectDefaultMetrics({ register });
}
