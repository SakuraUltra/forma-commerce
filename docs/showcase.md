# FORMA storefront · Project case study

[中文案例](#中文项目案例) · [Animated preview](media/storefront-preview.gif) · [Desktop](media/desktop-home.jpg) · [Mobile](media/mobile-home.jpg) · [Walkthrough](media/storefront-walkthrough.mp4) · [v0.1.0 release](https://github.com/SakuraUltra/my-shop/releases/tag/v0.1.0)

**FORMA is a responsive ecommerce frontend and reusable Next.js template for a fictional everyday clothing and lifestyle brand.** The `my-shop` repository brings product discovery, variant selection, a persistent cart, guest demo checkout, saved orders and a delivery simulation into one coherent journey.

## Goal and audience

The goal was to turn a shop scaffold into a portfolio project that reviewers can understand quickly and developers can run without configuring a database, payment provider or account service. The intended audience is people reviewing frontend work and developers looking for a small storefront starter.

FORMA's warm ivory, deep olive, serif headings and editorial photography are intended to create a calm boutique identity. That is a qualitative design direction, not a measured claim about conversion or usability. The [home page](../src/app/page.tsx), [hero](../src/components/home/HeroBanner.tsx) and [theme tokens](../src/app/globals.css) show how that direction is implemented.

## Engineering decisions and tradeoffs

| Decision                                               | Reason and tradeoff                                                                                                                                                                                                              | Inspect the implementation                                                                                                                                    |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One typed catalog supplies discovery and product pages | Keeps names, prices, variants and links consistent across 12 sample products. Catalog editing remains a code change; there is no content-management interface.                                                                   | [Catalog](../src/lib/catalog.ts), [product routes](../src/app/products/%5Bslug%5D/page.tsx)                                                                   |
| Put filters and sorting in the URL                     | A filtered view survives refresh and can be linked directly. Unknown values fall back to supported defaults; filtering runs over the small local catalog rather than a search service.                                           | [Filter rules](../src/lib/product-filters.ts), [listing](../src/components/product/ProductListingContent.tsx)                                                 |
| Rebuild cart lines from catalog IDs and quantities     | Restored data is checked, stale prices are replaced, duplicates are merged and quantities are capped by sample stock. This protects the demo's consistency; client validation is not a trusted transaction boundary.             | [Cart rules](../src/lib/cart.ts), [Zustand persistence](../src/store/cart.ts)                                                                                 |
| Save order snapshots before clearing the cart          | A completed demo order preserves its own item and amount data. If order persistence fails, checkout keeps the cart and displays an error. Orders stay in browser storage, so clearing it removes the history.                    | [Order model](../src/lib/orders.ts), [checkout sequence](../src/components/checkout/CheckoutContent.tsx)                                                      |
| Separate static catalog rendering from browser state   | Product routes come from the catalog; cart and order screens wait until browser data is available. Order subscriptions refresh saved history across tabs. The cart currently needs a reload to reflect changes from another tab. | [Product routes](../src/app/products/%5Bslug%5D/page.tsx), [client readiness](../src/lib/use-client-ready.ts), [order subscription](../src/lib/use-orders.ts) |

Amounts use integer cents, with formatting and shipping rules in [store configuration](../src/lib/store-config.ts). Changing the currency changes display formatting; it does not convert catalog prices.

## Evidence and validation

The release baseline includes **12 catalog product pages and 27 automated test cases**. These are scope and test counts, not traffic or performance metrics.

- [Commerce tests](../src/lib/commerce.test.ts) cover catalog consistency, combined filters, stock limits, invalid quantities, stale cart repair, reload persistence, shipping thresholds, order snapshots, malformed saved data and delivery progression.
- [Checkout component tests](../src/components/checkout/CheckoutContent.test.tsx) exercise an empty cart, a completed guest checkout, order display after remount, failed storage with cart preservation and a missing-order state.
- [GitHub Actions](../.github/workflows/storefront-checks.yml) runs locked dependency installation, lint, tests and a production build. The build also checks TypeScript. See [run history](https://github.com/SakuraUltra/my-shop/actions/workflows/storefront-checks.yml) for evidence tied to a particular commit.

These checks do not establish production security, cross-browser coverage, performance improvements or measured usability. The suite combines domain and component tests; it is not an automated end-to-end browser suite.

## How the project is presented

The repository's screenshots, animated preview and short video are the primary showcase. The animation and video are assembled from captured screens of the working interface, rather than a real-time recording; their timing is editorial and does not measure page-loading speed. The [saved order screenshot](media/demo-order.jpg) shows the end of the demo checkout journey.

For an interactive review, follow the [local quick start](../README.md#quick-start) and use **The collection → choose a variant → Cart → Checkout → Place demo order → Explore demo delivery**. Use the supplied fictional address, refresh the order page to see persistence, then advance the delivery simulation. No website deployment is needed for this presentation.

## Deliberate demo limits

There are no real payments, accounts, emails, shipments, tax calculations or shared inventory reservations. Stock limits apply within each cart; placing multiple orders does not decrement shared stock. Browser storage can be edited or cleared, is local to the browser and is not an authorization boundary. Product photos are illustrative and do not change with colour selection.

The retained Prisma schema is a design reference only. Production commerce would require server-side order ownership, trusted price calculation, atomic inventory reservation, a payment-provider integration and durable storage. These are separate engineering work described in the [extension guide](architecture.md), rather than a setting to switch on in this demo.

## Portfolio summary

**FORMA — Next.js ecommerce storefront** · React, TypeScript, Tailwind CSS, Zustand, Vitest

- Built a responsive storefront covering discovery, variant selection, a persistent cart and guest demo checkout, using one typed catalog throughout the shopping journey.
- Implemented catalog-based price and quantity validation, persistent order snapshots, storage-failure handling and an interactive simulated delivery timeline.
- Packaged an MIT-licensed template with centralized store configuration, bilingual documentation, 27 automated tests and CI checks for lint, tests and production builds.

## 中文项目案例

**FORMA 是一个自然简约风格的电商前端作品，也是 `my-shop` 仓库中的可复用 Next.js 模板。** 它将商品发现、规格选择、持久化购物车、游客模拟结算、订单查看和模拟配送串成完整体验。

### 目标与设计方向

目标是让作品评审者快速看懂项目，并让开发者无需配置数据库、支付服务或账号系统就能运行。暖白、深橄榄色、衬线标题和商品大图用于表达安静的精品店风格。这是设计意图，项目没有据此声称转化率提升或经过用户研究验证。

### 关键决定与取舍

- **统一商品来源。** [商品目录](../src/lib/catalog.ts)为 12 个商品详情页及搜索、筛选、首页提供数据，减少不同页面之间的信息偏差。取舍是商品编辑仍需改代码，目前没有管理后台。
- **让筛选状态进入网址。** [筛选规则](../src/lib/product-filters.ts)支持直接分享和刷新恢复，并处理未知参数。当前在小规模本地目录上筛选，没有接入搜索服务。
- **恢复购物车时重新校验。** [购物车规则](../src/lib/cart.ts)根据商品编号与数量恢复数据，替换旧价格、合并重复项、处理无效规格并限制数量。这保证演示一致性，不代表具备真实交易的服务端安全保障。
- **先保存订单，再清空购物车。** [订单模型](../src/lib/orders.ts)保存独立快照；[结算组件](../src/components/checkout/CheckoutContent.tsx)在保存失败时保留购物车并提示错误。取舍是订单仅存在当前浏览器中，清除存储后会丢失。
- **区分静态商品与浏览器状态。** 商品页面由目录生成，购物车与订单等浏览器数据在客户端就绪后展示。订单会响应跨标签页存储变化，购物车跨标签页更新目前需要刷新。

### 已验证的范围

发布基线包含 **12 个商品详情页、27 个自动测试用例**。[业务规则测试](../src/lib/commerce.test.ts)覆盖筛选、库存与数量、购物车恢复、运费边界、订单快照及异常存储；[结算组件测试](../src/components/checkout/CheckoutContent.test.tsx)覆盖下单、重新挂载后显示订单、保存失败保留购物车及未知订单状态。[CI 记录](https://github.com/SakuraUltra/my-shop/actions/workflows/storefront-checks.yml)可查看具体提交的代码检查、测试和生产构建结果。

这些证据说明实现与验证范围，不代表真实用户量、商业效果、性能提升、跨浏览器完整覆盖或生产安全认证。目前没有自动化端到端浏览器测试，也没有用户研究结果。

### 展示方式与边界

GitHub 中的截图、动图和视频是主要展示材料。动图与视频由实际界面截图串联制作，并非实时录屏，也不能用于判断加载速度。想亲自操作时，按 [README 的本地启动步骤](../README.md#quick-start)运行即可；本阶段无需部署网站。

项目不收款、不注册账号、不发送邮件、不发货、不计算税费，也不共享扣减库存。请使用结算页的虚构地址。订单只保存在当前浏览器中，既不跨设备同步，也不提供身份验证或权限保护。真实商用能力需要单独的后端设计与测试，具体见[架构与扩展说明](architecture.md)。

### 中文简历条目

**FORMA 电商前端与开源模板** · Next.js / React / TypeScript / Tailwind CSS / Zustand / Vitest

- 构建响应式电商体验，覆盖商品搜索筛选、规格选择、持久化购物车、游客模拟结算及订单查看，并统一商品数据来源。
- 实现商品目录驱动的价格与数量校验、订单快照、浏览器存储错误处理和可交互的模拟配送流程。
- 完善品牌视觉、集中配置、中英文文档与 MIT 开源许可，提供 27 个自动测试用例及代码检查、测试、生产构建的 CI 流程。

## One-minute presentation / 一分钟演示顺序

1. **Identity / 视觉：** show desktop and mobile layouts, then explain the boutique design intent.
2. **Discovery / 商品发现：** open **The collection**, select a category, then choose a product variant.
3. **Checkout / 模拟结算：** open the cart and place a demo order using the fictional address.
4. **Persistence / 保存与配送：** refresh the saved order and advance **Explore demo delivery**.

Keep the demo labels visible. Present this as a frontend commerce project and describe only features, tests and outcomes supported by the repository.
