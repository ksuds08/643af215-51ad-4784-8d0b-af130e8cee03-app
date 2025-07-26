export async function AITemplateGeneratorBackendHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

    const contentType = req.headers.get("content-type");
    if (!contentType || contentType.indexOf("application/json") === -1) {
      return new Response(JSON.stringify({ error: "Invalid content type" }), { status: 400 });
    }

    const body: { jobTitle?: string; industry?: string; } = await req.json();
    if (!body.jobTitle || !body.industry) {
      return new Response(JSON.stringify({ error: "Missing required fields: jobTitle or industry" }), { status: 400 });
    }

    const template = await generateTemplate(body.jobTitle, body.industry);

    return new Response(JSON.stringify({ template }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

async function generateTemplate(jobTitle: string, industry: string): Promise<string> {
  // Simulate AI template generation
  return `Generated template for ${jobTitle} in ${industry} industry`;
}
