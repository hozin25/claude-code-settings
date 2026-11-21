import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// 假设本文件放在项目的 scripts/ 下；若放别处，手动改这里
const PROJECT_ROOT = dirname(__dirname);

/**
 * 读取项目根的 .env 并加载到 process.env。无三方依赖。
 * 处理 KEY=value 行，忽略 # 注释和空行，去引号。
 */
export async function loadEnv(path = `${PROJECT_ROOT}/.env`) {
  let content = '';
  try {
    content = await readFile(path, 'utf8');
  } catch {
    throw new Error(`.env not found at ${path}. Create it with GLM_API_KEY=...`);
  }
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

/**
 * 下载 URL 到本地文件，自动建父目录。
 * @param {string} url
 * @param {string} dest  绝对路径
 */
export async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return buf.length;
}

/**
 * 指数退避重试。
 * @param {() => Promise<T>} fn
 * @param {number} retries  最大尝试次数（默认 3）
 * @param {string} label  日志标识
 * @returns {Promise<T>}
 * @template T
 */
export async function withRetry(fn, retries = 3, label = 'op') {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const wait = 1000 * Math.pow(2, attempt - 1);
      console.error(`  [${label}] attempt ${attempt}/${retries} failed: ${err.message}`);
      if (attempt < retries) {
        console.error(`  retrying in ${wait}ms...`);
        await new Promise(r => setTimeout(r, wait));
      }
    }
  }
  throw lastErr;
}

export { PROJECT_ROOT };
