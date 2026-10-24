// 将 Vite 开发入口复制为 index.html
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const devEntry = path.join(root, 'index.vite.html');
const indexHtml = path.join(root, 'index.html');

if (fs.existsSync(devEntry)) {
  // 备份当前 index.html（构建产物版本）
  const builtBackup = path.join(root, 'index.built.html');
  fs.copyFileSync(indexHtml, builtBackup);
  // 复制开发入口
  fs.copyFileSync(devEntry, indexHtml);
  console.log('✓ Prepared Vite dev entry');
} else {
  console.log('⚠ index.vite.html not found, skipping');
}
