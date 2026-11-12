import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeTraditional } from '../src/engines/traditionalEngine.js';

test('clasifica acceso con prioridad alta', () => {
  assert.deepEqual(analyzeTraditional('No puedo iniciar sesión, estoy bloqueado'), {
    category: 'ACCESS',
    priority: 'HIGH',
    response: 'Verifique sus credenciales y utilice la recuperación de contraseña si es necesario.',
    requiresHumanReview: false,
    mode: 'traditional'
  });
});

test('marca seguridad para revisión humana', () => {
  const result = analyzeTraditional('Detecté una vulnerabilidad y posible robo de datos');
  assert.equal(result.category, 'SECURITY');
  assert.equal(result.requiresHumanReview, true);
});
