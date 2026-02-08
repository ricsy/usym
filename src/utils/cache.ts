import type { Emoji } from 'emojibase'
import type { CaseInsensitiveValue, SymbolCategories, SymbolSearchResult } from '../types'
import data from 'emojibase-data/zh/data.json'
import QuickLRU from 'quick-lru'
import {

  SYMBOLS,

} from '../types'
import {
  EMOJIBASE_DATA,
  SYMBOLS_DATA,
} from './fuse'
import { logger } from './logger'

export interface CoverageStats {
  totalEmojiBase: number
  totalInline: number
  covered: number
  missing: number
  notInOfficial: number
  percentage: string
  rate: number
}

export interface CustomData {
  categories: SymbolCategories[]
}

export interface SymbolData {
  emojiBaseSymbols: string[]
  inlineSymbols: string[]
  stats: CoverageStats
  custom: CustomData
  missingSymbols: string[]
  coveredSymbols: string[]
  timestamp: number
}

class CacheManager {
  static instance: CacheManager
  private lru: QuickLRU<string, SymbolData>
  private readonly CACHE_KEY: string = 'symbol_data'
  private readonly emojiBaseData: Emoji[] = data
  private emojiBaseSymbols: string[] = []
  private inlineSymbols: string[] = []

  constructor() {
    this.lru = new QuickLRU<string, SymbolData>({
      maxSize: 10, // 最多缓存 10 个不同的数据
      maxAge: 30 * 60 * 1000, // 30 分钟过期
    })

    this.computeSymbolData()
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager()
    }
    return CacheManager.instance
  }

  /**
   * 计算符号数据
   */
  private computeSymbolData(): SymbolData {
    const emojiBaseSymbols = this.getSymbols(true)
    const inlineSymbols = this.getSymbols(false)

    const emojiBaseSet = new Set(emojiBaseSymbols)
    const inlineSet = new Set(inlineSymbols)

    const covered = emojiBaseSymbols.filter(symbol => inlineSet.has(symbol)).length
    const notInOfficial = inlineSymbols.filter(symbol => !emojiBaseSet.has(symbol)).length
    const missing = emojiBaseSet.size - covered
    const rate = covered / emojiBaseSet.size

    return {
      emojiBaseSymbols,
      inlineSymbols,
      stats: {
        totalEmojiBase: emojiBaseSet.size,
        totalInline: inlineSet.size,
        covered,
        missing,
        notInOfficial,
        percentage: `${(rate * 100).toFixed(2)}%`,
        rate,
      },
      custom: {
        categories: Object.keys(SYMBOLS) as SymbolCategories[],
      },
      missingSymbols: emojiBaseSymbols.filter(item => !inlineSet.has(item)),
      coveredSymbols: inlineSymbols.filter(item => emojiBaseSet.has(item)),
      timestamp: Date.now(),
    }
  }

  /**
   * 获取分类中的所有符号
   */
  getSymbols<T extends SymbolCategories>(
    categoryOrUseEmojiBase?: CaseInsensitiveValue<T> | boolean,
  ): string[] {
    // 判断参数类型
    if (typeof categoryOrUseEmojiBase === 'boolean' && categoryOrUseEmojiBase) {
      if (this.emojiBaseSymbols.length > 0)
        return this.emojiBaseSymbols

      const result = EMOJIBASE_DATA.map(item => item.symbol)
      this.emojiBaseSymbols = result
      return result
    }

    if (this.inlineSymbols.length > 0)
      return this.inlineSymbols

    // 分类参数：获取特定分类的自定义符号
    const category = categoryOrUseEmojiBase
    const filteredData = category
      ? this.filterByCategory(SYMBOLS_DATA, category)
      : SYMBOLS_DATA

    const result = filteredData.map(item => item.symbol)
    this.inlineSymbols = result
    return result
  }

  /**
   * 根据分类过滤数据
   */
  private filterByCategory<T extends SymbolCategories>(
    data: SymbolSearchResult[],
    category: CaseInsensitiveValue<T>,
  ): SymbolSearchResult[] {
    const categories = [category].flat().map(cat => cat.toUpperCase())
    const filteredData = data.filter(item => categories.includes(item.category.toUpperCase()))
    return Array.from(new Set(filteredData))
  }

  /**
   * 获取官方数据
   */
  getEmojiBaseData(): Emoji[] {
    return this.emojiBaseData
  }

  /**
   * 获取数据
   */
  getData(): SymbolData {
    const cached = this.lru.get(this.CACHE_KEY)

    if (cached) {
      logger.debug('📦 使用缓存数据')
      return cached
    }

    logger.debug('🔄 重新计算符号数据')
    const newData = this.computeSymbolData()
    this.lru.set(this.CACHE_KEY, newData)

    return newData
  }

  /**
   * 强制刷新缓存
   */
  refresh(): SymbolData {
    logger.info('🔄 强制刷新缓存')
    const newData = this.computeSymbolData()
    this.lru.set(this.CACHE_KEY, newData)
    return newData
  }

  /**
   * 获取缓存状态
   */
  getCacheStatus() {
    const cached = this.lru.get(this.CACHE_KEY)
    if (!cached)
      return { isCached: false, size: this.lru.size }

    const ageMs = Date.now() - cached.timestamp
    return {
      isCached: true,
      ageMs,
      lastUpdate: new Date(cached.timestamp),
      size: this.lru.size,
      maxSize: this.lru.maxSize,
    }
  }

  /**
   * 清空缓存
   */
  clearCache(): void {
    this.lru.clear()
    logger.info('🗑️ 缓存已清空')
  }

  /**
   * 获取所有缓存键
   */
  getCacheKeys(): string[] {
    return Array.from(this.lru.keys())
  }
}

// 导出单例
export const cacheManager = CacheManager.getInstance()
