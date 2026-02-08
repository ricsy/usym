import { describe, expect, it } from 'vitest'
import { has } from '../../utils/helper'

describe('has function', () => {
  it('should return detailed result for existing symbol', () => {
    const result = has('arrow', 'UP')

    expect(result.exists).toBe(true)
    expect(result.found).toHaveLength(1)
    expect(result.found[0].category).toBe('ARROW')
    expect(result.found[0].key).toBe('UP')
    expect(result.missing).toHaveLength(0)
  })

  it('should return detailed result for non-existing symbol', () => {
    const result = has('arrow', 'NON_EXISTENT')

    expect(result.exists).toBe(false)
    expect(result.found).toHaveLength(0)
    expect(result.missing).toHaveLength(1)
    expect(result.missing[0].category).toBe('ARROW')
    expect(result.missing[0].key).toBe('NON_EXISTENT')
  })

  it('should handle multiple keys', () => {
    const result = has('arrow', ['UP', 'DOWN', 'NON_EXISTENT'])

    expect(result.exists).toBe(true)
    expect(result.found).toHaveLength(2)
    expect(result.missing).toHaveLength(1)

    // 检查找到的键
    const foundKeys = result.found.map(item => item.key)
    expect(foundKeys).toContain('UP')
    expect(foundKeys).toContain('DOWN')

    // 检查缺失的键
    expect(result.missing[0].key).toBe('NON_EXISTENT')
  })

  it('should handle multiple categories', () => {
    const result = has(['arrow', 'nature'], 'UP')

    expect(result.exists).toBe(true)
    expect(result.found.length).toBeGreaterThan(0)

    // 检查是否在多个分类中查找
    const categories = result.found.map(item => item.category)
    expect(categories).toContain('ARROW')
  })

  it('should handle case insensitive inputs', () => {
    const result1 = has('arrow', 'up')
    const result2 = has('ARROW', 'UP')
    const result3 = has('Arrow', 'Up')

    expect(result1.exists).toBe(true)
    expect(result2.exists).toBe(true)
    expect(result3.exists).toBe(true)
  })

  it('should return missing entries for non-existing category', () => {
    const result = has('invalid_category' as any, 'UP')

    expect(result.exists).toBe(false)
    expect(result.found).toHaveLength(0)
    expect(result.missing).toHaveLength(1)
    expect(result.missing[0].category).toBe('INVALID_CATEGORY')
    expect(result.missing[0].key).toBe('UP')
  })
})
