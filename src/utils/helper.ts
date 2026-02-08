import type { CoverageStats } from './cache'
import type { Emoji } from 'emojibase'
import type {
  AnyCase,
  CaseInsensitiveValue,
  CaseInsensitiveValues,
  SymbolCategories,
  SymbolKey,
  SymbolSearchOptions,
  SymbolSearchResult,
} from '../types'
import {
  SYMBOLS,
} from '../index'
import {
  cacheManager,
} from './cache'
import {
  createFuse,
  OFFICIAL_DATA,
  SYMBOLS_DATA,
} from './fuse'

/**
 * 获取符号 - 单个分类
 */
export function get<T extends SymbolCategories>(
  category: AnyCase<T>,
  key: string,
  fallback: string = SYMBOLS.STATUS.QUESTION,
): string {
  const upperCategory = category.toUpperCase() as T
  const categoryObj = SYMBOLS[upperCategory]

  if (!categoryObj)
    return fallback

  return (categoryObj[key.toUpperCase() as SymbolKey<T>] || fallback) as string
}

/**
 * 批量获取符号 - 多个分类
 */
export function getFirst<T extends SymbolCategories>(
  categories: CaseInsensitiveValues<T>,
  key: string,
  fallback: string = SYMBOLS.STATUS.QUESTION,
): string {
  for (const category of categories) {
    const result = get(category, key, fallback)
    if (result !== fallback)
      return result
  }
  return fallback
}

/**
 * 搜索符号
 */
export function search(query: string, options?: SymbolSearchOptions): SymbolSearchResult[] {
  const { official = false, config, handler } = options || {}

  if (!query.trim())
    return []

  return handler
    ? handler(official ? OFFICIAL_DATA : SYMBOLS_DATA)
    : createFuse(config as any).search(query).map(result => result.item)
}

/**
 * 检查符号是否存在 - 返回详细结果
 */
export function has<T extends SymbolCategories>(
  category: CaseInsensitiveValue<T>,
  key: CaseInsensitiveValue<string>,
): {
  exists: boolean
  found: Array<{ category: T, key: string }>
  missing: Array<{ category: T, key: string }>
} {
  const categories = Array.isArray(category) ? category : [category]
  const keys = Array.isArray(key) ? key : [key]

  const found: Array<{ category: T, key: string }> = []
  const missing: Array<{ category: T, key: string }> = []

  for (const cat of categories) {
    const upperCategory = cat.toUpperCase() as T
    const categoryObj = SYMBOLS[upperCategory]

    if (categoryObj) {
      for (const k of keys) {
        const lowerKey = k.toLowerCase()
        const validKey = Object.keys(categoryObj).find(
          validKey => validKey.toLowerCase() === lowerKey,
        )

        if (validKey) {
          found.push({ category: upperCategory, key: validKey })
        }
        else {
          missing.push({ category: upperCategory, key: k.toString() })
        }
      }
    }
    else {
      // 分类不存在，所有键都缺失
      keys.forEach((k) => {
        missing.push({ category: upperCategory, key: k.toString() })
      })
    }
  }

  return {
    exists: found.length > 0,
    found,
    missing,
  }
}

/**
 * 获取官方数据
 */
export function getOfficialData(): Emoji[] {
  return cacheManager.getOfficialData()
}

/**
 * 获取分类数量
 */
export function getCategoriesCount(): number {
  return getCategories().length
}

/**
 * 获取所有分类
 */
export function getCategories(): SymbolCategories[] {
  return cacheManager.getData().custom.categories
}

/**
 * 获取所有符号
 */
export function getSymbols(official: boolean = false): string[] {
  return official
    ? cacheManager.getData().officialSymbols
    : cacheManager.getData().customSymbols
}

/**
 * 获取符号数量
 */
export function count(official: boolean = false): number {
  return official
    ? cacheManager.getData().stats.totalOfficial
    : cacheManager.getData().stats.totalCustom
}

/**
 * 获取分类中的键 - 返回带分类信息的扁平列表
 */
export function getKeys<T extends SymbolCategories>(
  category: CaseInsensitiveValue<T>,
): Array<{ category: T, key: SymbolKey<T> }> {
  const categories = Array.isArray(category) ? category : [category]
  const result: Array<{ category: T, key: SymbolKey<T> }> = []

  for (const cat of categories) {
    const upperCategory = cat.toUpperCase() as T
    const categoryObj = SYMBOLS[upperCategory]

    if (categoryObj) {
      const keys = Object.keys(categoryObj) as SymbolKey<T>[]
      keys.forEach((key) => {
        result.push({ category: upperCategory, key })
      })
    }
  }

  return result
}

/**
 * 获取数据
 */
export function getStats(): CoverageStats {
  return cacheManager.getData().stats
}
