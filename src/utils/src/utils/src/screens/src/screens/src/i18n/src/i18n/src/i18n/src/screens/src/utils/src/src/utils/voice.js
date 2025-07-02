import { OPENAI_KEY } from './config';

export async function getTranscription(base64Audio) {
  try {
    const audioBlob = new Blob([Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))], {
      type: 'audio/m4a'
    });

    const formData = new FormData();
    formData.append('file', audioBlob, 'voice.m4a');
    formData.append('model', 'whisper-1');

    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`
      },
      body: formData
    });

    const data = await res.json();
    return data.text || 'Could not transcribe.';
  } catch (err) {
    console.error('Transcription error:', err);
    return 'Error during transcription.';
  }
}
