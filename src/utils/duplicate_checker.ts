import {
  SYMBOLS,
} from '../types'
import { count } from './helper'

export interface DuplicateResult {
  symbol: string
  occurrences: Array<{
    category: string
    key: string
    fullPath: string
  }>
  count: number
  isExactDuplicate: boolean
}

export interface DuplicateCheckOptions {
  // 是否检查大小写不敏感的重复
  caseInsensitive?: boolean
  // 是否检查空白字符差异
  ignoreWhitespace?: boolean
  // 是否检查 Unicode 变体
  normalizeUnicode?: boolean
  // 最小重复次数
  minOccurrences?: number
}

/**
 * 检查 SYMBOLS 中的重复符号
 */
export function checkDuplicateSymbols(options: DuplicateCheckOptions = {}): DuplicateResult[] {
  const {
    caseInsensitive = false,
    ignoreWhitespace = false,
    normalizeUnicode = false,
    minOccurrences = 2,
  } = options

  const symbolMap = new Map<string, Array<{ category: string, key: string, fullPath: string }>>()

  // 规范化符号用于比较
  const normalizeSymbol = (symbol: string): string => {
    let result = symbol

    if (caseInsensitive)
      result = result.toLowerCase()

    if (ignoreWhitespace)
      result = result.replace(/\s+/g, ' ').trim()

    if (normalizeUnicode)
      result = result.normalize('NFKC')

    return result
  }

  // 遍历所有分类和键
  Object.entries(SYMBOLS).forEach(([category, symbols]) => {
    Object.entries(symbols).forEach(([key, symbol]) => {
      const normalizedSymbol = normalizeSymbol(symbol)
      const fullPath = `${category}.${key}`

      if (!symbolMap.has(normalizedSymbol)) {
        symbolMap.set(normalizedSymbol, [])
      }
      symbolMap.get(normalizedSymbol)!.push({ category, key, fullPath })
    })
  })

  // 找出重复的符号
  const duplicates: DuplicateResult[] = []

  symbolMap.forEach((occurrences) => {
    if (occurrences.length >= minOccurrences) {
      // 检查是否是精确重复（所有符号完全相同）
      const firstOccurrence = occurrences[0]
      const firstCategory = firstOccurrence.category
      const firstKey = firstOccurrence.key
      const firstOriginalSymbol = (SYMBOLS as any)[firstCategory][firstKey]

      const duplicatedOccurrences: DuplicateResult['occurrences'] = []
      const isExactDuplicate = occurrences.every((occ) => {
        const currentSymbol = (SYMBOLS as any)[occ.category][occ.key]
        const result = currentSymbol === firstOriginalSymbol

        duplicatedOccurrences.push(occ)
        return result
      })

      duplicates.push({
        symbol: firstOriginalSymbol,
        occurrences: duplicatedOccurrences,
        count: occurrences.length,
        isExactDuplicate,
      })
    }
  })

  return duplicates.sort((a, b) => b.count - a.count)
}

/**
 * 获取详细的重复统计信息
 */
export function getDetailedDuplicateStats(options?: DuplicateCheckOptions) {
  const duplicates = checkDuplicateSymbols(options)
  const totalEntries = count()

  const exactDuplicates = duplicates.filter(d => d.isExactDuplicate)
  const similarDuplicates = duplicates.filter(d => !d.isExactDuplicate)

  return {
    summary: {
      totalEntries,
      totalUniqueSymbols: totalEntries - duplicates.reduce((sum, dup) => sum + (dup.count - 1), 0),
      totalDuplicates: duplicates.length,
      exactDuplicates: exactDuplicates.length,
      similarDuplicates: similarDuplicates.length,
    },
    byCategory: getDuplicatesByCategory(duplicates),
    mostCommon: duplicates.slice(0, 10), // 前 10 个最常见的重复
    exactDuplicates,
    similarDuplicates,
  }
}

/**
 * 按分类统计重复
 */
function getDuplicatesByCategory(duplicates: DuplicateResult[]) {
  const categoryMap = new Map<string, number>()

  duplicates.forEach((duplicate) => {
    duplicate.occurrences.forEach((occurrence) => {
      const count = categoryMap.get(occurrence.category) || 0
      categoryMap.set(occurrence.category, count + 1)
    })
  })

  return Array.from(categoryMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}
