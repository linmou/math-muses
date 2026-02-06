import { config } from 'dotenv';

export function loadBackendEnv({ path } = {}) {
  return config(path ? { path } : undefined);
}
