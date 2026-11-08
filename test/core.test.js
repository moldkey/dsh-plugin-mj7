import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_BASE, normalizeBase, buildUrl, asLimit, summarizeSearch,
  summarizeHot, summarizeHs, summarizeList, summarizeFx,
} from '../lib/core.js'

test('normalizeBase 去尾斜杠并校验协议', () => {
  assert.equal(normalizeBase(), DEFAULT_BASE)
  assert.equal(normalizeBase('https://www.mj7.cn/'), 'https://www.mj7.cn')
  assert.throws(() => normalizeBase('ftp://x'))
})

test('buildUrl 拼参数与编码', () => {
  assert.equal(buildUrl('https://www.mj7.cn', '/api/search', { kw: '法兰' }),
    'https://www.mj7.cn/api/search?kw=%E6%B3%95%E5%85%B0')
  assert.equal(buildUrl('https://www.mj7.cn', '/api/hot'),
    'https://www.mj7.cn/api/hot')
})

test('asLimit 边界', () => {
  assert.equal(asLimit(undefined), 6)
  assert.equal(asLimit(3), 3)
  assert.equal(asLimit(999), 50)
  assert.equal(asLimit('x'), 6)
})

test('summarizeSearch 提取分组与截断', () => {
  const out = summarizeSearch({
    code: 200, total: 16, kw: '法兰',
    groups: [{ key: 'std', name: '标准', total: 8, items: [
      { id: 1, standard_no: 'GOST 12815-2017', _title: '法兰阀门' },
      { id: 2, standard_no: 'GB 1' },
      { id: 3, standard_no: 'GB 2' },
    ] }],
  }, 2)
  assert.equal(out.total, 16)
  assert.equal(out.groups[0].items.length, 2)
  assert.equal(out.groups[0].items[0].standard_no, 'GOST 12815-2017')
})

test('summarizeSearch 非 200 抛错', () => {
  assert.throws(() => summarizeSearch({ code: 400, msg: '请输入关键词' }), /请输入关键词/)
})

test('summarizeHot/summarizeHs/summarizeList 基本形态', () => {
  assert.deepEqual(summarizeHot({ code: 200, items: ['法兰', '轴承'] }).items, ['法兰', '轴承'])
  const hs = summarizeHs({ code: 200, hs: '73181500', chapter: '73', data: [{ standard_no: 'GB 1' }] })
  assert.equal(hs.hs, '73181500')
  assert.equal(hs.items.length, 1)
  assert.equal(summarizeList({ code: 200, total: 2, data: [1, 2] }).total, 2)
})

test('summarizeFx 取指定币种', () => {
  const fx = summarizeFx({ code: 200, base: 'CNY', rates: { USD: 0.149, EUR: 0.134 } }, 'usd')
  assert.equal(fx.currency, 'USD')
  assert.equal(fx.rate, 0.149)
  assert.equal(summarizeFx({ code: 200, rates: {} }, 'JPY').rate, null)
})
