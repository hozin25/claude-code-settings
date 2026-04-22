# claude-code-settings

这是一个**用于沉淀/同步 Claude Code（或 Cursor Agent）相关配置资产**的仓库，主要包含三类内容：

- **`agents/`**：可复用的子代理（sub-agent）定义，用于“定位/分析/找模式/查笔记/网页研究”等研究型任务分工。
- **`commands/`**：可复用的命令模板（工作流），用于初始化文档、代码库研究、产出计划并按计划实现、浏览器/ADB 自动化开发等。
- **`skills/`**：技能手册（How-to），把常见领域（浏览器自动化、Android 自动化、Clojure↔Python、SQL 构建、UI 组件用法、项目架构概念）整理成可直接照抄的操作步骤与参考。

> 说明：本仓库以 Markdown 为主，目标是“可读、可复制、可复用”。具体如何加载到你的 Claude Code / Cursor 环境，取决于你本地的配置目录约定；你可以把这些文件按目录结构复制/同步到你的工具配置目录中使用。

## 目录结构

```text
agents/      子代理定义（定位/分析/模式/笔记/网页研究）
commands/    命令模板（初始化、研究、计划、实现、自动化等工作流）
skills/      技能手册（浏览器/ADB/SQL/Clojure-Python/组件/架构概念）
```

## agents（子代理）

这些文件用于把“研究型工作”拆给不同子代理，各司其职、输出结构化结果。

- **`agents/codebase-locator.md`**：只负责“找在哪里”（Grep/Glob/LS），把相关文件按用途分组，不读深层实现。
- **`agents/codebase-analyzer.md`**：只负责“怎么工作”（Read + 精准引用），追数据流/入口/关键函数，强调 `file:line` 证据。
- **`agents/codebase-pattern-finder.md`**：只负责“现成例子/相似实现”，提取可复用模式与代码片段并标注位置。
- **`agents/thoughts-locator.md`**：在 `thoughts/` 笔记体系里找相关文档并分类（共享/个人/全局/可搜索索引）。
- **`agents/thoughts-analyzer.md`**：对少量最相关的 thoughts 文档做“高价值提炼”，过滤噪音，输出决策/约束/规格。
- **`agents/web-search-researcher.md`**：需要外部资料时做网页研究（WebSearch/WebFetch），按来源与引用组织结论。

## commands（命令模板）

这些文件描述了一套可重复执行的工作流（通常用于让 Agent 按步骤协作完成任务）。

- **`commands/init.md`**：初始化代码库文档（扫描 `src/` 子目录、为每个目录产 `summary.md`，并生成顶层 `AGENTS.md` 总览）。
- **`commands/research.md`**：代码库研究工作流（强调“只描述现状，不做建议/批评”），可并行调用 locator/analyzer/pattern-finder 与 thoughts 系列子代理。
- **`commands/create_plan.md`**：交互式产出实现计划（先读上下文→并行调研→收敛方案→写入计划模板，包含自动化/手工验收标准）。
- **`commands/implement_plan.md`**：按 `thoughts/shared/plans/` 的既定计划分阶段实现，并按计划中的 success criteria 验证。
- **`commands/browser_automation.md`**：交互式浏览器自动化开发工作流（以 Playwright/页面状态感知→动作→反馈循环推进）。
- **`commands/adb_automation.md`**：交互式 ADB/UIAutomator 自动化开发工作流（强调只在一个 Clojure namespace 内迭代）。
- **`commands/add-module.md`**：把“子模块”注册进某个 base 的操作清单（前端注册：extension functions/路由/render；后端注册：api/command-handler/query-handler）。

## skills（技能手册）

`skills/` 目录下每个子目录通常包含 `SKILL.md`（有的还有进阶/参考文档），用于在特定领域快速落地。

### 自动化相关

- **`skills/bitbrowser/SKILL.md`**：通过 Clojure evaluation 管理 BitBrowser（打开浏览器、列出 profile、获取 CDP ws endpoint）。
- **`skills/cdp-browser/SKILL.md`**：通过 Playwright API + CDP 控制“已有浏览器”（强调用 wait 系列函数替代 `Thread/sleep`）。
- **`skills/uiautomator-cljpy/SKILL.md`**：用 `uiautomator2` 做 Android UI 自动化（连接设备、找元素、点击/输入/滑动、截图/层级导出等）。

### Clojure / 数据相关

- **`skills/libpython-clj/SKILL.md`**：通过 `libpython-clj2` 在 Clojure 内嵌 Python 解释器（模块导入、`py.`/`py.-` 调用、类型转换、env 初始化范式）。
- **`skills/honeysql/SKILL.md`**（附 `QUERIES.md` / `REFERENCE.md` / `ADVANCED.md`）：用 HoneySQL 把 Clojure 数据结构安全地格式化成参数化 SQL。

### 前端组件/架构概念

- **`skills/replicant-table-component/SKILL.md`**：Replicant 的表格组件使用手册（过滤、选择、多选、分页、CRUD、与 query handler 对接）。
- **`skills/architecture/SKILL.md`**：项目内常见架构术语与约定（`base/component`、`system`、`view-function`、`action/action-handler`、interpolate 等概念说明）。

## 使用建议（实践路径）

- **做代码库调研/回答“在哪里/怎么做/有没有类似例子”**：优先使用 `agents/` 里的 `codebase-*` 系列分工，再用 `commands/research.md` 的流程组织输出。
- **要落地一个需求**：先用 `commands/create_plan.md` 产出可执行计划，再用 `commands/implement_plan.md` 按阶段实现与验证。
- **做自动化脚本**：网页用 `commands/browser_automation.md` + `skills/cdp-browser`/`skills/bitbrowser`；Android 用 `commands/adb_automation.md` + `skills/uiautomator-cljpy`。

