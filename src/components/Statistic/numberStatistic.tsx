import { Statistic, Tooltip } from 'antd'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import ComStatistic from '.'
import ComSkeleton from '../Skeleton'
import { getEFullNum, validateEmail } from '@/utils'

const ComStatisticBox = styled.div`
    display: flex;
    align-items: center;
    /* width: 100%; */
    max-width: 220rem;
    gap: 50rem;
    .noValue {
        color: #fff;
    }
`

const StatisticContent = styled.div`
    display: flex;
    align-items: center;
    font-family: 'Inter';
    justify-content: flex-start;
    font-size: 12rem;
    color: #fff;
    font-weight: 500;
    width: 100%;
    .point {}
    .pwo {
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 4rem;
        .bottom {
            font-family: 'Inter';
            font-size: 12rem;
            color: #fff;
            margin-bottom: -10rem;
            padding: 0 2rem;
            margin-right: -4rem;
        }
    }
    .zero {
        display: flex;
        align-items: center;
    }
    .point {
        margin-right:2rem;
    }
    .point_t {
        margin-left:2rem;
    }
`

const ComNumberStatistic = (props: any) => {
    const val: string | number = props.value || ''
    const suffix: string = props.suffix || ''
    const prefix: string = props.prefix || ''
    const fontSize: number = props.fontSize || 14
    const precision: number = props.precision || 0
    const color: string = props.color || '#fff'
    const fontWeight: number = props.fontWeight || 500
    const loading: boolean = props.loading || false
    const noFormatter: boolean = props.noFormatter || false
    const justifyContent: string = props.justifyContent || 'flex-start'
    
    const [intstr, setIntstr] = useState('')
    const [prefixStr, setPrefixStr] = useState('')
    const [suffixStr, setSuffixStr] = useState('')
    const [powStr, setPowStr] = useState('')
    const [zeroStr, setZeroStr] = useState('')
    const [floatStr, setFloatStr] = useState('')
    const minNumber: number = 3

    useEffect(() => {
        if (val) {
            let newVal: string = val + ''
            if (newVal.includes('e')) {
                newVal = getEFullNum(Number(val)) + ''
            }
            const arr: string[] = newVal.split('.')
            if (arr.length === 1) {
            } else {
                const intVal: string = arr[0] // 整数部位
                let floatVal: string = arr[1] // 小数部位
                floatVal = floatVal.replace(/0+$/, "")
                const [prefixVal, zeroVal, suffixVal] = f3(floatVal)
                setIntstr(Number(intVal).toLocaleString())
                setFloatStr(floatVal)
                if (!prefixVal && !zeroVal && !suffixVal) {
                    setZeroStr('')
                    setPowStr('')
                    setPrefixStr('')
                } else {
                    setPrefixStr(prefixVal)
                    if (zeroVal) {
                        setZeroStr(zeroVal)
                        setPowStr(zeroVal.length + '')
                    } else {
                        setZeroStr('')
                        setPowStr('')
                    }
                    setSuffixStr(suffixVal)
                }
            }
        }
    }, [val])

    // 根据数字通过连续0拆分成多段数据
    const f3 = (str: string) => {
        const reg = /(?<prefix>[1-9]*)(?<zero>0+)(?<suffix>[0-9]*)/g
        const match = reg.exec(str)
        let prefixVal: string = ''
        let zeroVal: string = ''
        let suffixVal: string = ''
        if (match) {
            prefixVal = match.groups?.prefix || ''
            zeroVal = match.groups?.zero || ''
            suffixVal = match.groups?.suffix || ''
        }
        return [prefixVal, zeroVal, suffixVal]
    }

    const toolVal = (val: string | number, suffix: string) => {
        let res: string = ''
        let newVal: string = val + ''
        if (newVal.includes('e')) {
            newVal = getEFullNum(Number(val)) + ''
        }
        const arr: string[] = newVal.split('.')
        const intVal: string = arr[0] // 整数部位
        const floatVal: string = arr[1] // 小数部位
        res = `${Number(intVal).toLocaleString()}.${floatVal} ${suffix}` 
        return res
    }
    
    return (
        <ComStatisticBox
            style={{
                color,
                fontSize: fontSize + 'rem',
                fontWeight,
                justifyContent
            }}
        >
            {
                loading ?
                    <ComSkeleton loading={loading} width={100} />
                :
                    Number(val) ?
                        suffix === '%' ?
                            <StatisticContent
                                style={{
                                    color,
                                    fontSize: fontSize + 'rem',
                                    fontWeight,
                                    justifyContent
                                }}
                            >
                                <Tooltip placement="top" title={
                                    <Statistic 
                                        value={val}
                                        valueStyle={{ color, fontSize: '14rem' }}
                                        prefix={prefix}
                                        suffix={suffix}
                                    />
                                }>
                                    <Statistic 
                                        value={val}
                                        precision={precision}
                                        valueStyle={{ color, fontSize }}
                                        prefix={prefix}
                                        suffix={suffix}
                                    />
                                </Tooltip>
                            </StatisticContent>
                        :
                            Math.abs(Number(val)) < 1 && Math.abs(Number(val)) !== 0 ?
                                <Tooltip placement="top" title={toolVal(val, suffix)}>
                                    <StatisticContent
                                        style={{
                                            color,
                                            fontSize: fontSize + 'rem',
                                            fontWeight,
                                            justifyContent
                                        }}
                                    >
                                        {
                                            prefix ?
                                                <div className='point'>{prefix}</div>
                                            :
                                                null
                                        }

                                        <div className='prefix'>{intstr}</div>

                                        {
                                            prefixStr || powStr || suffixStr ?
                                                <div className=''>.</div>
                                            :
                                                <div className=''>.{floatStr.length > 6 ? floatStr.substring(0, 5) : floatStr}</div>
                                        }

                                        {
                                            prefixStr ?
                                                prefixStr.length >= 6 ?
                                                    <div className=''>{prefixStr.substring(0, 6)}</div>
                                                :
                                                    <div className=''>{prefixStr}</div>
                                            :
                                                null
                                        }

                                        {
                                            powStr && prefixStr.length < 6 ?
                                                Number(powStr) > minNumber ?
                                                    <div className='pwo'>
                                                        <div className=''>0</div>
                                                        <div className='bottom'>{powStr}</div>
                                                    </div>
                                                :
                                                    <div className='zero'>
                                                        <div className=''>{zeroStr}</div>
                                                    </div>
                                            :
                                                null
                                        }
                                        
                                        {
                                            suffixStr && prefixStr.length < 6 ?
                                                <div className=''>{suffixStr.length > 3 ? suffixStr.substring(0, 6 - prefixStr.length) : suffixStr}</div>
                                            :
                                                null
                                        }

                                        {
                                            suffix ?
                                                <div className='point_t'>{suffix}</div>
                                            :
                                                null
                                        }

                                        {/* {
                                            suffix && prefixStr.length < 6  ?
                                                <div className='point_t'>{suffix}</div>
                                            :
                                                null
                                        } */}
                                    </StatisticContent>
                                </Tooltip>
                            :
                                <ComStatistic 
                                    value={Number(val)}
                                    prefix={prefix}
                                    suffix={suffix}
                                    precision={precision}
                                    color={color} 
                                    fontSize={fontSize}
                                    fontWeight={fontWeight}
                                    noFormatter={noFormatter}
                                />
                    :
                        <div className='noValue'>-</div>
            }
        </ComStatisticBox>
    )
}
export default ComNumberStatistic