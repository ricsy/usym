import type {
  ColorStatusType,
  StatusType,
} from '../index'
import {
  SYMBOLS,
} from '../index'

/**
 * 创建状态消息
 */
export function createStatusMessage(
  type: StatusType,
  message: string,
): string {
  const symbols = {
    success: SYMBOLS.STATUS.SUCCESS,
    error: SYMBOLS.STATUS.ERROR,
    warning: SYMBOLS.STATUS.WARNING,
    info: SYMBOLS.STATUS.INFO,
    loading: SYMBOLS.TIME.HOURGLASS_DONE,
  }

  return `${symbols[type]} ${message}`
}

/**
 * 创建进度条
 */
export function createProgressBar(
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
 * 创建彩色状态指示
 */
export function createColorStatus(
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

/**
 * 创建带图标的标题
 */
export function createIconTitle(
  icon: string,
  title: string,
  separator: string = ' ',
): string {
  return `${icon}${separator}${title}`
}

/**
 * 创建列表项
 */
export function createListItem(
  icon: string,
  text: string,
  indent: number = 0,
): string {
  const indentStr = ' '.repeat(indent * 2)
  return `${indentStr}${icon} ${text}`
}

/**
 * 创建分隔线
 */
export function createDivider(
  length: number = 40,
  char: string = SYMBOLS.SHAPE.SQUARE_WHITE || '─',
): string {
  return char.repeat(length)
}
