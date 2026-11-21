# Style Bible — 已验证的 prompt 资产全文

来源：D:\workspace\card-style-test（职场老好人×毛选样品，cogview-4，2026-11 实测）
使用规则：STYLE / CHARACTER / NEGATIVE 三段**一字不改**地复用，只写 Scene 段。

## STYLE 前缀（全局，每页一字不改）

```
Cute polished storybook illustration with soft colored-pencil shading texture,
rounded chibi character design with clean simple faces, big sparkling eyes, round pink blush,
thin hand-drawn outlines, warm muted earthy palette, warm cream paper background,
cozy douyin picture-book comic style. Clean and adorable, NOT sketchy, NOT 3D, NOT photo.
```

要点：polished/cute 为主方向，colored-pencil shading 提供质感词。禁止 rough / sketchy / wobbly（画面会脏）。

## NEGATIVE 尾缀（全局，每页一字不改）

```
Absolutely no text, no letters, no numbers, no symbols, no speech bubbles, no labels,
no watermark, no signature. Pure illustration only. Vertical composition 1152x1536.
```

## 角色库（CHARACTER 块）

发型/服装写在句首加重权重；颜色只用色名。

### 女主角（贯穿全篇的"我"）

```
the girl protagonist: black hair in two high twin-tail pigtails tied with small red ribbons,
wearing a loose grass-green short-sleeve T-shirt and black shorts,
round pink blush on cheeks, cute expressive face
```

### 老板/父亲类角色

```
a smiling middle-aged man with round glasses, short neat hair, wearing a blue polo shirt
```

### 同事/母亲类角色

```
a woman in an orange-red cardigan with dark hair in a low bun
```

### AI 机器人角色（AI 主题贯穿角色，第二篇验证）

```
a cute rounded robot with soft white panels, gentle glowing blue oval eyes, a small antenna,
stubby friendly limbs
```

新增角色时套用同格式：身份 + 发型 + 服装色名 + 一个记忆点。

## 情绪与符号（第二、三篇补充验证）

- **负面情绪双重强调**：只写"气鼓鼓"模型会默认画笑脸。要写 `皱着眉头、嘴角向下撇……绝不是微笑也不是开心`，把"不要什么"也说明。
- **"争吵符号/对话"会诱发带乱码伪文字的气泡框**：改写为 `头顶上方只飘着红色的漫画怒气符号和小汗滴，没有任何气泡框`。
- **场景里的招牌/横幅/旗帜容易出伪汉字**：prompt 里写 blank / 空白，挑片时优先选伪字较轻的一张。
- **关键动作必须具体**：✅ `hugs a tall wobbly tower of paper folders tightly in both arms, the stack covers half her face` ❌ `carrying files`。模糊写法必丢动作。

## 场景段写法

- 结构：`Scene: {地点/时间}. {主角+关键动作（具体到肢体）}, {情绪外化（汗滴/表情）}. 周围人物各自做什么. {3-5个道具}. {光线/氛围}.`
- 关键动作必须具体：✅ `hugs a tall wobbly tower of paper folders tightly in both arms, the stack covers half her face` ❌ `carrying files`
- 道具承担叙事：一碗汤=鸡汤双关、台灯+夜窗=深夜苦读、金星红皮书=毛选（见下）

## 敏感词清单（智谱内容审核 code 1301，实测触发）

- 图内出现"毛选"字样 → 改 `a little red book with a simple gold star emblem`
- 政治人物形象/名字 → 一律不用人物，用金星、红旗、旧书本等符号语言
- 写文案时这些词放 HTML 层没有限制，只有 AI 图里受限

## 参数表（GEN_CONFIG）

```js
model: 'cogview-4',           // 0.06元/张起，需账户余额；cogview-3-flash 免费 but 画质差一档
size: '1152x1536',            // 3:4 升档版（已验证），缩进 1080 卡更细腻
endpoint: 'https://open.bigmodel.cn/api/paas/v4/images/generations',
```

- cogview-4-5 不存在（实测 400）；cogview-4 即当前最强
- 失败重试：429 余额不足（充值）、1301 内容审核（改 prompt）、偶发网络 fetch failed（脚本已带 3 次指数退避）

## HTML 层参数（cards-template.html）

- 标题：ZCOOL KuaiLe 64-66px，行高 1.55，居中，padding 56px 72px 0
- 高亮：`linear-gradient(to top, rgba(255,213,79,.9) 0 24%, transparent 24%)`
- 标签气泡：#E85D4A，38px 白字，圆角 18px，白描边 3px，小尾巴朝下，±5° 旋转
- 水印贴片：右下 460×130 纸色块 + 页码圆徽（104px，5px 描边）
- 纸色：#F7F2E7；墨色：#3A3532；强调红：#D9534F
