import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function formatCell(value, key) {
  if (value === null || value === undefined || value === '') return '-'
  if (Array.isArray(value)) return `${value.length} members`
  if (typeof value === 'object') return value.name ?? value.title ?? value.email ?? '[record]'
  if (key.toLowerCase().includes('date') || key.toLowerCase().includes('at')) {
    const date = new Date(value)
    if (!Number.isNaN(date.valueOf())) return date.toLocaleDateString()
  }
  return String(value)
}

function CollectionPage({ resource, title, description, columns }) {
  const [pageUrl, setPageUrl] = useState(null)
  const [requestVersion, setRequestVersion] = useState(0)
  const [result, setResult] = useState({ status: 'loading', items: [], count: 0, next: null, previous: null })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(resource, { url: pageUrl, signal: controller.signal })
      .then((page) => setResult({ status: 'success', ...page }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResult({ status: 'error', items: [], count: 0, next: null, previous: null, error: error.message })
        }
      })

    return () => controller.abort()
  }, [resource, pageUrl, requestVersion])

  const primaryColumn = columns[0]?.key

  function loadPage(url) {
    setResult((current) => ({ ...current, status: 'loading' }))
    setPageUrl(url)
  }

  function retry() {
    setResult((current) => ({ ...current, status: 'loading' }))
    setRequestVersion((version) => version + 1)
  }

  return (
    <section className="collection-page" aria-labelledby="collection-title">
      <div className="collection-heading">
        <div>
          <p className="eyebrow">OctoFit Tracker / {resource}</p>
          <h1 id="collection-title">{title}</h1>
          <p className="collection-description">{description}</p>
        </div>
        <div className="collection-stamp"><span className="stamp-square" /> MERGINGTON HIGH</div>
      </div>

      <div className="collection-toolbar">
        <span>TRACKER RECORDS</span>
        <strong>{result.status === 'loading' ? 'Loading...' : `${result.count} records`}</strong>
      </div>

      <div className="table-frame">
        {result.status === 'loading' && (
          <div className="state-panel" role="status">Loading {title.toLowerCase()}...</div>
        )}

        {result.status === 'error' && (
          <div className="state-panel error" role="alert">
            <strong>Could not load {title.toLowerCase()}</strong>
            <span>{result.error}</span>
            <div className="mt-3">
              <button className="btn btn-sm btn-outline-danger" onClick={retry} type="button">
                Try again
              </button>
            </div>
          </div>
        )}

        {result.status === 'success' && result.items.length === 0 && (
          <div className="state-panel"><strong>No records yet</strong>New records will appear here.</div>
        )}

        {result.status === 'success' && result.items.length > 0 && (
          <div className="table-responsive">
            <table className="table collection-table">
              <thead>
                <tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr>
              </thead>
              <tbody>
                {result.items.map((item, index) => (
                  <tr key={item._id ?? item.id ?? `${resource}-${index}`}>
                    {columns.map((column) => (
                      <td className={column.key === primaryColumn ? 'primary-cell' : ''} key={column.key}>
                        {formatCell(item[column.key], column.key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {result.status === 'success' && (
          <div className="collection-footer">
            <span>Showing {result.items.length} of {result.count}</span>
            <div className="pagination-controls">
              <button className="btn btn-sm btn-outline-success" disabled={!result.previous} onClick={() => loadPage(result.previous)} type="button">
                Previous
              </button>
              <button className="btn btn-sm btn-outline-success" disabled={!result.next} onClick={() => loadPage(result.next)} type="button">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CollectionPage