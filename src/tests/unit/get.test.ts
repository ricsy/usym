import { describe, expect, it } from 'vitest'
import { SYMBOLS } from '../../types'
import {
  get,
} from '../../utils/helper'

describe('get function', () => {
  it('should return symbol for valid category and key', () => {
    // 测试已知的符号
    expect(get('arrow', 'UP')).toBe(SYMBOLS.ARROW.UP)
    expect(get('arrow', 'DOWN')).toBe(SYMBOLS.ARROW.DOWN)
    expect(get('nature', 'DOG')).toBe(SYMBOLS.NATURE.DOG)
  })

  it('should return fallback for invalid category', () => {
    expect(get('invalid_category' as any, 'UP', SYMBOLS.STATUS.QUESTION)).toBe(SYMBOLS.STATUS.QUESTION)
  })

  it('should return fallback for invalid key', () => {
    expect(get('arrow', 'INVALID_KEY' as any, SYMBOLS.STATUS.QUESTION)).toBe(SYMBOLS.STATUS.QUESTION)
  })

  it('should use default fallback when not provided', () => {
    expect(get('arrow', 'INVALID_KEY' as any)).toBe(SYMBOLS.STATUS.QUESTION)
  })

  it('should handle all symbol categories', () => {
    // 测试每个分类都有响应
    Object.keys(SYMBOLS).forEach((category) => {
      const categoryKeys = Object.keys(SYMBOLS[category as keyof typeof SYMBOLS])
      if (categoryKeys.length > 0) {
        const firstKey = categoryKeys[0]
        expect(get(category as any, firstKey as any)).toBeTypeOf('string')
      }
    })
  })
})
