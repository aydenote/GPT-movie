import { Configuration, OpenAIApi } from 'openai';
import type { Request, Response } from 'express';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API,
});
const openai = new OpenAIApi(configuration);

export default async function generate(req: Request, res: Response) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not configured',
      },
    });
    return;
  }

  const question = req.body.question || '';
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: question,
    temperature: 0,
    max_tokens: 10,
  });

  res.status(200).json({ result: response.data.choices[0].text });
}
