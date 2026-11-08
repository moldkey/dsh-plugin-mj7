# dsh-plugin-mj7

[![DSHIO.ORG](https://img.shields.io/badge/DSHIO.ORG-inspection%20passed-blue)](https://dshio.org/standards/10/)
[![DSH test report](https://img.shields.io/badge/DSH-test%20report-brightgreen)](https://deepseekbase.com/ecosystem/plugin-tests/)

Repository: https://github.com/moldkey/dsh-plugin-mj7

Read-only mj7.cn data tools for DeepSeek Harness: standards/product search, HS lookup, Incoterms, trade documents, and CNY FX rates.

中文说明见 [README.zh-CN.md](README.zh-CN.md).



## Standards & testing (DSHIO.ORG)

- **Standard body: DSHIO.ORG** — DSHIO/T 10—2026 (DSH plugin standard).
- **Inspection passed**: DSHIO/T 10 inspection passed; the test report is published on deepseekbase.com (install / list / mount / boot, DSH 0.2.2-rc.1).
- **Inspection scope**: manifest `dsh.bundle.patch`, patch structure, `engines.dsh` lower bound, tool contract, declared permissions (`network` only), no red-line permission combinations.
- **Not a certification**: DSHIO/T 32 certification is not enabled; this is an inspection result with a test report, not a certification.


- **DSHIO/T 10—2026** (DSH plugin standard): conformance checked — manifest `dsh.bundle.patch`, patch structure, `engines.dsh` lower bound, tool contract, declared permissions (`network` only), no red-line permission combinations.
- **DSH sandbox**: install / list / mount / boot tested on deepseekbase.com (DSH 0.2.2-rc.1).
- This is a conformance statement, not a certification: DSHIO/T 32 certification is not enabled yet.

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
