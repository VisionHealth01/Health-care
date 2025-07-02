export async function sendChatMessage(chatHistory) {
  try {
    const messages = [
      {
        role: 'system',
        content: `You are a kind, supportive mental health therapist trained in CBT. Speak in calm and helpful tone. You may also explain in Hindi if user is from India.`
      },
      ...chatHistory
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_OPENAI_API_KEY`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        temperature: 0.7
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || 'Sorry, no reply.';
  } catch (err) {
    console.error(err);
    return 'Error contacting AI.';
  }
}
