import { buildUrl } from './URLUtils.ts'

export type RequestBody = Record<string, unknown>

function buildHeaders(custom?: Record<string, string>) {
  return {
    'Content-Type': 'application/json',
    ...(custom ?? {}),
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as unknown as T
  }

  const text = await response.text()
  try {
    return text ? (JSON.parse(text) as T) : (undefined as unknown as T)
  } catch (err) {
    throw new Error(`Failed to parse response JSON: ${(err as Error).message}`)
  }
}

export async function sendRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = buildUrl(path)

  const response = await fetch(url, {
    credentials: 'include',
    headers: buildHeaders(init.headers as Record<string, string> | undefined),
    ...init,
  })

  return parseResponse<T>(response)
}

export function formatBody(body?: RequestBody){
  if (body === undefined)
    return undefined;

  return JSON.stringify(body);
}

export default { sendRequest, buildHeaders, parseResponse, formatBody }
