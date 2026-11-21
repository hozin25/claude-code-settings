---
name: flow-walkthrough
description: 按一次请求的执行流程，像讲故事一样跟踪数据在函数之间的传递——先用口语说清「首先…接下来哪个函数处理…」，再贴该函数的关键代码片段，然后解释代码。用于面试讲解「这个功能/系统是怎么跑的」「请求从头到尾经过哪些函数」「数据怎么流转」。触发词：「按流程讲」「从头到尾讲一遍」「这个功能怎么跑的」「请求流程」「数据怎么流转」「哪个函数处理」「参数从哪来」「面试讲流程」「帮我理一遍流程」「端到端讲」「这条链路」；英文 "walkthrough / trace the flow / how does it work end to end / which function handles X / request lifecycle / data flow"。当用户给一个功能或主题名（如「多agent协作」「token 流式」「HITL 确认」）并想理解完整链路时使用。
---

# Flow Walkthrough — 按函数数据流讲代码（讲课式）

## 概述

用户要能像讲课一样讲清楚「一次请求从用户打字到屏幕显示，数据怎么从一个函数流到下一个」。每一步三段式：**口语过渡 → 关键代码片段 → 解释**。口语过渡把数据流串成故事（「首先用户输入，接下来 X 函数负责处理」），代码片段让讲解落地，解释点清参数来源和作用。面试里这套讲法证明你理解系统是「怎么一步步跑起来的」，比背模块清单有说服力得多。

**三个核心原则，按顺序：**

1. **先问主题，再开讲。** 永远不要假设用户想讲什么。skill 启动第一件事是问「你想研究哪个功能/主题的完整流程？」，拿到主题后再动。
2. **函数级 + 三段式。** 每个函数讲成：①一句口语过渡（数据从哪来、接下来谁处理）②该函数的关键代码片段（3-8 行核心，不是整个函数）③解释（参数来源、作用、下游）。不要停在「这个文件负责 X」。
3. **讲故事，不堆清单。** 口语过渡句把函数串成一条叙事链（首先…接下来…然后…最后…），让用户像听故事一样听完整个流程。代码是配角，解释是桥梁。

## When to Use

- 用户说「按流程讲 / 从头讲 / 理一遍 / 怎么跑的 / 数据怎么流 / 哪个函数处理 / 参数从哪来」。
- 用户给一个功能或主题名（多agent协作、token 流式、HITL、文件工具……）并问完整链路。
- 面试准备场景下，用户想练「这个系统是怎么工作的」整段口述。

## When NOT to Use

- 用户只想看某个具体函数实现 → 直接读码回答。
- 用户要一份可存档的静态文档（带流程图、行号引用）→ 用 `/research`。
- 用户只问单点问题（「这个文件干嘛的」）→ 直接答。
- 主题不属于「一次请求的生命周期」（如「怎么配 API Key」「怎么打包」）→ 直接答。

## 交互流程

### Step 0 — 先问主题（必做，不要跳过）

skill 启动第一句问用户想研究哪个主题。给基于本项目的候选 + 允许自由输入：

> 你想研究哪个功能/主题的完整流程？例如：多agent协作 / token 流式输出 / 文件读写工具 / HITL 危险操作确认 / shell 命令 / web 搜索 / 对话历史持久化 / 上下文用量指示 / 或直接说一个功能名。

拿到主题前**不要**讲任何函数。

### Step 1 — 画骨架（极简导航）

一行一阶段，标**强相关** vs **经过**，让用户先看到地图，不展开。

```
0  用户输入                  [经过]
1  IPC 下行                  [经过]
2  handler → agent 运行时     [强相关：...]
3  工具层                     [强相关：...]
...
```

### Step 2 — 三段式讲数据流（核心）

骨架之后，**按链路顺序连续讲完所有相关阶段**。每个函数用三段式：

**① 口语过渡**（1-2 句）：数据从上一站来到这里，接下来由哪个函数处理。用「首先 / 接下来 / 然后 / 最后」串起来。

