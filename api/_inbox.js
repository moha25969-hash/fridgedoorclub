const crypto = require('crypto');
const REPO = process.env.INBOX_REPO || 'moha25969-hash/fridgedoorclub-inbox';
async function put(path, base64, message) {
  const r = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'User-Agent': 'fridgedoorclub' },
    body: JSON.stringify({ message, content: base64 })
  });
  if (!r.ok) throw new Error('github ' + r.status);
}
const clean = (v, n) => String(v || '').replace(/[\u0000-\u001f<>]/g, ' ').trim().slice(0, n);
const id = () => new Date().toISOString().slice(0, 10) + '/' + crypto.randomBytes(8).toString('hex');
const json = o => Buffer.from(JSON.stringify(o, null, 2)).toString('base64');
module.exports = { put, clean, id, json };
