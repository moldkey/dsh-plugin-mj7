# dsh-plugin-mj7

[![DSHIO/T 10](https://deepseekbase.com/badge/std.svg)](https://dshio.org/10/) [![deepseekbase](https://deepseekbase.com/badge/liangjiehappy-dsh-plugin-mj7.svg)](https://deepseekbase.com/zh/plugins/liangjiehappy-dsh-plugin-mj7/)
[![deepseekbase endpoint](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeepseekbase.com%2Fbadge%2Fliangjiehappy-dsh-plugin-mj7.json&style=flat-square)](https://deepseekbase.com/zh/plugins/liangjiehappy-dsh-plugin-mj7/)

Repository: https://github.com/moldkey/dsh-plugin-mj7

Read-only mj7.cn data tools for DeepSeek Harness: standards/product search, HS lookup, Incoterms, trade documents, and CNY FX rates.

中文说明见 [README.zh-CN.md](README.zh-CN.md).

## Standards & testing (DSHIO.ORG)

**Conformance declaration (DSHIO/T 10—2026 §8.1)**

```
符合 DSHIO/T 10—2026（基準 DSH 0.2.2-rc.1，靜態層 + 動態層）
檢驗日期：2026-11-08
環境指紋：dsh=0.2.2-rc.1;img=dsh-sandbox:5.0@sha256:d90b02baef228bb105d4817d1a7d23bdd6aec24f463cc7bc3d1fbb2e5af45c00;node=24.11.1;pnpm=9.15.9;mem=768m;cpu=1
重複次數：2 次（一致）
（總體判定為「有條件符合」：待人工判断 2 项（5.5.1、5.5.2））
```

- **Scope**: static layer (T0) + dynamic layer (T1–T4). T5 (tool invocation) is not part of the current implementation and is not claimed.
- **Manual judgement**: DSHIO/T 10 clauses 5.5.1 (description quality) and 5.5.2 (permission consistency) are developer-judged; the author confirms them for this plugin.
- **Not a certification**: this is an inspection report, not a certification. DSHIO/T 32 certification is not enabled.

## Tools

| Tool | Purpose |
|---|---|
| `mj7_search` | Search standards, materials and industrial products by keyword |
| `mj7_hot` | Hot categories on mj7.cn |
| `mj7_hs` | Look up standards related to an HS code |
| `mj7_terms` | Incoterms responsibilities |
| `mj7_docs` | Export/trade document checklist |
| `mj7_fx` | CNY FX rates (default USD) |

## Install

```bash
dsh plugin --profile web add @liangjiehappy/dsh-plugin-mj7
```

## Config

```yaml
- insert:
    - id: dsh-plugin-mj7
      name: "@liangjiehappy/dsh-plugin-mj7"
      config:
        baseUrl: "https://www.mj7.cn"
```

Zero-config works; the default base URL is `https://www.mj7.cn`.

## Permissions

- Outbound HTTPS GET to `www.mj7.cn` only (configurable `baseUrl`)
- No file reads or writes, no credential access, no shell
- Read-only: no login, no orders, no writes

## Limitations

- Depends on public mj7.cn APIs (`/api/search`, `/api/hot`, `/api/hs`, `/api/terms`, `/api/docs`, `/api/fx`)
- API changes can break a tool; failures surface the real HTTP error
- Results are summaries with filters; open the site for full content
