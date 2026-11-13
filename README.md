# 好东西秀场 · Zoe 作品集

这是已确认网页的 GitHub Pages 静态部署代码包。图片、视频和网页字体均已包含，不需要安装依赖、运行构建或配置 API 密钥。

## 上传到 GitHub Pages

1. 解压代码包，把里面的**全部文件和文件夹**上传到仓库根目录。`index.html` 必须直接位于根目录，不要再套一层文件夹，也不要只上传 ZIP 本身。
2. 仓库 Settings → Pages → Build and deployment：选择 **Deploy from a branch**，分支选实际上传的分支（一般是 `main`），目录选 **/(root)**，保存。
3. 等 GitHub 完成发布后，打开 Pages 页面显示的网址。项目仓库子目录也适用，无须修改素材路径。

如果电脑默认隐藏 `.nojekyll`，可在 GitHub 中用 Add file → Create new file 新建同名空文件。这个文件用于让 Pages 直接发布静态资源。

本包没有修改或上传任何 GitHub 仓库，也没有替换现有 Sites 上的线上版本。

## 文件说明

| 文件或目录 | 用途 |
| --- | --- |
| `index.html` | 网页入口、固定导航和二维码滤镜 |
| `app.js` | 章节渲染、哈希路由、轮播、展开、滚动和提示动画 |
| `styles.css` | 合并后的完整样式，含手机布局、光影参数和减少动态效果设置 |
| `featured.json` | 主页各章节的文字、图片、视频和外链 |
| `details.json` | 五个详情页的完整正文与引用框 |
| `assets/`、`source-assets/` | 页面使用的素材，保留原有中文文件名 |
| `fonts/` | 网页字体及原有来源、版权说明 |
| `tests/` | 交互逻辑、计时和边界条件回归测试 |
| `scripts/verify.py` | 素材路径、内容完整性和文件校验检查 |
| `AUDIT.md` | 本次清理与审查记录 |
| `checksums.json` | 文件 SHA-256 校验清单 |

`styles.css` 保留了原始样式的覆盖顺序，并清除了已废弃组件的专用规则。继续修改时请修改这个文件，不要再重新引入旧版 revision 样式表。主视觉光影参数集中在标注的 lighting 参数区域。

## 本地预览

在解压后的目录打开终端：

```sh
python3 -m http.server 8000
```

然后在浏览器打开 `http://localhost:8000/`。

请通过 HTTP 服务预览。直接双击 `index.html` 会使用 `file://`，浏览器可能阻止 JSON 内容与画布图片的读取。

## 检查代码

无需安装 npm 包。使用 Python 3 与 Node.js 18 或以上：

```sh
python3 scripts/verify.py
node --check app.js
node --test tests/*.cjs
```

修改文件后，旧的校验清单会提示相应文件变化；这是预期行为。确认改动后可重新生成校验清单：

```sh
python3 scripts/update-checksums.py
```

## 后续维护

- 页面使用 `#/p1` 至 `#/p5` 和 `#/chapter/...` 哈希路由，详情页刷新不会向 Pages 请求不存在的服务器路径。
- 文案中的 HTML 只来自本包受维护的 JSON 文件，不是开放投稿入口；编辑时保持标签闭合。若以后接入不受信任的用户输入，应先增加 HTML 消毒处理。
- 摄影图片附有实际宽高以预留布局空间；换图时也请更新 `app.js` 的 `imageDimensions` 对应项。
- 继续增加中文文案时，注意原有网页字体是子集。新增字如未覆盖会使用系统字体回退，需要统一字形时再生成字体子集。
- 公众号、飞书等站外链接仍由相应平台提供，是否能打开取决于其访问权限和客户端环境。
- 保留原站 `noindex,nofollow` 设置。若日后希望搜索引擎收录，可自行调整 `index.html` 对应 meta。