**② 关键代码片段**：贴该函数 3-8 行核心代码（带文件路径注释），只贴与数据流相关的几行，**不要整个函数全文**。用 ```代码块``` 包裹。

**③ 解释**（2-3 句）：参数从哪来（上游返回值 / store / 配置 / 用户输入）、这段代码做了什么、结果传给下游谁。

**规则：**
- 经过阶段：口语一句带过 + 可能贴 1-2 行代码，不展开。
- 强相关阶段：完整三段式。
- 代码片段聚焦数据流：能看到「参数进来 → 做了什么 → 传给谁」即可，省略错误处理/边界分支等无关行（用 `...` 省略）。
- 不贴整个函数、不给行号。
- 链路很长（>6 个强相关函数）才分段，否则一口气讲完。

### Step 3 — 收束串联

讲完后用一句话把整条函数链串成故事——这是面试最值钱的一句：

> 「所以你输入的消息，先被 chat store 的 `send` 接住，`runTurn` 把它连同 workspace/history/modelId 打包送过 IPC，preload 的 `agent.run` 转发到主进程，`runAgent` 给根 agent 挂上 delegate 工具；根 agent 决定委派时调 delegate，它用 `buildSubTools` 限定工具集后起一个子 agent，子 agent 的事件被盖戳 agentId 流回，`reduceChatEvent` 按身份归组，最后 `MessageList` 显示成带标签的气泡。」

然后给选项：某个函数深挖 / 换主题再走一遍。

### Step 4 — 整理成 Markdown 文档（收尾交付）

讲完后把**整条链路汇总成一份完整的 Markdown 文档**交付——可存档、可复习、面试前能快速过一遍的成品。结构：

1. **标题 + 一句概述**：主题是什么、整条链路一句话。
2. **骨架**：阶段 0–N 的一行地图，标强相关/经过。
3. **各阶段三段式**：把 Step 2 讲过的每个阶段（口语过渡 + 代码片段 + 解释）原样收录，端到端不跳步。
4. **收束串联**：Step 3 那句故事化的总览。
5. **关键文件清单**：本主题涉及的所有文件路径 + 一句话作用，方便跳转。

**保存位置**：默认 `walkthroughs/<主题>.md`（如 `walkthroughs/多agent协作.md`），用户指定别处就别处。**代码片段必须来自真实读取的代码，不编**——文档比对话长寿，编错代码坑的是未来的自己。

## 讲解格式样例（照这个味道）

以「用户输入 → IPC 下行」为例：

---

**阶段0 · 用户输入**

首先，用户在输入框打字点发送。这条消息进入 chat store 的 `send` 函数：

```ts
// src/renderer/src/stores/chat.ts
send: async (text, attachments) => {
  const workspace = state.workspace
  if (!workspace || !text.trim() || state.isRunning) return
  ...
  await runTurn({ text, attachments, convId, workspace, history, existing, now })
}
```

`send` 收到 `text`（用户输入）和 `attachments`（附件）。它先校验工作区存在、内容非空、没在跑，然后把 user 消息和 running 占位的 assistant 消息塞进列表，最后调 `runTurn` 把数据往下传。`workspace` 来自 store 里用户选的工作区。

接下来，`runTurn` 负责把消息送进主进程：

```ts
// src/renderer/src/stores/chat.ts
await window.api.agent.run(
  args.text, args.workspace, get().modelId || undefined, args.attachments, args.history
)
```

`runTurn` 先订阅了 `onEvent`（用来接主进程回流的事件），再调 `window.api.agent.run`，把 text、workspace、modelId、attachments、history 五个值送过 IPC。`modelId` 来自 UI 选的模型。

**阶段1 · IPC 下行**

`window.api.agent.run` 其实是 preload 暴露的桥，它把这次调用转发成 IPC：

```ts
// src/preload/index.ts
run: (message, workspace, modelId, attachments, history) =>
  ipcRenderer.invoke('agent:run', { message, workspace, modelId, attachments, history }),
```

这里把五个参数打包成一个对象，通过 `ipcRenderer.invoke` 送进主进程的 `agent:run` 通道。到这步，渲染进程交棒，数据进了主进程，下一步由主进程的 `ipcMain.handle('agent:run')` 接住。

