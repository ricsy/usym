import type {
  SymbolCategories,
  SymbolSearchOptions,
  SymbolSearchResult,
} from '../types'
import data from 'emojibase-data/zh/data.json'
import Fuse from 'fuse.js'
import {
  castArray,
  union,
} from 'lodash-es'
import {
  SYMBOLS,
} from '../types'

/**
 * emojibase 数据
 */
export const EMOJIBASE_DATA: SymbolSearchResult[] = data.map(item => ({
  category: item.group as any,
  key: item.hexcode,
  symbol: item.emoji,
  searchText: `${(castArray(item.emoji)).concat(union(item.label || [], item.tags || [])).filter(Boolean)?.join(' ') || ''}`.toLowerCase(),
}))

/**
 * 应用数据
 */
export const SYMBOLS_DATA: SymbolSearchResult[] = Object.entries(SYMBOLS).flatMap(([category, symbols]) =>
  Object.entries(symbols).map(([key, symbol]) => ({
    category: category as SymbolCategories,
    key,
    symbol,
    searchText: `${key} ${symbol} ${category}`.toLowerCase(),
  } as SymbolSearchResult)),
)

/**
 * 默认 Fuse 实例
 */
export const defaultFuse = createFuse({
  useEmojiBase: false,
  config: {
    // 搜索字段
    keys: ['key', 'symbol', 'category'],
    // 搜索阈值
    threshold: 0.3,
    // 搜索结果包含分数
    includeScore: true,
  },
})

/**
 * 创建 Fuse 实例
 */
export function createFuse(options?: Pick<SymbolSearchOptions, 'useEmojiBase' | 'config'>): Fuse<SymbolSearchResult> {
  const { useEmojiBase = false, config } = options || {}
  return config ? new Fuse(useEmojiBase ? EMOJIBASE_DATA : SYMBOLS_DATA, config) : defaultFuse
}
