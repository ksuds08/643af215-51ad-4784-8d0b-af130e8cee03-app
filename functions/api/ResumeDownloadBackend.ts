export async function ResumeDownloadBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const templateId = url.searchParams.get('templateId');

    if (!templateId) {
      return new Response(JSON.stringify({ error: 'Template ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const template = await fetchTemplateById(templateId);

    if (!template) {
      return new Response(JSON.stringify({ error: 'Template not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ template }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function fetchTemplateById(templateId: string): Promise<any> {
  // Simulated database or API call
  const templates = {
    '1': { id: '1', name: 'Software Engineer Resume', content: '...' },
    '2': { id: '2', name: 'Data Scientist Resume', content: '...' }
  };

  return templates[templateId] || null;
}
