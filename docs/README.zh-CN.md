# My Shop · 可完整体验的电商作品集

这是一个用 Next.js、React 和 TypeScript 构建的简洁商店，也是可继续扩展的店铺模板。重点是让访客完整体验“浏览 → 选规格 → 购物车 → 模拟下单 → 查看订单 → 模拟配送”。

**这是演示项目：不收款、不发货、不发送邮件，也不需要注册。** 订单只保存在当前浏览器，请使用结算页提供的虚构地址。

## 本地启动

使用 Node.js 22.22 或更新版本（推荐 Node 22 LTS）：

```bash
git clone https://github.com/SakuraUltra/my-shop.git
cd my-shop
npm ci
npm run dev
```

打开 http://localhost:3000 。无需配置数据库、支付密钥或 `.env`。安装依赖、构建时加载 Google 字体，以及显示 Unsplash 图片需要联网。

## 本次完善的内容

- 首页、搜索、列表、促销和详情统一使用 12 件示例商品，价格与链接保持一致。
- 分类、颜色、价格和排序保存在网址中，直接打开“新品”链接也会正确排序。
- 购物车支持刷新恢复、数量修改、库存上限和无效数据处理。
- 结算按当前商品目录重新核算价格；满 $49 免模拟运费，否则为 $4.99。
- 订单拥有独立编号和商品快照，可刷新查看；未知订单不会显示虚构的固定记录。
- 配送页面可以手动推进演示状态，不会冒充真实物流查询。
- 手机布局、主题切换、键盘搜索、空状态和错误提示。
- 自动测试与待启用的 GitHub Actions 配置，帮助后续迭代。

## 自定义入口

| 想修改的内容               | 位置                                       |
| -------------------------- | ------------------------------------------ |
| 品牌、币种、运费、仓库链接 | `src/lib/store-config.ts`                  |
| 商品、图片、规格与示例库存 | `src/lib/catalog.ts`                       |
| 首页文案                   | `src/components/home/`                     |
| 颜色和视觉样式             | `src/app/globals.css`                      |
| 正式域名                   | `.env.example` 中的 `NEXT_PUBLIC_SITE_URL` |

金额统一使用整数“分”。修改币种不会自动换算价格。订单不跨设备同步；每个购物车有数量限制，但多个演示订单不会共同扣减库存。税费未接入。

## 检查与上线

```bash
npm run lint
npm run test:run
npm run build
npm run start
```

参考[部署指南](deployment.md)和[架构与扩展说明](architecture.md)。数据库设计保留在 `prisma/schema.prisma` 供后续参考，目前应用不会连接数据库。

下一阶段可以完善独立品牌视觉、产品内容编辑和自动化浏览器测试；真实登录、支付和共享库存应作为有明确后端边界的新阶段。

自动检查配置位于 `docs/storefront-checks.yml`。当前 GitHub 连接没有 `workflow` 权限，尚未启用；之后用具备该权限的连接将它放到 `.github/workflows/ci.yml` 即可。
