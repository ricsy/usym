import { describe, expect, it } from 'vitest'
import { SYMBOLS } from '../../types'
import {
  getCategories,
  getKeys,
} from '../../utils/helper'

describe('categories and keys functions', () => {
  describe('getCategories', () => {
    it('should return all available categories', () => {
      const categories = getCategories()
      const expectedCategories = Object.keys(SYMBOLS)

      expect(categories).toEqual(expectedCategories)
      expect(categories.length).toBeGreaterThan(0)
    })

    it('should return array of strings', () => {
      const categories = getCategories()

      expect(Array.isArray(categories)).toBe(true)
      categories.forEach((category) => {
        expect(typeof category).toBe('string')
      })
    })
  })

  describe('getKeys', () => {
    it('should return keys for existing category', () => {
      const data = getKeys('arrow')

      expect(Array.isArray(data)).toBe(true)
      expect(data.length).toBeGreaterThan(0)
      expect(data.some(item => item.category === 'ARROW' && item.key === 'UP')).toBe(true)
      expect(data.some(item => item.category === 'ARROW' && item.key === 'DOWN')).toBe(true)
    })

    it('should return empty array for non-existing category', () => {
      const keys = getKeys('non_existing_category' as any)

      expect(keys).toEqual([])
    })

    it('should return all keys for each category', () => {
      const categories = getCategories()

      categories.forEach((category) => {
        const keys = getKeys(category)
        const expectedKeys = Object.keys(SYMBOLS[category]).map(key => ({
          category,
          key,
        }))

        expect(keys.sort()).toEqual(expectedKeys.sort())
      })
    })
  })
})
