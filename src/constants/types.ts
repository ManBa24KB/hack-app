import { ReactNode } from 'react'
import { EChartsOption } from 'echarts'

export interface ButtonInfo {
    id: string,
    type: string,
    keyWord: string,
    onButClick: (type:string) => void
}

export interface StatisticInfo {
    value: number,
    suffix: ReactNode,
    prefix: ReactNode,
    color: string,
    fontSize: number,
    precision?: number,
    fontWeight?: number,
    noFormatter?: boolean
}

export interface TabInfo {
    title: string,
    key: string,
    component: ReactNode,
    disabled: boolean,
    showNewIcon?: boolean
}

export interface EchartsInfo {
    type: string,
    options: EChartsOption,
    showLoading: boolean
}