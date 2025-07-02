export async function getMoodFromText(journalText) {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer YOUR_OPENAI_API_KEY`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a compassionate mental health assistant. Analyze journal entries and detect the emotional mood of the person. Only reply with one mood label and a short reason.`
          },
          {
            role: 'user',
            content: journalText
          }
        ],
        temperature: 0.6
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || 'Could not analyze.';
  } catch (err) {
    console.error(err);
    return 'Error analyzing mood.';
  }
}
