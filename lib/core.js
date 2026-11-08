// dsh-plugin-mj7 · 纯函数：URL 构造与 API 结果摘要（无副作用、不依赖网络）
export const DEFAULT_BASE = 'https://www.mj7.cn'

export function normalizeBase(base) {
  const b = (base || DEFAULT_BASE).trim().replace(/\/+$/, '')
  if (!/^https?:\/\//i.test(b)) throw new Error('baseUrl 必须以 http(s):// 开头')
  return b
}

export function buildUrl(base, path, params = {}) {
  const u = new URL(path, base + '/')
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') u.searchParams.set(k, String(v))
  }
  return u.toString()
}

export function asLimit(n, def = 6, max = 50) {
  const v = Number(n)
  if (!Number.isFinite(v) || v <= 0) return def
  return Math.min(Math.floor(v), max)
}

function pickItem(it) {
  const out = {}
  for (const k of ['id', 'standard_no', 'org', 'title', 'title_cn', '_title', 'name', 'code', 'cn', 'en', 'url', 'type']) {
    if (it && it[k] !== undefined) out[k] = it[k]
  }
  return out
}

export function summarizeSearch(json, limit = 6) {
  if (!json || json.code !== 200) throw new Error((json && json.msg) || 'mj7 search 失败')
  const groups = (json.groups || []).map((g) => ({
    key: g.key,
    name: g.name,
    total: g.total,
    items: (g.items || []).slice(0, limit).map(pickItem),
  }))
  return { total: json.total ?? 0, kw: json.kw || '', groups }
}

export function summarizeHot(json, limit = 30) {
  if (!json || json.code !== 200) throw new Error((json && json.msg) || 'mj7 hot 失败')
  return { items: (json.items || []).slice(0, limit) }
}

export function summarizeHs(json, limit = 10) {
  if (!json || json.code !== 200) throw new Error((json && json.msg) || 'mj7 hs 失败')
  return {
    hs: json.hs || '',
    chapter: json.chapter || '',
    total: (json.data || []).length,
    items: (json.data || []).slice(0, limit).map(pickItem),
  }
}

export function summarizeList(json, limit = 10) {
  if (!json || json.code !== 200) throw new Error((json && json.msg) || 'mj7 查询失败')
  return {
    total: json.total ?? (json.data || []).length,
    items: (json.data || []).slice(0, limit),
  }
}

export function summarizeFx(json, currency = 'USD') {
  if (!json || json.code !== 200) throw new Error((json && json.msg) || 'mj7 fx 失败')
  const cur = String(currency || 'USD').toUpperCase()
  const rates = json.rates || {}
  return { base: json.base || 'CNY', currency: cur, rate: rates[cur] ?? null, rates }
}
