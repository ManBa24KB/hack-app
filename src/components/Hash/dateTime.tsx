import { timestampToDay } from "@/utils/times"
import styled from "styled-components"
import ComSkeleton from "../Skeleton"
import { Tooltip } from 'antd'
import { chinaTimeToUtcTime } from '@/utils/times'

const MainContent: any = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--tagsColor);
`

const DateTime = (props: any) => {
    const timestamp: number = props.timestamp || 0
    const loading: boolean = props.loading || false
    
    return (
        <MainContent>
            {
                loading ?
                    <ComSkeleton loading={loading} width={100} />
                :
                    timestamp ?
                        <Tooltip title={chinaTimeToUtcTime(timestamp, 'DayTimes')} placement="top">
                            <div className="">{timestampToDay( timestamp.toString().length === 13 ? timestamp / 1000 : timestamp)}</div>
                        </Tooltip>
                    :
                        '-'
            }
        </MainContent>
    )
}

export default DateTime