import express  from 'express';
import cors     from 'cors';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));   // restrict in production
app.use(express.json());

// ── Nodemailer Transporter ──────────────────────────────
// Uses SMTP credentials from .env
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Validation helper ───────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── POST /send ──────────────────────────────────────────
app.post('/send', async (req, res) => {
  const { name, email, anfrage, nachricht } = req.body;

  // Server-side validation
  if (!name?.trim())                 return res.status(400).json({ error: 'Name fehlt' });
  if (!email?.trim())                return res.status(400).json({ error: 'E-Mail fehlt' });
  if (!isValidEmail(email))          return res.status(400).json({ error: 'E-Mail ungültig' });
  if (!anfrage?.trim())              return res.status(400).json({ error: 'Anfrage fehlt' });
  if (!nachricht?.trim())            return res.status(400).json({ error: 'Nachricht fehlt' });

  const mailOptions = {
    from:    `"Kontaktformular" <${process.env.SMTP_USER}>`,
    to:      'luca@senzproduction.com',
    replyTo: email,
    subject: `[Anfrage] von ${name}`,
    text: `
Name:      ${name}
E-Mail:    ${email}
Anfrage:   ${anfrage}

Nachricht:
${nachricht}
    `.trim(),
    html: `
      <table style="font-family:sans-serif;font-size:15px;color:#1a1a1a;width:100%;max-width:600px">
        <tr><td style="padding:32px 0 8px"><strong style="font-size:22px">Neue Anfrage</strong></td></tr>
        <tr><td style="padding:4px 0"><b>Name:</b> ${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 0"><b>E-Mail:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:4px 0"><b>Anfrage:</b> ${escapeHtml(anfrage)}</td></tr>
        <tr><td style="padding:24px 0 4px"><b>Nachricht:</b></td></tr>
        <tr><td style="padding:8px 16px;background:#f5f5f5;border-radius:4px;white-space:pre-wrap">${escapeHtml(nachricht)}</td></tr>
      </table>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ error: 'Mail konnte nicht gesendet werden' });
  }
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
