/**
 * Runs Lighthouse (mobile) against a built site served by `astro preview` and writes HTML reports
 * to ./lighthouse/. Requires Chrome installed locally.
 *
 *   npm run build && npm run lighthouse
 *   npm run lighthouse -- /collections/ /gold-rate-dubai/
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4321;
const BASE = `http://localhost:${PORT}`;
const DEFAULT_PATHS = [
  '/',
  '/jewellery/necklaces/',
  '/jewellery/necklaces/kolkata-fringe-choker/',
  '/collections/kolkata/',
  '/gold-rate/',
  '/stores/deira-gold-souq-extension/',
];
const paths = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_PATHS;

const run = (cmd, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { shell: true, stdio: 'inherit' });
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`)),
    );
  });

await mkdir('lighthouse', { recursive: true });
const preview = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
  shell: true,
  stdio: 'ignore',
});

try {
  await sleep(4000);
  for (const path of paths) {
    const name = path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    await run('npx', [
      'lighthouse',
      `${BASE}${path}`,
      '--form-factor=mobile',
      '--screenEmulation.mobile',
      '--only-categories=performance,accessibility,best-practices,seo',
      '--quiet',
      `--output-path=lighthouse/${name}.html`,
      '--chrome-flags=--headless=new',
    ]);
  }
} finally {
  preview.kill();
}
console.log('Reports written to ./lighthouse/');
