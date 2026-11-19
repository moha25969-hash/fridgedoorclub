const { put, clean, id, json } = require('./_inbox');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  const b = req.body || {};
  if (b.company) return res.status(200).json({ ok: true });
  const first = clean(b.first_name, 30), state = clean(b.state, 40), story = clean(b.story, 200), email = clean(b.email, 120);
  const kind = ['flop', 'proud', 'then'].includes(b.kind) ? b.kind : 'proud';
  const photo = String(b.photo || '');
  const m = photo.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/);
  if (!first || !state || !story || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || b.consent !== 'yes' || !m || m[2].length > 3500000)
    return res.status(400).json({ ok: false });
  const key = id(), ext = m[1] === 'jpeg' ? 'jpg' : m[1];
  try {
    await put(`pending/${key}.${ext}`, m[2], `New dish from ${first}`);
    await put(`pending/${key}.json`, json({ first_name: first, state, story, kind, email, sunday_letter: b.sunday_letter === 'yes', consent: true, photo: `${key.split('/')[1]}.${ext}`, received: new Date().toISOString() }), `Details for ${first}`);
    return res.status(200).json({ ok: true });
  } catch (e) { return res.status(502).json({ ok: false }); }
};
