import { describe, expect, it } from 'vitest'
import { SYMBOLS } from '../../types'
import {
  get,
  getKeys,
  has,
  search,
} from '../../utils/helper'

describe('edge cases', () => {
  it('should handle empty arrays in has function', () => {
    const result1 = has([], 'UP')
    expect(result1.exists).toBe(false)

    const result2 = has('arrow', [])
    expect(result2.exists).toBe(false)
  })

  it('should handle empty arrays in getKeys', () => {
    const result = getKeys([] as any)
    expect(result).toEqual([])
  })

  it('should handle empty string inputs', () => {
    const result1 = get('' as any, 'UP')
    expect(result1).toBe(SYMBOLS.STATUS.QUESTION)

    const result2 = has('' as any, '')
    expect(result2.exists).toBe(false)
  })

  it('should handle special characters in search', () => {
    const results = search('↑') // 直接搜索符号
    expect(results.length).toBeGreaterThan(0)
  })

  it('should handle very long queries in search', () => {
    const longQuery = 'a'.repeat(100)
    const results = search(longQuery)
    expect(Array.isArray(results)).toBe(true)
  })
})
