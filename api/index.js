const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Usa variável de ambiente ou gera uma chave
const secretKey = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');

const algorithm = 'aes-256-cbc';

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// POST /encriptar
app.post('/encriptar', (req, res) => {
  try {
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({ erro: 'Campo "texto" é obrigatório' });
    }

    const textoEncriptado = encrypt(texto);

    res.json({
      texto_encriptado: textoEncriptado,
      status: 'sucesso'
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// POST /decriptar
app.post('/decriptar', (req, res) => {
  try {
    const { texto_encriptado } = req.body;

    if (!texto_encriptado) {
      return res.status(400).json({ erro: 'Campo "texto_encriptado" é obrigatório' });
    }

    const textoDecriptado = decrypt(texto_encriptado);

    res.json({
      texto_decriptado: textoDecriptado,
      status: 'sucesso'
    });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// GET health
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Exporta o handler para a Vercel
module.exports = app;
