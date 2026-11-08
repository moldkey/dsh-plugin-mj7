# dsh-plugin-mj7

Repository: https://github.com/moldkey/dsh-plugin-mj7

模极社（mj7.cn）只读数据插件：在 DSH 里查标准、产品、HS 关联、贸易术语、单证和汇率。

English docs: [README.md](README.md).

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
