import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT || 3000),
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  openAiBaseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  generationTimeoutMs: Number(process.env.GENERATION_TIMEOUT_MS || 20000)
};
