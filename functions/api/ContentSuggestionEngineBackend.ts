export async function ContentSuggestionEngineBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    const contentType = req.headers.get('Content-Type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Unsupported Media Type' }), { status: 415 });
    }

    const { jobTitle, industry, userInput } = await req.json();

    if (!jobTitle || !industry || !userInput) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const suggestion = await generateContentSuggestion(jobTitle, industry, userInput);
    return new Response(JSON.stringify({ suggestion }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

async function generateContentSuggestion(jobTitle: string, industry: string, userInput: string): Promise<string> {
  const prompt = `Generate content suggestions for a resume section.\nJob Title: ${jobTitle}\nIndustry: ${industry}\nUser Input: ${userInput}`;

  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 150
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch content suggestions');
  }

  return data.choices[0].text.trim();
}
