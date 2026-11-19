const { put, clean, id, json } = require('./_inbox');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const b = req.body || {};
  if (b.company) return res.status(200).json({ ok: true });
  const email = clean(b.email, 120);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ ok: false });
  try { await put(`subscribers/${id()}.json`, json({ email, first_name: clean(b.first_name, 30), source: 'website', received: new Date().toISOString() }), 'New Sunday Letter subscriber'); return res.status(200).json({ ok: true }); }
  catch (e) { return res.status(502).json({ ok: false }); }
};
