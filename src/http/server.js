import http from 'node:http';
import { config } from '../config.js';
import { validateAnalyzeRequest } from '../application/validateRequest.js';
import { analyze } from '../application/analyze.js';

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 10000) throw Object.assign(new Error('Payload demasiado grande.'), { statusCode: 413 });
  }
  try { return JSON.parse(raw || '{}'); } catch { throw Object.assign(new Error('El cuerpo debe ser JSON válido.'), { statusCode: 400 }); }
}

export const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/health') return sendJson(res, 200, { status: 'ok' });
    if (req.method !== 'POST' || req.url !== '/api/analyze') return sendJson(res, 404, { error: 'Ruta no encontrada.' });
    const validation = validateAnalyzeRequest(await readJson(req));
    if (!validation.ok) return sendJson(res, 400, { error: validation.error });
    return sendJson(res, 200, await analyze(validation.value.message, validation.value.mode));
  } catch (error) {
    const status = error.statusCode || 500;
    return sendJson(res, status, { error: status === 500 ? 'Error interno del servidor.' : error.message });
  }
});

export function start() { return server.listen(config.port, () => console.log(`AI Support Engine escuchando en http://localhost:${config.port}`)); }