---

## 全链路函数数据流参考（本项目专属）

下面是本项目一次请求的完整往返，标注**关键函数名 + 参数来源 + 作用 + 下游**。讲解时按主题挑相关阶段、按上面三段式展开。函数签名以实际代码为准——过时或拿不准时**读码确认，不要编**。

### 阶段 0 · 用户输入（renderer）
- `src/renderer/src/stores/chat.ts` → `send(text, attachments)` —— 组件入口。push 消息后调 `runTurn`。
- `src/renderer/src/stores/chat.ts` → `runTurn({ text, attachments, convId, workspace, history, existing, now })` —— 共享生命周期：订阅 `onEvent` → 调 `agent.run` → turn 终态后持久化。`workspace`/`history`/`modelId` 都从 store state 取。

### 阶段 1 · IPC 下行（preload）
- `src/preload/index.ts` → `agent.run(message, workspace, modelId, attachments, history)` —— 转发成 `ipcRenderer.invoke('agent:run', {...})`。渲染与主进程的唯一桥。
- `src/preload/index.ts` → `onEvent(cb)` —— 订阅 `ipcRenderer.on('agent:event')`，返回取消订阅函数。（回流用）
- `src/shared/types.ts` —— `AgentApi` / `AgentEvent` 类型，两进程共享的真相源。

### 阶段 2 · main handler → agent 运行时
- `src/main/ipc/index.ts` → `ipcMain.handle('agent:run', (event, payload: RunPayload))` —— 接 IPC。构造 `onEvent`（= `webContents.send('agent:event')`）、`AbortController`、`ConfirmManager`；`roles = getRoleStore(userData).list()`（**每次 run 快照**，防运行中改）。调 `runAgent`。
- `src/main/agent/index.ts` → `runAgent({ message, workspace, modelId, attachments, history, signal, confirm, onEvent, mcpTools, roles })` —— 运行时入口。
- `src/main/agent/index.ts` → `executeOnce()` —— 单次 ReAct 尝试：`createLlm(modelId)` + `getTools(...)` + （`roles.length > 0` 时）`makeDelegate({...})` + `createReactAgent({ llm, tools, prompt })`。每次重试重建。
- `src/main/agent/llm.ts` → `createLlm(modelId)` —— 选模型（GLM 默认 / DeepSeek）。
- `src/main/agent/prompts.ts` —— 根 agent 系统提示词。

### 阶段 3 · 工具层
- `src/main/agent/tools/index.ts` → `getTools(workspace, onEvent, confirm, mcpTools)` —— 注册根 agent 工具集（read/write/shell/search/todo/web...）。
- 多agent入口：`src/main/agent/tools/delegate.ts` → `makeDelegate({ workspace, emit, confirm, mcpTools, parentModelId, parentSignal, depth: 0, roles })` —— 造 delegate 工具。`roles` 注入工具描述（LLM 据此选角色）。
- delegate 工具被调用时（`delegate.ts` 内部）：生成 `agentId` → 从 `roles` 取角色 config → `buildSubTools` 按白名单过滤 → `createReactAgent` 起子 agent → 子 agent 事件经 `subEmit` 盖戳 `agentId`/`agentName` 转发根 `emit` → `summary` 作为工具返回值还根 agent。
- `src/main/agent/tools/subTools.ts` → `buildSubTools({ allowedTools, depth, ... })` —— 子 agent 工具白名单。`TOOL_FACTORIES` 无 delegate 条目 → 子 agent 无法再委派。
- `src/main/agent/confirm.ts` → `ConfirmManager` + `request(tool, input, origin?)` —— HITL 确认，危险工具走它。

### 阶段 4 · 角色系统（仅主题相关）
- `src/main/agent/roles/defaults.ts` —— `DEFAULT_ROLES`（researcher/coder/tester/reviewer 出厂定义）。
- `src/main/agent/roles/config-store.ts` → `list/add/update/remove/resetBuiltin` —— 持久化到 `<userDataDir>/roles-config.json`，覆盖式存储。
- `src/main/agent/roles/index.ts` → `getRoleStore(userData)` —— 进程单例。
- `src/main/ipc/roles.ts` → `roles:list/add/update/remove/resetBuiltin` —— 给 UI 的 CRUD 通道。

