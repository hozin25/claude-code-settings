---
name: caiyun-picturebook-cards
description: "Use when用户要做抖音/小红书彩铅手绘绘本风图文卡、科普图文、毛选解读类知识图文、或任何'插画+手写体大字'的 swipe cards；也用于 cogview-4 文生图、角色人设一致性、图文卡流水线、发布文案与标题配套。即用 AI 文生图（GLM cogview-4）+ HTML 文字层 + puppeteer 截图，批量产出 1080x1440 图文卡，并配套发布标题/文案/首评。Triggers: 彩铅风, 绘本风, 图文卡, 抖音图文, 科普图文, 毛选图文, cogview, 人设一致, 出一组图文, 1080x1440, 发布文案, 爆款标题."
---

# 彩铅绘本图文卡（cogview-4 流水线）

复刻「毛选绘记」式抖音图文卡的四段流水线：**分镜文案 → cogview-4 文生图（双桶挑片）→ HTML 文字层 → puppeteer 截图**，最后配套发布标题/文案/首评。
本 skill 的全部参数在 4 个真实主题（职场老好人 / AI 焦虑 / 消费降级 / 对抗孤独，共 56+ 页成片）里验证过，含 6 条踩坑铁律。

## When to Use

- 批量产出"彩铅绘本插画 + 顶部手写体论点"的竖屏图文卡（1080×1440，抖音 3:4）
- 需要固定人设跨页出现（绿衣双马尾女主、贯穿角色/道具锚点）
- **不用于**：照片级写实、矢量扁平风（用 code-animation-prompts 的 K 系列）、纯排版卡

## 快速开始

```bash
mkdir project && cd project
# 从本 skill 的 templates/ 复制 lib.mjs gen-images.mjs prompts.mjs 到 scripts/，
# shoot.cjs cards-template.html 到项目根
npm init -y && npm i puppeteer-core
echo "GLM_API_KEY=xxx" > .env   # bigmodel.cn 的 key，cogview-4 需余额（约0.06元/张，1152x1536 档）
node scripts/gen-images.mjs     # 出图到 assets/
node shoot.cjs                  # 截图到 out/（1080x1440 PNG）
```

## 标准量产流程（四篇连载验证过）

1. **分镜**：三段式骨架——痛点钩子(2-3页) → 误区转折+权威金句(2-3页) → 三个方法论"章节页+展开"(7-8页) → 金句收尾(1页)。分镜文案先给用户过目再出图。
2. **双桶出图**：每页先跑一遍存为 `-a.jpg`，再 `--force` 跑一遍存为 `-b.jpg`；用 ffmpeg hstack 拼 A/B 对比图逐页挑优，胜者覆盖回 `page-NN.jpg`。废片率减半，+0.06 元/页。
3. **组版**：单文件 cards.html，每页一个 `<section class="card">`，标题按分镜配 〖高亮〗/红字。长文案页（3-5 行）用 48px 版式。
4. **QC**：截图后用 ffmpeg `xstack` 拼 2×2 网格自查——标题断行、人物/关键道具裁切、标签挡脸、水印入画、人设漂移，全过再交付。
5. **交付**：成片按页码补零命名（01.png…14.png），存入用户指定文件夹的 `第N篇-标题/` 子目录。
6. **发布配套**：按 [references/publish-copy.md](references/publish-copy.md) 的七段式配齐——主推标题（悬念反差型）+ 2-3 备选、发布配文（暴论开头/自白代入/信息缺口/站队提问/5个分层标签）、首评话术（点出最反直觉的一页）。文案避免直呼"教员"。

## 多篇连载约定（同一项目目录复用时）

- 换主题前先归档：`assets/page-*.jpg` 移入 `assets/topicN-标题/`，成片备份到 `out/topicN/`，当前 cards.html 改名 `cards-topicN.html`（gen 脚本靠"文件存在即跳过"缓存，不归档会串篇）
- 每篇的 prompt 全文留在 scripts/prompts.mjs 里随篇覆盖，旧篇自然归档在素材夹里
- 修正类反馈（换图/改文案）直接改 cards.html 或指定 `-a/-b` 备选重选，不必重新出图

## 六条铁律（每条都真实翻过车）

