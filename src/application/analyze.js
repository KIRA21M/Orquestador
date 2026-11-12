import { analyzeTraditional } from '../engines/traditionalEngine.js';
import { analyzeGenerative } from '../engines/generativeEngine.js';

export function analyze(message, mode) {
  return mode === 'traditional' ? Promise.resolve(analyzeTraditional(message)) : analyzeGenerative(message);
}
