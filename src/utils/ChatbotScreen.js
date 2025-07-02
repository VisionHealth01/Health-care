import { OPENAI_API_KEY } from '@env';

export const sendMessageToGPT = async (userMessage) => {
  const systemPrompt = `You are a kind, culturally-aware mental wellness assistant helping people manage anxiety, stress, sadness, or self-doubt. Respond with empathy and suggest journaling, breathing, or meditation.`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.7
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || 'Sorry, something went wrong.';
  return reply;
};
