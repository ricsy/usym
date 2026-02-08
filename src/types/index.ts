import type { IFuseOptions } from 'fuse.js'
import { ARROW } from '../categories/arrow'
import { DECORATIVE } from '../categories/decorative'
import { EMOTION } from '../categories/emotion'
import { MATH } from '../categories/math'
import { NATURE } from '../categories/nature'
import { NETWORK } from '../categories/network'
import { OBJECT } from '../categories/object'
import { SHAPE } from '../categories/shape'
import { STATUS } from '../categories/status'
import { TIME } from '../categories/time'
import { UI } from '../categories/ui'
import { UNIT } from '../categories/unit'

// 统一导出所有符号分类
export const SYMBOLS = {
  ARROW,
  DECORATIVE,
  EMOTION,
  MATH,
  NATURE,
  NETWORK,
  OBJECT,
  SHAPE,
  STATUS,
  TIME,
  UI,
  UNIT,
} as const

/**
 * 符号分类类型
 */
export type SymbolCategories = keyof typeof SYMBOLS

/**
 * 符号键类型
 */
export type SymbolKey<T extends SymbolCategories> = keyof (typeof SYMBOLS)[T]

/**
 * 状态类型
 */
export type StatusType = 'success' | 'error' | 'warning' | 'info' | 'loading'

/**
 * 颜色状态类型
 */
export type ColorStatusType = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'brown' | 'black' | 'white'

/**
 * 符号搜索结果类型
 */
export interface SymbolSearchResult {
  category: SymbolCategories
  key: string
  symbol: string
  searchText: string
}

export interface SymbolSearchOptions {
  /**
   * 是否搜索官方数据
   */
  official?: boolean
  /**
   * 搜索配置
   */
  config?: IFuseOptions<SymbolSearchResult>
  /**
   * 自定义处理函数
   */
  handler?: (data: SymbolSearchResult[]) => SymbolSearchResult[]
}

/**
 * 表示字符串的大小写不敏感形式
 * 包含原始字符串的各种大小写变体
 */
export type AnyCase<T extends string>
  = T
    | Uppercase<T> // 任意大小写形式
    | Lowercase<T> // 任意大小写形式
    | Capitalize<Lowercase<T>> // 首字母大写: "Text"
    | Uncapitalize<Uppercase<T>> // 首字母小写: "tEXT"

/**
 * 大小写不敏感的值列表
 */
export type CaseOptions<T extends string> = Array<AnyCase<T>>

/**
 * 灵活的大小写不敏感的数组
 */
export type CaseInsensitiveValues<T extends string> = CaseOptions<T>

/**
 * 灵活的大小写不敏感的单个值或值数组
 */
export type CaseInsensitiveValue<T extends string> = CaseOptions<T> | AnyCase<T>
