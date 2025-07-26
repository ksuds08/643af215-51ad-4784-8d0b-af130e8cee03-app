// Auto-generated index.ts for Pages Functions routing
import type { Request } from 'itty-router';

import { AITemplateGeneratorBackendHandler } from './AITemplateGeneratorBackend';
import { ContentSuggestionEngineBackendHandler } from './ContentSuggestionEngineBackend';
import { UserAuthenticationBackendHandler } from './UserAuthenticationBackend';
import { ResumeDownloadBackendHandler } from './ResumeDownloadBackend';

export async function onRequest({ request }: { request: Request }): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/api/AITemplateGeneratorBackend") return AITemplateGeneratorBackendHandler(request);
  if (path === "/api/ContentSuggestionEngineBackend") return ContentSuggestionEngineBackendHandler(request);
  if (path === "/api/UserAuthenticationBackend") return UserAuthenticationBackendHandler(request);
  if (path === "/api/ResumeDownloadBackend") return ResumeDownloadBackendHandler(request);

  return new Response("Not found", { status: 404 });
}
