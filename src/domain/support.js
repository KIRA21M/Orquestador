export const CATEGORIES = ['ACCESS', 'BUG', 'FEATURE', 'SECURITY'];
export const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
export const MODES = ['traditional', 'generative'];

export function requiresHumanReview(category) {
  return category === 'SECURITY';
}

export function isSupportAnalysis(value) {
  return Boolean(
    value &&
      CATEGORIES.includes(value.category) &&
      PRIORITIES.includes(value.priority) &&
      typeof value.response === 'string' &&
      value.response.trim().length > 0 &&
      typeof value.requiresHumanReview === 'boolean'
  );
}
