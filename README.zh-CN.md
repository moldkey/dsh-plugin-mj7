# dsh-plugin-mj7

[![DSHIO/T 10](https://deepseekbase.com/badge/std.svg)](https://dshio.org/10/) [![deepseekbase](https://deepseekbase.com/badge/liangjiehappy-dsh-plugin-mj7.svg)](https://deepseekbase.com/zh/plugins/liangjiehappy-dsh-plugin-mj7/)
[![deepseekbase endpoint](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeepseekbase.com%2Fbadge%2Fliangjiehappy-dsh-plugin-mj7.json&style=flat-square)](https://deepseekbase.com/zh/plugins/liangjiehappy-dsh-plugin-mj7/)

Repository: https://github.com/moldkey/dsh-plugin-mj7

模极社（mj7.cn）只读数据插件：在 DSH 里查标准、产品、HS 关联、贸易术语、单证和汇率。

English docs: [README.md](README.md).

## 标准与检验（DSHIO.ORG）

**符合性声明（DSHIO/T 10—2026 §8.1）**

```
符合 DSHIO/T 10—2026（基準 DSH 0.2.2-rc.1，靜態層 + 動態層）
檢驗日期：2026-11-08
環境指紋：dsh=0.2.2-rc.1;img=dsh-sandbox:5.0@sha256:d90b02baef228bb105d4817d1a7d23bdd6aec24f463cc7bc3d1fbb2e5af45c00;node=24.11.1;pnpm=9.15.9;mem=768m;cpu=1
重複次數：2 次（一致）
（總體判定為「有條件符合」：待人工判断 2 项（5.5.1、5.5.2））
```

- **覆盖范围**：静态层（T0）+ 动态层（T1–T4）。T5（工具调用）当前未实施，本插件不作此声明。
- **人工判断项**：DSHIO/T 10 的 5.5.1（描述质量）与 5.5.2（权限一致性）由开发者自行判定，本插件由作者确认。
- **不是认证**：这是检验报告，不是认证；DSHIO/T 32 认证尚未启用。

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
