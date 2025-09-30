import pkg from '../../package.json';

export function getVersion(): string {
  return `v${pkg.version}`;
}

export function getLastUpdateDate(): string {
  // This should be set at build time via environment variable
  return process.env.LAST_UPDATE_DATE || new Date().toISOString().split('T')[0]!;
}
