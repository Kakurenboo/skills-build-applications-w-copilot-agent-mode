const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return { items: payload, count: payload.length, next: null, previous: null }
  }

  if (!payload || typeof payload !== 'object') {
    return { items: [], count: 0, next: null, previous: null }
  }

  const nested = payload.data && !Array.isArray(payload.data) && typeof payload.data === 'object'
    ? payload.data
    : payload
  const items = [payload.results, payload.data, payload.items, nested.results, nested.items]
    .find(Array.isArray) ?? []
  const metadata = payload.pagination ?? payload.meta ?? nested.pagination ?? nested.meta ?? {}
  const count = payload.count ?? payload.total ?? metadata.count ?? metadata.total ?? items.length

  return {
    items,
    count: Number.isFinite(Number(count)) ? Number(count) : items.length,
    next: payload.next ?? payload.links?.next ?? nested.next ?? metadata.next ?? null,
    previous: payload.previous ?? payload.links?.previous ?? nested.previous ?? metadata.previous ?? null,
  }
}

export async function fetchCollection(resource, { url, signal } = {}) {
  const collectionUrl = `${API_BASE_URL}/${resource}/`
  const requestUrl = url ? new URL(url, collectionUrl).toString() : collectionUrl
  const response = await fetch(requestUrl, { signal, headers: { Accept: 'application/json' } })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollectionResponse(await response.json())
}