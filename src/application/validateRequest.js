import { MODES } from '../domain/support.js';

export function validateAnalyzeRequest(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'El cuerpo de la solicitud debe ser un objeto JSON.' };
  }

  if (typeof body.message !== 'string' || body.message.trim().length < 3) {
    return { ok: false, error: 'message debe ser un texto de al menos 3 caracteres.' };
  }

  if (body.message.length > 4000) {
    return { ok: false, error: 'message no puede superar 4000 caracteres.' };
  }

  if (!MODES.includes(body.mode)) {
    return { ok: false, error: 'mode debe ser traditional o generative.' };
  }

  return { ok: true, value: { message: body.message.trim(), mode: body.mode } };
}
