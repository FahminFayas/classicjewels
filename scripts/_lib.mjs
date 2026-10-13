// Shared helpers for the maintenance scripts in this folder.
import { mkdir, stat } from 'node:fs/promises';
import { dirname } from 'node:path';

export const ROOT = new URL('../', import.meta.url);

export async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDir(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

export const BRAND = {
  plum: '#4B2849',
  plumDeep: '#2E1830',
  gold: '#C9A24D',
  goldSoft: '#D8B571',
  ivory: '#FBF8F3',
  ink: '#241A23',
};