1. **文字绝不进 AI 图**。cogview-4 画中文必乱码（"帮个忙"→"帮个刃"）。标签气泡、对话文字全部由 HTML 层画（绝对定位 `.tag` 组件，文字 100% 精准，改文案不用重出图）。prompt 末尾固定：`Absolutely no text, no letters, no numbers, no symbols, no speech bubbles, no watermark.`
2. **prompt 里禁用 hex 色值**。模型会把 `#2D4A67` 当文字抄进画面角落（实测翻车）。只用色名：grass-green, cream, deep blue night sky。
3. **敏感词雷区**：图内画"毛选"、政治人物相关字样会触发智谱内容审核（HTTP 400, code 1301）。用符号代替：`a plain little red book with a simple gold star emblem`。
4. **风格措辞方向**：用 `Cute polished storybook illustration with soft colored-pencil shading, rounded chibi character design, big sparkling eyes, round pink blush` —— **不要**用 rough/sketchy/wobbly（写重了画面脏丑，实测翻车）。
5. **水印靠裁切消除**：cogview-4 右下角有"AI生成"水印。源图 1152x1536 经 `object-fit:cover` 居中裁进 1080 卡片时，底部约 185px 被裁掉，水印（位于源图底部约 4% 区域）恰好落在窗口外——**无需贴片遮挡**，成品右下角是干净画面。但每张卡 QC 时必须确认水印没露出来（若改了 object-position 偏上裁切变少，水印可能入画，届时改用轻微放大裁掉）。
6. **人设一致性**：无参考图模型的一致性靠 prompt 锚点——所有页共用一字不改的 STYLE 前缀 + CHARACTER 角色块（发型/服装/腮红写死且放在句首加重权重），只换 scene 段。能做到"一眼同一个角色"，脸型仍有细微漂移，属模型天花板；要严格一致上火山 Seedream 参考图模式。

## Prompt 公式（四段式）

```
{STYLE 前缀，一字不改} + {CHARACTER 角色块，一字不改} + {Scene: 本页场景/动作/情绪/道具} + {NEGATIVE 尾缀，一字不改}
```

- 角色库和已验证的 STYLE/NEGATIVE 全文见 [references/style-bible.md](references/style-bible.md)
- 场景段写"关键动作"要具体（`hugs a tall wobbly tower of folders tightly in both arms, the stack covers half her face`），模糊写法（如只写 reading a book）会丢动作
- GEN_CONFIG：`model: cogview-4, size: 1152x1536`（3:4 升档版；3-flash 免费 but 画质差一个档位）

## HTML 文字层系统（cards-template.html）

- 字体：`ZCOOL KuaiLe`（站酷快乐体，最接近参考的手写 marker 风）via `fonts.loli.net`（Google Fonts 国内镜像），fallback KaiTi
- 黄色马克笔高亮：`background:linear-gradient(to top, rgba(255,213,79,.9) 0 24%, transparent 24%)`
- 标题区与 AI 图的拼接缝：img 上 `mask-image:linear-gradient(to bottom, transparent 0, #000 12%)` 渐隐进纸色
- 红底白字标签 `.tag`：`#E85D4A` 圆角气泡 + `::after` 小尾巴，±5° 旋转，绝对定位在角色旁
- 卡片骨架 1080×1440，短文案 64px / 封面 66px / 长文案（3-5 行）48px；截图前 `document.fonts.ready` + 1.5s

## 验收

- 截图后用 Read 看每张 PNG：标题断行（关键词不能拆行）、人脸/关键道具是否被裁（object-position 调）、标签是否挡脸、水印是否入画（见铁律 5）
- 量产每页摇 2 张挑好的（+0.06 元/页，废片率减半）；assets 存 `.v1.jpg` 备份再 --force

## 详细文档

- [references/style-bible.md](references/style-bible.md) — 已验证的 STYLE/NEGATIVE/角色库全文、情绪与符号调参经验、敏感词清单、参数表
- [references/publish-copy.md](references/publish-copy.md) — 发布配套：标题公式、发布配文七段式、首评话术、标签分层、措辞安全
- templates/ — lib.mjs / gen-images.mjs / prompts.mjs（含真实 prompt 示例）/ shoot.cjs / cards-template.html
