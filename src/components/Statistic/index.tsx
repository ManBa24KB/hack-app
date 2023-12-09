import { Statistic, Tooltip } from 'antd'
import styled from 'styled-components'
import { StatisticInfo } from '@/constants/types'
import { formatNumber } from '@/utils'

const ComStatisticBox = styled.div`
    .ant-statistic {
        .ant-statistic-content {
            white-space: nowrap;
            overflow: auto;
            .ant-statistic-content-prefix {
                font-family: 'Inter';
                margin-right: 2rem;
            }
            .ant-statistic-content-suffix {
                font-family: 'Inter';
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-family: 'Inter';
                }
            }
        } 
    }
`

const ComStatistic = ({
    value,
    suffix,
    prefix,
    color,
    fontSize,
    precision,
    fontWeight,
    noFormatter
}: StatisticInfo) => {

    const formatValue = (val: number) => {
        return formatNumber(val)
    }
    
    return (
        <ComStatisticBox>
            <Tooltip placement="top" 
                title={<Statistic 
                    value={value}
                    prefix={prefix}
                    suffix={suffix}
                    valueStyle={{ color, fontSize: `${14}rem` }}
                />}>
                    {
                        !noFormatter ? 
                            Math.abs(Number(value)) >= 1000000 ?
                                <Statistic 
                                    value={value || 0}
                                    prefix={prefix}
                                    suffix={suffix}
                                    precision={precision}
                                    valueStyle={{ color, fontSize: `${fontSize}rem`, fontWeight }}
                                    formatter={(value: any) => formatValue(value)}
                                />
                            :
                                <Statistic 
                                    value={value || 0}
                                    prefix={prefix}
                                    suffix={suffix}
                                    precision={precision}
                                    valueStyle={{ color, fontSize: `${fontSize}rem`, fontWeight }}
                                />
                        :
                            <Statistic 
                                value={value || 0}
                                prefix={prefix}
                                suffix={suffix}
                                precision={precision}
                                valueStyle={{ color, fontSize: `${fontSize}rem`, fontWeight }}
                            />
                    }
            </Tooltip>
        </ComStatisticBox>
    )
}
export default ComStatistic