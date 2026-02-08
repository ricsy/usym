import { describe, expect, it, vi } from 'vitest'
import { search } from '../../utils/helper'

describe('search function', () => {
  it('should return empty array for empty query', () => {
    expect(search('')).toEqual([])
    expect(search('   ')).toEqual([])
  })

  it('should find symbols by key', () => {
    const results = search('UP')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].key).toContain('UP')
  })

  it('should find symbols by symbol content', () => {
    const results = search('↑')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(r => r.symbol.includes('↑'))).toBe(true)
  })

  it('should find symbols by category name', () => {
    const results = search('arrow')
    expect(results.length).toBeGreaterThan(0)
  })

  it('should support fuzzy search', () => {
    const results = search('arow') // 故意拼错
    expect(results.length).toBeGreaterThan(0)
  })

  it('should accept custom fuse configuration', () => {
    const results = search('UP', {
      config: {
        threshold: 0.1, // 更严格的匹配
        keys: ['key'], // 只搜索 key 字段
      },
    })

    expect(results.length).toBeGreaterThan(0)
    expect(results.every(r => r.key.includes('UP'))).toBe(true)
  })

  it('should use custom handler when provided', () => {
    const mockHandler = vi.fn(data => data.slice(0, 2)) // 返回前2个结果

    const results = search('test', {
      handler: mockHandler,
    })

    expect(mockHandler).toHaveBeenCalledOnce()
    expect(results.length).toBe(2)
  })

  it('should return results with correct structure', () => {
    const results = search('UP')

    expect(results[0]).toHaveProperty('category')
    expect(results[0]).toHaveProperty('key')
    expect(results[0]).toHaveProperty('symbol')
    expect(results[0]).toHaveProperty('searchText')

    expect(typeof results[0].category).toBe('string')
    expect(typeof results[0].key).toBe('string')
    expect(typeof results[0].symbol).toBe('string')
  })
})
