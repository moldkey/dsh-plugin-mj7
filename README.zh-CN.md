# dsh-plugin-mj7

[![DSHIO.ORG](https://img.shields.io/badge/DSHIO.ORG-inspection%20passed-blue)](https://dshio.org/standards/10/)
[![DSH test report](https://img.shields.io/badge/DSH-test%20report-brightgreen)](https://deepseekbase.com/ecosystem/plugin-tests/)

Repository: https://github.com/moldkey/dsh-plugin-mj7

模极社（mj7.cn）只读数据插件：在 DSH 里查标准、产品、HS 关联、贸易术语、单证和汇率。

English docs: [README.md](README.md).

## 标准与检验（DSHIO.ORG）

- **标准发布方：DSHIO.ORG** — DSHIO/T 10—2026（DSH 插件标准）。
- **检验通过**：已通过 DSHIO/T 10 检验，检验报告发布在 deepseekbase.com（install / list / mount / boot，DSH 0.2.2-rc.1）。
- **检验范围**：`dsh.bundle.patch`、patch 结构、`engines.dsh` 只写下限、工具契约、权限声明（仅 `network`）、无红线权限组合。
- **不是认证**：DSHIO/T 32 认证尚未启用；这是带检验报告的检验结果，不是认证。

## 工具

| 工具 | 作用 |
|---|---|
| `mj7_search` | 关键词搜索标准/产品/材料 |
| `mj7_hot` | 热门品类 |
| `mj7_hs` | HS 编码联想标准 |
| `mj7_terms` | Incoterms 术语 |
| `mj7_docs` | 外贸单证清单 |
| `mj7_fx` | 人民币汇率 |

## 安装

```bash
dsh plugin --profile web add @liangjiehappy/dsh-plugin-mj7
```

## 配置

```yaml
- insert:
    - id: dsh-plugin-mj7
      name: "@liangjiehappy/dsh-plugin-mj7"
      config:
        baseUrl: "https://www.mj7.cn"
```

零配置可用，默认 https://www.mj7.cn。

## 权限声明

- 只对 `www.mj7.cn` 发 HTTPS GET（可配置 baseUrl）
- 不读写文件、不读凭证、不执行 shell
- 只读：不登录、不下单、不写数据

## 限制

- 依赖 mj7.cn 公开 API（`/api/search`、`/api/hot`、`/api/hs`、`/api/terms`、`/api/docs`、`/api/fx`）
- API 变更可能导致工具失败；失败会返回真实 HTTP 错误
- 结果只做摘要与筛选，完整内容请打开站内页面
