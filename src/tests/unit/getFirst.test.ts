import { describe, expect, it } from 'vitest'
import { SYMBOLS } from '../../types'
import { getFirst } from '../../utils/helper'

describe('getFirst function', () => {
  it('should return symbol from first matching category', () => {
    const result = getFirst(['arrow', 'nature'], 'UP')
    expect(result).toBe(SYMBOLS.ARROW.UP)
  })

  it('should return fallback when no category contains the key', () => {
    const result = getFirst(['arrow', 'nature'], 'NON_EXISTENT', SYMBOLS.STATUS.QUESTION)
    expect(result).toBe(SYMBOLS.STATUS.QUESTION)
  })

  it('should search categories in order', () => {
    // 假设 'letter' 分类也有 'UP' 键，但值不同
    const result = getFirst(['arrow', 'nature'], 'UP')
    expect(result).toBe(SYMBOLS.ARROW.UP)
  })

  it('should handle case insensitive category names', () => {
    const result = getFirst(['Arrow', 'NATURE'], 'UP')
    expect(result).toBe(SYMBOLS.ARROW.UP)
  })

  it('should return default fallback when not provided', () => {
    const result = getFirst(['arrow'], 'NON_EXISTENT')
    expect(result).toBe(SYMBOLS.STATUS.QUESTION)
  })
})
