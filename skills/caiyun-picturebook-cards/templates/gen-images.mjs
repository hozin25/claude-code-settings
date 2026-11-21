/**
 * 调用 GLM cogview-3-flash 批量生成插图。
 *
 * 用法：
 *   node scripts/gen-images.mjs              # 生成全部
 *   node scripts/gen-images.mjs card-01      # 只生成 card-01
 *   node scripts/gen-images.mjs card-01 card-03   # 生成多张
 *   node scripts/gen-images.mjs --force      # 跳过缓存，强制重生成
 */

import { access } from 'node:fs/promises';
import { join } from 'node:path';
import { loadEnv, downloadFile, withRetry, PROJECT_ROOT } from './lib.mjs';
import { PROMPTS, GEN_CONFIG } from './prompts.mjs';

const ASSETS_DIR = join(PROJECT_ROOT, 'assets');

function log(id, msg) {
  console.log(`[${id}] ${msg}`);
}

/**
 * 调 GLM 文生图 API。
 * @param {string} prompt
 * @returns {Promise<string>}  图片 URL
 */
async function generateOne(prompt) {
  const res = await fetch(GEN_CONFIG.endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GLM_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GEN_CONFIG.model,
      prompt,
      size: GEN_CONFIG.size,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const json = await res.json();
  if (!json.data || !json.data[0] || !json.data[0].url) {
    throw new Error(`unexpected response: ${JSON.stringify(json)}`);
  }
  return json.data[0].url;
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function processOne(item, force) {
  const dest = join(ASSETS_DIR, item.file);
  if (!force && await exists(dest)) {
    log(item.id, `SKIP (exists at ${item.file}) — use --force to regenerate`);
    return 'skipped';
  }

  log(item.id, `calling GLM API (${GEN_CONFIG.model}, ${GEN_CONFIG.size})...`);
  const url = await withRetry(() => generateOne(item.prompt), 3, item.id);

  log(item.id, `downloading ${url.slice(0, 60)}...`);
  const bytes = await withRetry(() => downloadFile(url, dest), 3, `${item.id}:download`);

  log(item.id, `OK ${(bytes / 1024).toFixed(1)} KB -> assets/${item.file}`);
  return 'ok';
}

async function main() {
  await loadEnv();
  if (!process.env.GLM_API_KEY) {
    throw new Error('GLM_API_KEY missing from .env');
  }

  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const ids = args.filter(a => !a.startsWith('--'));

  const targets = ids.length > 0
    ? PROMPTS.filter(p => ids.includes(p.id))
    : PROMPTS;

  if (targets.length === 0) {
    console.error('No matching cards. Available IDs:', PROMPTS.map(p => p.id).join(', '));
    process.exit(1);
  }

  console.log(`Generating ${targets.length} image(s) [model=${GEN_CONFIG.model}, size=${GEN_CONFIG.size}, force=${force}]`);

  const results = { ok: 0, skipped: 0, failed: 0 };
  for (const item of targets) {
    try {
      const r = await processOne(item, force);
      results[r]++;
    } catch (err) {
      console.error(`[${item.id}] FAILED: ${err.message}`);
      results.failed++;
    }
  }

  console.log('\nSummary:', JSON.stringify(results));
  if (results.failed > 0) process.exit(1);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
