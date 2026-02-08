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

- 🎯 **2000+ Symbols** - Comprehensive Unicode coverage with emojis, icons, and special characters
- 🔒 **Type Safe** - Full TypeScript support with autocomplete and type checking
- 📦 **Tree Shakeable** - Import only what you need, zero dependencies
- ⚡ **Zero Dependencies** - Lightweight and fast, no external dependencies
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
// => ✓ Operation completed
console.log(`${SYMBOLS.STATUS.ERROR} Something went wrong`)
// => ❌ Something went wrong
console.log(`${SYMBOLS.STATUS.WARNING} Please check configuration`)
// => ⚠️ Please check configuration
```

### Type-safe Access

```typescript
import { getSymbol } from 'usym/utils'
// Check if symbol exists
import { hasSymbol } from 'usym/utils'

// Safe symbol retrieval with fallback
const successIcon = getSymbol('STATUS', 'SUCCESS', '✓')
const warningIcon = getSymbol('STATUS', 'WARNING', '⚠')
if (hasSymbol('EMOTIONS', 'GRINNING')) {
  console.log('Grinning emoji is available!')
}
```

### Import Specific Categories

```typescript
import { EMOTIONS, STATUS, UI } from 'usym/categories'

console.log(`${STATUS.SUCCESS} Success!`)
console.log(`${EMOTIONS.GRINNING} Welcome!`)
console.log(`${UI.SETTINGS} Open settings`)
```

## 📁 Categories

| Category       | Description                   | Examples        |
|----------------|-------------------------------|-----------------|
| **`STATUS`**   | Status indicators and markers | ✅ ❌ ⚠️ 🔄 ⏳     |
| **`SHAPES`**   | Geometric shapes and colors   | 🔴 🟢 🔵 ⭐ ❤️   |
| **`ARROWS`**   | Arrows and direction symbols  | ↑ ↓ ← → ↻ ↺     |
| **`UI`**       | User interface elements       | ⚙️ 🔍 🏠 📁 💾  |
| **`NATURE`**   | Nature, animals, and plants   | 🌳 🐱 🐶 🌈 🌊  |
| **`EMOTIONS`** | Facial expressions and emojis | 😀 😢 😍 🤔 🎉  |
| **`OBJECTS`**  | Objects, tools, and items     | 🔨 📁 💻 📱 🎵  |
| **`TIME`**     | Time, dates, and weather      | 🕐 ☀️ 🌧️ ❄️ 📅 |
| **`NETWORK`**  | Network and communication     | 📶 🔒 🌐 📡 🔑  |
| **`MISC`**     | Miscellaneous symbols         | ∞ π € $ © ®     |

## 🛠️ Utility Functions

### Symbol Formatting

```typescript
import { createProgressBar, createStatusMessage } from 'usym/utils'
// Output: [███████████████░░░░] 75%
// Create color-coded status
import { createColorStatus } from 'usym/utils'

// Create formatted status messages
const successMsg = createStatusMessage('success', 'File saved')
// => ✅ File saved
const errorMsg = createStatusMessage('error', 'Upload failed')
// => ❌ Upload failed
const loadingMsg = createStatusMessage('loading', 'Processing...')
// => 🔄 Processing...

// Create progress bars
const progress = createProgressBar(75, 100, 20)
const onlineStatus = createColorStatus('green', 'Connected')
// => 🟢 Connected
const offlineStatus = createColorStatus('red', 'Disconnected')
// => 🔴 Disconnected
```

### Symbol Search

```typescript
import { searchSymbols } from 'usym/utils'

// Search for symbols by name
const results = searchSymbols('heart')
// Returns: [{ category: 'SHAPES', key: 'HEART', symbol: '❤️' }, ...]

// Search for specific symbols
const smileResults = searchSymbols('smile')
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
