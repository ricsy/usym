<h1 style="text-align: center;">Welcome to usym 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/usy" target="_blank">
    <img alt="npm version" src="https://img.shields.io/npm/v/usym.svg" />
  </a>
  <a href="https://github.com/ricsy/usym/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-✓-007ACC.svg" />
  </a>
  <a href="https://bundlephobia.com/package/usym" target="_blank">
    <img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/usym" />
  </a>
  <a href="https://www.npmjs.com/package/usym" target="_blank">
    <img alt="downloads" src="https://img.shields.io/npm/dm/usym" />
  </a>
</p>

> A comprehensive Unicode symbols library with full TypeScript support. Contains 2000+ meticulously organized symbols, emojis, and icons for modern applications.

## ✨ Features

- 🎯 **900+ Symbols** - Comprehensive Unicode coverage with emojis, icons, and special characters
- 🔒 **Type Safe** - Full TypeScript support with autocomplete and type checking
- 📦 **Tree Shakeable** - Import only what you need, zero dependencies
- ⚡ **fewer Dependencies** - Lightweight and fast
- 🎨 **Well Organized** - Symbols categorized logically for easy discovery
- 🔧 **Utility Functions** - Helper functions for common symbol operations
- 🌐 **Browser & Node** - Works in both browser and Node.js environments

## 📦 Installation

```bash
npm install usym
# or
pnpm add usym
# or
yarn add usym
```

## 🚀 Quick Start

### Basic Usage

```typescript
import { SYMBOLS } from 'usym'

// Status indicators
console.log(`${SYMBOLS.STATUS.SUCCESS} Operation completed`)
// => ✅ Operation completed
console.log(`${SYMBOLS.STATUS.ERROR} Something went wrong`)
// => ❌ Something went wrong
console.log(`${SYMBOLS.STATUS.WARNING} Please check configuration`)
// => ⚠️ Please check configuration
```

### Type-safe Access

```typescript
import { Core } from 'usym'

// Safe symbol retrieval with fallback
console.log(Core.get('STATUS', 'SUCCESS', '✓'))
// => ✅
console.log(Core.get('STATUS', 'WARNING', '⚠'))
// => ⚠️
if (Core.has('EMOTION', 'GRINNING')) {
  console.log('Grinning emoji is available!')
}
// => Grinning emoji is available!
```

## 📁 Categories

| Category         | Description                                                     | Examples       |
|------------------|-----------------------------------------------------------------|----------------|
| **`ARROW`**      | Arrows and direction symbols                                    | ⬆️ ⬇️⬅️ ➡️ ↗️  |
| **`DECORATIVE`** | Box-drawing and geometric decorative elements                   | ─ │ ┌ ▀ █      |
| **`EMOTION`**    | Facial expressions and emojis                                   | 😀 😢 😍 🤔 🎉 |
| **`MATH`**       | Mathematical operators, constants, and symbols                  | + − × ÷ =      |
| **`NATURE`**     | Nature, animals, plants, and weather                            | 🌳 🐱 🌈 🌊 ☀️ |
| **`NETWORK`**    | Network connectivity, security, and communication icons         | 📶 🔒 🌐 📡 🔑 |
| **`OBJECT`**     | Common objects, tools, electronic devices, and items            | 🔨 🪛 🪝 🧲 🧪 |
| **`SHAPE`**      | Geometric shapes, color blocks, and basic forms                 | 🔴 🟢 ⭐ ❤️ ⬛   |
| **`STATUS`**     | Status indicators, markers, and feedback symbols                | ✅ ❌ ⚠️ 🔄 ⏳    |
| **`TIME`**       | Time, dates, seasons, and calendar elements                     | 🕐 📅 ⌚ ⏱️ ⏰   |
| **`UI`**         | User interface elements, controls, and actions                  | ⚙️ 🔍 🏠 💾 🎨 |
| **`UNIT`**       | Measurement units, currency symbols, and mathematical constants | ℃ ℉ m  cm  mg  |


## 🛠️ Utility Functions

### Symbol Formatting

```typescript
import { Formatter } from 'usym'

// Create formatted status messages
console.log(Formatter.message('success', 'File saved'))
// => ✅ File saved
console.log(Formatter.message('error', 'Upload failed'))
// => ❌ Upload failed
console.log(Formatter.message('loading', 'Processing...'))
// => ⌛ Processing...

// Create progress bars
console.log(Formatter.progressBar(75, 100, 20))
// =>
console.log(Formatter.colorStatus('green', 'Connected'))
// => 🟢 Connected
console.log(Formatter.colorStatus('red', 'Disconnected'))
// => 🔴 Disconnected
```

### Symbol Search

```typescript
import { Core } from 'usym'

// Search for symbols by name
console.log( Core.search('heart'))
// => Returns: [{ category: 'SHAPE', key: 'HEART', symbol: '❤️', searchText: 'heart ❤️ shape' }, ...]

// Search for specific symbols
console.log( Core.search('hand'))
// => Returns: [{ category: 'EMOTION', key: 'HAND_OK', symbol: '👌', searchText: 'hand_ok 👌 emotion' }, ...]
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the https://github.com/ricsy/usym/issues.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💎 Show your support

Give a ⭐️ if this project helped you!

## 🎯 Roadmap

- [ ] Add more symbols and categories
- [ ] Create React component library
- [ ] Add SVG icon variants
- [ ] Create browser extension for symbol lookup
- [ ] Add CLI tool for symbol search

---
