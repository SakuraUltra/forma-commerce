# FORMA · 可完整体验的电商作品集

FORMA 是 **my-shop** 开源模板中的示例品牌，用 Next.js、React 和 TypeScript 构建。暖白、深橄榄色、商品大图与留白构成自然简约的精品店视觉。访客可以完整体验“浏览 → 选规格 → 购物车 → 模拟下单 → 查看订单 → 模拟配送”。

**这是演示项目：不收款、不发货、不发送邮件，也不需要注册。** 订单只保存在当前浏览器，请使用结算页提供的虚构地址。

[English](../README.md) · [作品介绍与演示脚本](showcase.md) · [架构与扩展说明](architecture.md)

## 效果预览

![FORMA 桌面首页：暖白底色、橄榄色点缀与商品大图](media/desktop-home.jpg)

| 手机首页                                                             | 模拟订单                                                                            |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| <img src="media/mobile-home.jpg" alt="FORMA 手机首页" width="260" /> | <img src="media/demo-order.jpg" alt="FORMA 模拟订单的商品及金额详情" width="640" /> |

[观看简短演示](media/storefront-walkthrough.mp4)

演示视频由实际界面截图串联制作，用于展示购物流程，并非实时录屏。从顶部的 **The collection** 进入商品列表即可亲自体验。

## 本地启动

使用 Node.js 22.22 或更新版本（推荐 Node 22 LTS）：

```bash
git clone https://github.com/SakuraUltra/my-shop.git
cd my-shop
npm ci
npm run dev
```

打开 http://localhost:3000 。无需配置数据库、支付密钥或 `.env`。安装依赖、构建时加载 Google 字体，以及显示 Unsplash 图片需要联网。

## 功能与设计

- 首页、搜索、列表、促销和详情统一使用 12 件示例商品，价格与链接保持一致。
- 分类、颜色、价格和排序保存在网址中，直接打开“新品”链接也会正确排序。
- 购物车支持刷新恢复、数量修改、库存上限和无效数据处理。
- 结算按当前商品目录重新核算价格；满 $49 免模拟运费，否则为 $4.99。
- 订单拥有独立编号和商品快照，可刷新查看；未知订单不会显示虚构的固定记录。
- 配送页面可以手动推进演示状态，不会冒充真实物流查询。
- 手机布局、主题切换、键盘搜索、空状态和错误提示。
- 自然简约的 FORMA 品牌视觉，以及桌面、手机和订单展示素材。
- 自动测试与 GitHub Actions 配置，帮助后续迭代。

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

下一阶段可以完善产品内容编辑和自动化浏览器测试；真实登录、支付和共享库存应作为有明确后端边界的新阶段。

自动检查配置位于 [`.github/workflows/storefront-checks.yml`](../.github/workflows/storefront-checks.yml)，覆盖拉取请求和 `main` 分支更新，也支持手动运行。流程安装锁定依赖，然后执行代码检查、测试和生产构建；仓库令牌仅有读取权限。它不会自动部署网站，具体提交是否通过请以 [GitHub Actions 记录](https://github.com/SakuraUltra/my-shop/actions/workflows/storefront-checks.yml)为准。

应用代码采用 [MIT 许可证](../LICENSE)，方便保留署名后复用。示例照片来源与使用说明见英文 README。
