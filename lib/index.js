// dsh-plugin-mj7 · 模极社 mj7.cn 只读数据工具
import { defineTool } from '@deepseek-ai/dsh-tools'
import {
  buildUrl, normalizeBase, asLimit, summarizeSearch, summarizeHot,
  summarizeHs, summarizeList, summarizeFx,
} from './core.js'

export const name = 'dsh-plugin-mj7'
export const inject = ['tools']

const text = (value) => [{ type: 'text', text: JSON.stringify(value, null, 2) }]
const headers = { 'user-agent': 'dsh-plugin-mj7/0.1', accept: 'application/json' }

export function apply(ctx, config = {}) {
  const base = normalizeBase(config.baseUrl)

  async function getJson(path, params, signal) {
    const r = await fetch(buildUrl(base, path, params), { headers, signal })
    if (!r.ok) throw new Error(`mj7 API HTTP ${r.status} (${path})`)
    return r.json()
  }

  ctx.tools.register(defineTool({
    name: 'mj7_search',
    description: '搜索模极社（mj7.cn）：标准、产品、材料。返回总数与分组摘要，含站内详情标识。当用户要查某个标准/材料/产品关键词时使用。',
    parameters: {
      kw: { type: 'string', required: true, description: '关键词，如“法兰”“ISO 4703”' },
      limit: { type: 'number', description: '每组返回条数，默认 6' },
    },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      const json = await getJson('/api/search', { kw: args.kw }, exec.signal)
      return summarizeSearch(json, asLimit(args.limit))
    },
  }))

  ctx.tools.register(defineTool({
    name: 'mj7_hot',
    description: '模极社热门品类/关键词列表。当用户想了解平台热门制造品类时使用。',
    parameters: {},
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(_args, exec) {
      return summarizeHot(await getJson('/api/hot', {}, exec.signal))
    },
  }))

  ctx.tools.register(defineTool({
    name: 'mj7_hs',
    description: '按 HS 编码联想相关标准（mj7.cn HS 检索）。当用户给出 HS 编码要找关联标准时使用。',
    parameters: {
      code: { type: 'string', required: true, description: 'HS 编码，如 73181500' },
      limit: { type: 'number', description: '返回条数，默认 10' },
    },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      const json = await getJson('/api/hs', { code: args.code }, exec.signal)
      return summarizeHs(json, asLimit(args.limit, 10))
    },
  }))

  ctx.tools.register(defineTool({
    name: 'mj7_terms',
    description: '查 Incoterms 贸易术语（EXW/FOB/CIF 等）的责任划分。当用户问贸易术语责任时使用。',
    parameters: { q: { type: 'string', description: '关键词，留空返回全部' } },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      return summarizeList(await getJson('/api/terms', { q: args.q || '' }, exec.signal), 10)
    },
  }))

  ctx.tools.register(defineTool({
    name: 'mj7_docs',
    description: '查外贸单证清单（商业发票、装箱单、原产地证等）。当用户问出口需要哪些单证时使用。',
    parameters: { q: { type: 'string', description: '关键词，留空返回全部' } },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      return summarizeList(await getJson('/api/docs', { q: args.q || '' }, exec.signal), 10)
    },
  }))

  ctx.tools.register(defineTool({
    name: 'mj7_fx',
    description: '查人民币汇率（基准 CNY，默认 USD）。当用户问人民币兑某币种汇率时使用。',
    parameters: { currency: { type: 'string', description: '目标币种，默认 USD' } },
    output: { schema: { type: 'json' }, render: (_a, v) => text(v) },
    isConcurrencySafe: () => true,
    async execute(args, exec) {
      return summarizeFx(await getJson('/api/fx', { from: (args.currency || 'USD') }, exec.signal),
        args.currency || 'USD')
    },
  }))
}
