import { describe, expect, it } from 'vitest'
import {
  get,
  getCategories,
  getFirst,
  getKeys,
  has,
  search,
} from '../../utils/helper'

describe('integration tests', () => {
  // 执行大量的循环操作，需要增加测试超时时间
  it('should work together correctly', () => {
    const categories = getCategories()
    expect(categories.length).toBeGreaterThan(0)

    // 测试每个分类
    categories.forEach((category) => {
      const keysResult = getKeys(category)
      expect(keysResult.length).toBeGreaterThan(0)

      // 测试每个键
      keysResult.forEach(({ key }) => {
        // 测试 get 函数
        const symbol = get(category, key)
        expect(typeof symbol).toBe('string')
        expect(symbol.length).toBeGreaterThan(0)

        // 测试 has 函数
        const hasResult = has(category, key)
        expect(hasResult.exists).toBe(true)
        expect(hasResult.found[0].key).toBe(key)

        // 测试搜索功能
        const searchResults = search(key)
        expect(searchResults.length).toBeGreaterThan(0)
      })

      // 测试 getFirst
      if (keysResult.length > 0) {
        const firstKey = keysResult[0].key
        const firstSymbol = getFirst([category], firstKey)
        expect(firstSymbol).toBe(get(category, firstKey))
      }
    })
  }, 30000)
})
