import type {
  ColorStatusType,
  StatusType,
} from '../index'
import {
  SYMBOLS,
} from '../index'

/**
 * 状态消息
 * @param type 状态类型
 * @param message 消息
 * @param options 选项
 * @param options.spacing 间隔，默认 1
 * @param options.separator 分隔符
 * @param options.formatter 格式化函数
 * @returns 状态消息
 */
export function createStatusMessage(
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
 * @param showPercentage 是否显示百分比
 */
export function progressBar(
  current: number,
  total: number,
  length: number = 20,
  showPercentage: boolean = true,
): string {
  const percentage = Math.min(Math.max(current / total, 0), 1)
  const filledLength = Math.round(percentage * length)
  const emptyLength = length - filledLength

  const filledChar = SYMBOLS.SHAPE.SQUARE
  const emptyChar = SYMBOLS.SHAPE.SQUARE_WHITE || '□'

  const bar = filledChar.repeat(filledLength) + emptyChar.repeat(emptyLength)

  if (showPercentage) {
    const percentageText = `${Math.round(percentage * 100)}%`
    return `[${bar}] ${percentageText}`
  }

  return `[${bar}]`
}

/**
 * 彩色状态指示
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
