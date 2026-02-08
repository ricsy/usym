import { describe, expect, it } from 'vitest'
import { getKeys } from '../../utils/helper'

describe('getKeys function', () => {
  it('should return keys with category info for existing category', () => {
    const keys = getKeys('arrow')

    expect(Array.isArray(keys)).toBe(true)
    expect(keys.length).toBeGreaterThan(0)

    // 检查返回结构
    expect(keys[0]).toHaveProperty('category')
    expect(keys[0]).toHaveProperty('key')

    // 检查键名
    const keyNames = keys.map(item => item.key)
    expect(keyNames).toContain('UP')
    expect(keyNames).toContain('DOWN')

    // 检查分类
    expect(keys.every(item => item.category === 'ARROW')).toBe(true)
  })

  it('should return empty array for non-existing category', () => {
    const keys = getKeys('non_existing_category' as any)
    expect(keys).toEqual([])
  })

  it('should handle multiple categories', () => {
    const keys = getKeys(['arrow', 'nature'] as any)

    expect(keys.length).toBeGreaterThan(0)

    // 检查是否包含多个分类的键
    const categories = keys.map(item => item.category)
    const uniqueCategories = [...new Set(categories)]

    expect(uniqueCategories.length).toBeGreaterThan(1)
    expect(uniqueCategories).toContain('ARROW')
    expect(uniqueCategories).toContain('NATURE')
  })

  it('should handle case insensitive category names', () => {
    const keys1 = getKeys('arrow')
    const keys2 = getKeys('ARROW')
    const keys3 = getKeys('Arrow')

    expect(keys1.length).toBeGreaterThan(0)
    expect(keys2.length).toBeGreaterThan(0)
    expect(keys3.length).toBeGreaterThan(0)

    // 所有大小写变体应该返回相同的结果
    expect(keys1.map(item => item.key).sort()).toEqual(keys2.map(item => item.key).sort())
  })
})
