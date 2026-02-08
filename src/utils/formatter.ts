import type {
  ColorStatusType,
  StatusType,
} from '../index'
import {
  SYMBOLS,
} from '../index'

/**
 * 消息
 * @param type 消息类型
 * @param message 消息
 * @param options 选项
 * @param options.spacing 间隔，默认 1
 * @param options.separator 分隔符
 * @param options.formatter 格式化函数
 * @returns 状态消息
 */
export function message(
  type: StatusType,
  message: string,
  options?: {
    spacing?: number
    separator?: string
    formatter?: (message: string) => string
  },
): string {
  const { spacing = 1, separator, formatter } = options || {}
  const symbols = {
    success: SYMBOLS.STATUS.SUCCESS,
    error: SYMBOLS.STATUS.ERROR,
    warning: SYMBOLS.STATUS.WARNING,
    info: SYMBOLS.STATUS.INFO,
    loading: SYMBOLS.TIME.HOURGLASS_DONE,
  }

  const sep = separator ?? ' '.repeat(spacing)
  const result = `${symbols[type]}${sep}${message}`
  return formatter ? formatter(result) : result
}

/**
 * 进度条
 * @param current 当前进度
 * @param total 总进度
 * @param length 进度条长度
 * @param options 选项
 * @param options.openAndCloseTags 打开和关闭标签
 * @param options.filledChar 填充字符
 * @param options.emptyChar 空字符
 * @param options.showPercentage 是否显示百分比
 */
export function progressBar(
  current: number,
  total: number,
  length: number = 20,
  options?: {
    openAndCloseTags?: [string, string]
    filledChar?: string
    emptyChar?: string
    showPercentage: boolean
  },
): string {
  const { openAndCloseTags = ['[', ']'], showPercentage = false, filledChar = SYMBOLS.SHAPE.SQUARE, emptyChar = SYMBOLS.SHAPE.SQUARE_WHITE || '□' } = options || {}
  const percentage = total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0
  const filledLength = Math.round(percentage * length)
  const emptyLength = length - filledLength

  const bar = filledChar.repeat(filledLength) + emptyChar.repeat(emptyLength)
  const [openTag, closeTag] = openAndCloseTags
  const result = `${openTag}${bar}${closeTag}`

  if (showPercentage) {
    const percentageText = `${Math.round(percentage * 100)}%`
    return `${result} ${percentageText}`
  }

  return result
}

/**
 * 彩色状态指示
 * @param color 颜色类型
 * @param text 文本
 */
export function colorStatus(
  color: ColorStatusType,
  text: string,
): string {
  const colors: Record<ColorStatusType, string> = {
    red: SYMBOLS.SHAPE.CIRCLE_RED,
    orange: SYMBOLS.SHAPE.CIRCLE_ORANGE,
    yellow: SYMBOLS.SHAPE.CIRCLE_YELLOW,
    green: SYMBOLS.SHAPE.CIRCLE_GREEN,
    blue: SYMBOLS.SHAPE.CIRCLE_BLUE,
    purple: SYMBOLS.SHAPE.CIRCLE_PURPLE,
    brown: SYMBOLS.SHAPE.CIRCLE_BROWN,
    black: SYMBOLS.SHAPE.CIRCLE_BLACK,
    white: SYMBOLS.SHAPE.CIRCLE_WHITE,
  }

  return `${colors[color]} ${text}`
}
