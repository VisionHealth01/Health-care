export async function getMedicationInfoFromGPT(drugName) {
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
            content: 'You are a medical assistant specialized in psychiatry and pharmacology.'
          },
          {
            role: 'user',
            content: `Explain the use, side effects, warnings, and dosage of: ${drugName}`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'No info found.';
  } catch (err) {
    console.error(err);
    return 'Error fetching data. Please try again.';
  }
}
