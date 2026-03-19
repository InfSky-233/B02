export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  tags: string[]
  readingTime: number
}

export const categories = ['技术', '设计', '随笔', '工具'] as const

export const posts: Post[] = [
  {
    id: 'react-server-components',
    title: '理解 React Server Components 的设计哲学',
    excerpt: '从架构层面剖析 RSC 如何重新定义前后端边界，以及它对现代 Web 开发范式的深远影响。',
    content: `
React Server Components（RSC）并不只是一个新的 API，它代表了 React 团队对 Web 应用架构的重新思考。

## 为什么需要 Server Components

传统的 React 应用面临一个根本性的矛盾：我们希望组件化地组织代码，但客户端渲染意味着所有代码（包括数据获取逻辑）都需要发送到浏览器。

\`\`\`tsx
// 传统方式：数据获取和渲染耦合在客户端
function ArticleList() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(setArticles)
  }, [])

  return articles.map(a => <Article key={a.id} {...a} />)
}
\`\`\`

这种模式带来了三个问题：瀑布式请求、包体积膨胀、以及客户端计算的浪费。

## Server Components 的解法

RSC 的核心思路是让组件在服务端执行，只将渲染结果（而非组件代码）发送到客户端：

\`\`\`tsx
// Server Component：代码永远不会发送到客户端
async function ArticleList() {
  const articles = await db.query('SELECT * FROM articles')
  return articles.map(a => <Article key={a.id} {...a} />)
}
\`\`\`

这意味着：数据库查询库、Markdown 解析器、日期格式化库——这些只在服务端使用的依赖永远不会出现在客户端 bundle 中。

## 设计哲学的转变

RSC 的设计哲学可以概括为「让正确的事情变得容易」。组件默认在服务端运行，只有显式标记 \`'use client'\` 的组件才会在客户端执行。

这种默认值的选择体现了一种重要的设计理念：与其让开发者手动优化（大多数人不会做），不如让框架在架构层面解决问题。

## 写在最后

RSC 不是银弹，它引入了新的复杂度。但它提出的问题是正确的：在组件化的世界里，我们是否能找到比「全部发送到客户端」更好的方案？答案显然是肯定的。
    `.trim(),
    date: '2024-12-15',
    category: '技术',
    tags: ['React', '架构', '前端'],
    readingTime: 8,
  },
  {
    id: 'minimalist-design-principles',
    title: '少即是多：极简设计的七个原则',
    excerpt: '好的设计不是没有东西可以加，而是没有东西可以减。探讨如何在界面设计中践行减法美学。',
    content: `
Dieter Rams 说过：「好的设计是尽可能少的设计。」这句话在数字产品设计中比在工业设计中更加适用。

## 原则一：内容即界面

最好的界面是看不见的界面。当用户能够毫无阻碍地获取信息时，界面就完成了它的使命。

\`\`\`
视觉元素的优先级：
1. 内容本身
2. 导航与操作
3. 装饰与品牌
\`\`\`

## 原则二：留白是最有力的设计元素

留白不是「什么都没有」，它是积极的设计选择。适当的留白能够：

- 建立清晰的视觉层级
- 引导用户的注意力
- 营造呼吸感和品质感

## 原则三：限制色彩的使用

一个中性色基底加上一个点缀色，足以表达大多数界面需要传达的信息。过多的颜色只会制造视觉噪音。

## 原则四：字体即个性

只使用 1-2 种字体，通过字重和大小的变化来建立层级。每增加一种字体，都需要有充分的设计理由。

## 原则五：动画服务于理解

动画的目的是帮助用户理解界面状态的变化，而不是炫技。0.3 秒的淡入淡出比 2 秒的弹跳动画更有品质感。

## 原则六：一致性胜过创造性

在交互模式上保持一致，让用户只需要学习一次。创造性应该体现在解决问题的方式上，而不是每个按钮的样式上。

## 原则七：设计是做减法

每添加一个元素，都问自己：「没有它可以吗？」如果答案是肯定的，那就删掉它。
    `.trim(),
    date: '2024-11-28',
    category: '设计',
    tags: ['设计', '极简主义', 'UI'],
    readingTime: 6,
  },
  {
    id: 'typescript-type-gymnastics',
    title: 'TypeScript 类型体操：从入门到实用',
    excerpt: '类型体操不是炫技，它是构建类型安全系统的必要能力。通过实际案例学习高级类型技巧。',
    content: `
TypeScript 的类型系统是图灵完备的，这意味着你几乎可以在类型层面完成任何计算。但实际工作中，我们需要的不是炫技，而是用类型来保护业务逻辑。

## 条件类型：类型层面的 if-else

\`\`\`typescript
type IsString<T> = T extends string ? true : false

type A = IsString<'hello'>  // true
type B = IsString<42>       // false
\`\`\`

## 模板字面量类型

这是 TypeScript 4.1 引入的强大特性，允许在类型层面进行字符串操作：

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`

type ClickEvent = EventName<'click'>  // 'onClick'
type FocusEvent = EventName<'focus'>  // 'onFocus'
\`\`\`

## 递归类型：处理深层嵌套

\`\`\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K]
}
\`\`\`

## infer 关键字：类型推断

\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : never

type UnpackPromise<T> = T extends Promise<infer U>
  ? U
  : T
\`\`\`

## 实际应用：类型安全的路由

\`\`\`typescript
type Route = '/users/:id' | '/posts/:slug/comments'

type ExtractParams<T extends string> =
  T extends \`\${string}:\${infer Param}/\${infer Rest}\`
    ? { [K in Param]: string } & ExtractParams<Rest>
    : T extends \`\${string}:\${infer Param}\`
      ? { [K in Param]: string }
      : {}
\`\`\`

类型体操的价值不在于写出多复杂的类型，而在于让错误在编译期被发现，而不是在用户的浏览器里。
    `.trim(),
    date: '2024-11-10',
    category: '技术',
    tags: ['TypeScript', '前端', '类型系统'],
    readingTime: 10,
  },
  {
    id: 'building-second-brain',
    title: '构建你的第二大脑：个人知识管理实践',
    excerpt: '在信息过载的时代，如何有效地捕获、组织和运用知识，建立属于自己的知识管理系统。',
    content: `
每天我们接收的信息量远超大脑的处理能力。问题不是信息太少，而是我们缺乏一套系统来管理它们。

## PARA 方法

Tiago Forte 提出的 PARA 方法将所有信息分为四类：

- **Projects**（项目）：有明确目标和截止日期的事项
- **Areas**（领域）：需要持续维护的职责范围
- **Resources**（资源）：可能在未来有用的参考材料
- **Archive**（归档）：已完成或不再活跃的内容

## 渐进式摘要

不要试图一次性理解所有内容。渐进式摘要的方法是：

1. 第一遍：收藏原文
2. 第二遍：加粗关键段落
3. 第三遍：高亮核心句子
4. 第四遍：用自己的话写摘要
5. 第五遍：转化为可执行的行动

## 工具不是重点

很多人花了 80% 的时间在选择和配置工具上，却只花了 20% 的时间在实际的知识管理上。工具只是容器，重要的是你放进去的内容和取出来的洞察。

## 连接的力量

知识的价值不在于储存，而在于连接。当你在两个看似无关的笔记之间建立联系时，创新就会自然发生。

这也是为什么双向链接和知识图谱如此受欢迎——它们可视化了知识之间的关系。
    `.trim(),
    date: '2024-10-22',
    category: '随笔',
    tags: ['知识管理', '效率', '方法论'],
    readingTime: 7,
  },
  {
    id: 'terminal-workflow',
    title: '终端工作流：提升 10 倍开发效率的工具链',
    excerpt: '从 Shell 配置到终端复用器，分享一套经过打磨的终端工具链，让命令行成为你最强大的 IDE。',
    content: `
作为开发者，终端是我们每天打交道最多的工具之一。一套经过精心配置的终端环境能显著提升开发体验。

## Shell：Zsh + Oh My Zsh

\`\`\`bash
# 安装 Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 推荐插件
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  z
  fzf
)
\`\`\`

## 终端复用：tmux

tmux 让你在一个终端窗口中管理多个会话，即使断开连接也不会丢失工作状态：

\`\`\`bash
# 创建新会话
tmux new -s project

# 分割窗格
Ctrl+b %  # 垂直分割
Ctrl+b "  # 水平分割
\`\`\`

## 现代化命令行工具

用现代替代品替换传统命令：

- \`ls\` → \`eza\`（更好的文件列表）
- \`cat\` → \`bat\`（带语法高亮）
- \`find\` → \`fd\`（更直觉的搜索）
- \`grep\` → \`ripgrep\`（更快的搜索）
- \`cd\` → \`zoxide\`（智能目录跳转）

## 文件管理：yazi

yazi 是一个现代的终端文件管理器，支持图片预览、批量操作，比传统的 ranger 快很多。

## 编辑器：Neovim

如果你愿意投入时间学习，Neovim 可以成为一个极其高效的开发工具。关键不是记住所有快捷键，而是逐步地将重复操作自动化。

工具本身并不重要，重要的是它们是否能减少你从「想法」到「实现」之间的摩擦。
    `.trim(),
    date: '2024-10-05',
    category: '工具',
    tags: ['终端', '效率', '工具链'],
    readingTime: 9,
  },
  {
    id: 'css-has-selector',
    title: 'CSS :has() 选择器改变了一切',
    excerpt: '被称为「CSS 的缺失环节」的 :has() 选择器终于得到了全面支持，它将彻底改变我们编写样式的方式。',
    content: `
\`:has()\` 选择器是 CSS 历史上最具变革性的新特性之一。它让我们第一次能够基于子元素的状态来选择父元素。

## 基础用法

\`\`\`css
/* 选择包含图片的卡片 */
.card:has(img) {
  grid-column: span 2;
}

/* 选择包含必填字段的表单 */
form:has(:required) {
  border-left: 3px solid hsl(216, 54%, 23%);
}
\`\`\`

## 实际应用场景

### 响应式布局

\`\`\`css
/* 当容器内有超过 3 个子元素时切换布局 */
.grid:has(> :nth-child(4)) {
  grid-template-columns: repeat(2, 1fr);
}
\`\`\`

### 表单验证

\`\`\`css
/* 输入框验证失败时高亮标签 */
label:has(+ input:invalid) {
  color: red;
}
\`\`\`

### 主题切换

\`\`\`css
/* 根据 toggle 状态切换主题 */
html:has(#dark-mode:checked) {
  color-scheme: dark;
}
\`\`\`

## 它为什么重要

在 \`:has()\` 之前，CSS 只能「向下」选择——父元素影响子元素。现在我们可以「向上」选择——子元素的状态影响父元素的样式。

这意味着很多以前需要 JavaScript 才能实现的交互，现在纯 CSS 就能完成。更少的 JS = 更好的性能。

## 浏览器支持

截至 2024 年底，所有现代浏览器都已支持 \`:has()\`。是时候在生产环境中使用它了。
    `.trim(),
    date: '2024-09-18',
    category: '技术',
    tags: ['CSS', '前端', '选择器'],
    readingTime: 6,
  },
]

export function getPostById(id: string): Post | undefined {
  return posts.find(p => p.id === id)
}

export function getPostsByCategory(category: string): Post[] {
  return posts.filter(p => p.category === category)
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter(p => p.tags.includes(tag))
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  posts.forEach(p => p.tags.forEach(t => tagSet.add(t)))
  return Array.from(tagSet).sort()
}

export function getAllCategories(): string[] {
  return Array.from(new Set(posts.map(p => p.category))).sort()
}
