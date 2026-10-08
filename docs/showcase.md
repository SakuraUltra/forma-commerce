# FORMA storefront · Project showcase

[Repository](https://github.com/SakuraUltra/my-shop) · [Desktop preview](media/desktop-home.jpg) · [Mobile preview](media/mobile-home.jpg) · [Walkthrough](media/storefront-walkthrough.mp4)

## Project summary

**FORMA is a responsive ecommerce storefront and reusable Next.js template for a fictional everyday clothing and lifestyle brand.** Its warm ivory and deep olive visual identity sits around a complete guest shopping journey: discovery, variant selection, a persistent cart, simulated checkout, saved orders and an interactive delivery timeline.

The project focuses on making the experience consistent. A shared catalog supplies every shopping surface; catalog prices and variant availability are checked again at checkout. Orders preserve their own item and amount snapshots, so later catalog changes do not rewrite saved history. Failed browser storage leaves the cart intact and gives the visitor a recoverable error.

The default installation needs no database, payment keys or user account. That makes it easy to run as a portfolio demo or adapt as a storefront starter. Production authentication, payment processing, shared inventory and fulfillment are future server integrations, not features of this demo.

## Problem → implementation

| Problem                                                                     | Implementation                                                                                             |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| A generic shop layout does not communicate a clear brand                    | A restrained FORMA identity, editorial home page, warm neutral palette and responsive product presentation |
| Separate product data makes search, listings and details disagree           | One typed catalog across home, search, filters, sale pages and product details                             |
| A cart can contain stale prices, invalid quantities or unavailable variants | Restore-time repair, per-variant limits and catalog-based checkout validation                              |
| A checkout demo can end at a disconnected confirmation screen               | Unique local order snapshots, history and a manually advanced delivery simulation                          |
| Browser persistence can fail or contain malformed data                      | Validated reads, explicit error states and saving the order before clearing the cart                       |
| A reusable template needs a clear starting point                            | No-key setup, centralized store configuration, MIT licensing and bilingual documentation                   |

## Suggested CV entry

**FORMA — Next.js ecommerce storefront** · React, TypeScript, Tailwind CSS, Zustand, Vitest

- Built a responsive storefront spanning product discovery, variant selection, a persistent cart and guest demo checkout, with a shared typed catalog across the shopping journey.
- Implemented catalog-based price and quantity validation, persistent order snapshots, storage-failure handling and an interactive simulated delivery timeline.
- Created a reusable MIT-licensed template with centralized branding, bilingual documentation and a GitHub Actions workflow for lint, tests and production builds.

Describe this as a **frontend commerce demo**. Do not describe it as a live payment platform or claim customer, revenue, conversion or performance results without measurements.

## 演示与作品集介绍

**FORMA 是一个以日常服饰和生活用品为主题的电商前端作品，同时也是可复用的 Next.js 开源模板。** 视觉采用暖白与深橄榄色，通过商品大图、排版和留白呈现自然简约的精品店风格。

项目打通了浏览、搜索筛选、选择规格、购物车、模拟结算、保存订单与模拟配送的完整体验。核心设计是让整个购物过程使用同一份商品数据，并在恢复购物车和结算时重新验证价格与数量。订单以独立快照保存在浏览器中，保存失败时不会清空购物车。

无需数据库、支付密钥或注册账号即可运行，适合用于作品展示和继续开发。真实支付、登录权限、共享库存和物流不在当前演示范围内。

### 中文简历条目

**FORMA 电商前端与开源模板** · Next.js / React / TypeScript / Tailwind CSS / Zustand / Vitest

- 构建响应式电商体验，覆盖商品搜索与筛选、规格选择、持久化购物车、游客模拟结算及订单查看，并统一商品数据来源。
- 实现商品目录驱动的价格与数量校验、订单快照、浏览器存储错误处理和可交互的模拟配送流程。
- 完善品牌视觉、集中配置、中英文文档与 MIT 开源许可，并配置 GitHub Actions 自动执行代码检查、测试和生产构建。

## One-minute demo script / 一分钟演示脚本

| Time    | Show                                              | Explain                                                                                                           |
| ------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 0–10 s  | Desktop home page, then mobile layout             | FORMA's visual identity and responsive shopping experience / 品牌视觉与手机布局                                   |
| 10–20 s | The collection, a category filter and one product | The shared catalog keeps discovery and product detail consistent / 商品数据统一，列表和详情一致                   |
| 20–30 s | Select an available variant and open the cart     | Quantities persist across reloads and respect sample stock / 购物车刷新恢复与规格数量限制                         |
| 30–45 s | Checkout using the provided fictional address     | Simulated checkout recalculates prices; no payment details / 重新核算金额，无需输入付款信息                       |
| 45–60 s | Saved order and delivery simulation               | Order snapshots persist locally; delivery advances only on interaction / 订单保存在当前浏览器，配送由用户手动演示 |

Keep the demo label visible and use only fictional customer details. The bundled walkthrough is assembled from captured screens of the working interface, not a real-time screen recording. The table above is a script for a live presentation, not a performance benchmark.

仓库中的演示视频由实际界面截图串联制作，并非实时录屏。上表可用于现场演示，时间安排不代表页面加载性能。

## Review the engineering

- [Architecture and data lifecycle](architecture.md)
- [Tests and local validation](../README.md#development)
- [GitHub Actions runs](https://github.com/SakuraUltra/my-shop/actions/workflows/storefront-checks.yml)
- [Deployment instructions and current hosting boundary](deployment.md)

See [`src/lib/store-config.ts`](../src/lib/store-config.ts) to change the sample brand, currency and shipping configuration. The repository remains named `my-shop`; FORMA is its example storefront identity.
