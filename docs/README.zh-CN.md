# FORMA · 可完整体验的电商作品集

**从浏览商品到保存模拟订单，一套可以完整体验的精品店购物流程。**

FORMA 是 **my-shop** 中的示例品牌，也是一个可复用的 **Next.js、React 和 TypeScript** 开源模板。暖白、深橄榄色与编辑式排版构成自然简约的视觉；无需 API 密钥或数据库配置，就能体验“浏览 → 选规格 → 购物车 → 模拟下单 → 查看订单 → 模拟配送”。

[本地启动](#本地启动) · [项目案例](showcase.md) · [v0.1.0 Release](https://github.com/SakuraUltra/my-shop/releases/tag/v0.1.0) · [English](../README.md)

> **这是演示项目：不收款、不发货、不发送邮件，也不需要注册。** 订单只保存在当前浏览器，请使用结算页提供的虚构地址。

## 效果预览

[![FORMA 动态预览：首页、商品列表、商品详情与模拟订单](media/storefront-preview.gif)](https://github.com/SakuraUltra/my-shop/releases/tag/v0.1.0)

[观看 MP4 演示](media/storefront-walkthrough.mp4) · [阅读设计与实现案例](showcase.md)

动图和视频由实际运行界面的截图串联制作，并非实时录屏。启动本地项目后，可以亲自体验页面交互。

[下载离线展示包](https://github.com/SakuraUltra/my-shop/releases/download/v0.1.0/forma-v0.1.0-showcase.zip)：解压 ZIP 后打开 `index.html`，即可浏览包含图片和视频的静态展示；购物交互需要[本地运行项目](#本地启动)。

<details>
<summary>展开查看桌面、手机和订单截图</summary>

![FORMA 桌面首页：暖白底色、橄榄色点缀与商品大图](media/desktop-home.jpg)

| 手机首页                                                             | 模拟订单                                                                            |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| <img src="media/mobile-home.jpg" alt="FORMA 手机首页" width="260" /> | <img src="media/demo-order.jpg" alt="FORMA 模拟订单的商品及金额详情" width="640" /> |

</details>

## 本地启动

使用 Node.js 22.22 或更新版本（推荐 Node 22 LTS）：

```bash
git clone --branch v0.1.0 https://github.com/SakuraUltra/my-shop.git
cd my-shop
npm ci
npm run dev
```

以上命令检出 **v0.1.0** 发布版本；去掉 `--branch v0.1.0` 即可获取最新的 `main` 分支。

打开 [localhost:3000](http://localhost:3000)。无需配置数据库、支付密钥或 `.env`。安装依赖、构建时加载 Google 字体，以及显示 Unsplash 图片需要联网。

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

## 开发与检查

```bash
npm run lint
npm run test:run
npm run build
npm run start
```

数据库设计保留在 `prisma/schema.prisma` 供后续参考，目前应用不会连接数据库。更多实现细节见[架构与扩展说明](architecture.md)。

下一阶段可以完善产品内容编辑和自动化浏览器测试；真实登录、支付和共享库存应作为有明确后端边界的新阶段。

自动检查配置位于 [`.github/workflows/storefront-checks.yml`](../.github/workflows/storefront-checks.yml)，覆盖拉取请求和 `main` 分支更新，也支持手动运行。流程安装锁定依赖，然后执行代码检查、测试和生产构建；仓库令牌仅有读取权限。它不会自动部署网站，具体提交是否通过请以 [GitHub Actions 记录](https://github.com/SakuraUltra/my-shop/actions/workflows/storefront-checks.yml)为准。

## 可选部署

通过 README、Release 素材和本地运行即可了解与体验这个项目。如果希望自行托管，可参考[部署指南](deployment.md)，在构建前将 `NEXT_PUBLIC_SITE_URL` 设置为实际域名。

## 许可证与图片

应用代码采用 [MIT 许可证](../LICENSE)，方便保留署名后复用。示例照片来源与使用说明见英文 README。
