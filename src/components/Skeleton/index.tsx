import styled from 'styled-components'
import { Skeleton } from 'antd'

const SkeletonContent = styled.div`
    display: inline-block;
    .ant-skeleton-content .ant-skeleton-title + .ant-skeleton-paragraph {
        margin-top: 0;
    }
`

const ComSkeleton = (props: any) => {
    const loading: boolean = props.loading || false
    const rows: number = props.rows || 0
    const width: number = props.width || 100

    return (
        <SkeletonContent 
            style={{width: width + 'rem'}}
        >
            <Skeleton active loading={loading} paragraph={{rows: rows}}></Skeleton>
        </SkeletonContent>
    )
}

export default ComSkeleton