### 阶段 5 · 流式回流 main → preload → renderer
- 主进程 `onEvent` → `webContents.send('agent:event', evt)`（`ipc/index.ts`）。
- preload `ipcRenderer.on('agent:event')` → 转给 renderer 回调。
- `src/renderer/src/stores/chat.ts` → `runTurn` 内 `onEvent` 订阅 → 喂给 reducer。
- `src/renderer/src/stores/chatReducer.ts` → `reduceChatEvent(state, event)` —— 纯函数，把每个 `AgentEvent` 归约成 `ChatMessage` 更新；按 `agentId` 区分主/子 agent、扁平归组。

### 阶段 6 · UI 渲染
- `src/renderer/src/components/MessageList.tsx` —— 渲染消息气泡、工具气泡；子 agent 用 `agentName` 标签 + `msg--subagent` class 区分。

## 主题 → 阶段映射

| 主题 | 强相关阶段 | 关键函数 |
|---|---|---|
| 多agent协作 | 2、3、4、5、6 | `makeDelegate` / `buildSubTools` / `getRoleStore` / `reduceChatEvent`(agentId 归组) / `MessageList`(agentName) |
| token 流式输出 | 2、5、6 | `executeOnce`(streamMode messages) / `reduceChatEvent`(message-delta) / `MessageList` |
| 文件读写工具 | 3 | `getTools` / `resolveInWorkspace` 沙箱 |
| HITL 危险确认 | 3、5、6 | `ConfirmManager.request` / `confirm-request` 事件 / `respondConfirmation` |
| shell 命令 | 3 | `run_shell_command` 工具（含 background） |
| web 搜索/抓取 | 3 | `web_fetch`/`web_search`（undici ProxyAgent） |
| 对话历史持久化 | 0、1、2 | `runTurn`(持久化) / `buildHistoryMessages` |
| 上下文用量指示 | 2、5、6 | `context-usage` 事件 / `reduceChatEvent` / 工具栏 |

## 风格约束

- **三段式**：口语过渡 → 关键代码片段 → 解释。缺一不可。
- **函数级**：最小单位是函数。代码片段贴的是某个函数内部的核心几行。
- **代码片段要短**：3-8 行，聚焦数据流（参数进来 → 做什么 → 传给谁），用 `...` 省略无关分支。绝不贴整个函数。
- **口语讲故事**：用「首先 / 接下来 / 然后 / 最后」把函数串成叙事，别干列。
- **参数来源必写**：解释里点清每个关键参数来自上游/store/配置/用户输入。
- **相对路径**：代码块用 `// src/...` 注释标路径，不用绝对路径。
- **端到端闭环**：从用户打字讲到屏幕显示，不中途起、不中途断。
- **诚实**：函数名/代码拿不准 → 读码确认，不编。编错代码是面试里最致命的。

## 验证（怎么算讲完了）

讲完后用户应能：
- [ ] 像讲故事一样复述整条函数链（从打字到显示）。
- [ ] 看到每个关键函数的代码片段，说清参数来源和作用。
- [ ] 回答「如果改函数 X，链路上哪些下游会受影响」。

## Quick Reference

| 问题 | 答案 |
|---|---|
| 第一步？ | 问主题，拿到前不开讲。 |
| 讲多深？ | 函数级三段式：口语过渡 + 代码片段 + 解释。 |
| 代码贴多少？ | 3-8 行核心，聚焦数据流，不贴整个函数。 |
| 怎么组织？ | 问主题 → 骨架 → 按链路连续讲完 → 一句话串联收束。 |
| 节奏？ | 一口气讲完相关阶段，别每段停下问。链路 >6 函数才分段。 |
| 起点终点？ | UI 打字 → IPC 下行 → agent → 工具 → 流式回流 → UI 显示。 |
| 拿不准？ | 读码确认，不编函数名/代码。 |
