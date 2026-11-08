# dsh-plugin-mj7

Repository: https://github.com/moldkey/dsh-plugin-mj7

Read-only mj7.cn data tools for DeepSeek Harness: standards/product search, HS lookup, Incoterms, trade documents, and CNY FX rates.

中文说明见 [README.zh-CN.md](README.zh-CN.md).

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
