import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

const TableLocalDataContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    z-index: 999;
    img {
        height: 120rem;
    }
    &:hover {
        opacity: 1;
    }
`

const NoDivContent = styled.div`
    position: relative;
    width: 100%;
    z-index: 1;
    height: 100%;
    .small {
        width: 28rem;
    }
    h2 {
        color: var(--whiteColor);
        font-family: 'Inter';
        font-weight: 700;
        font-size: 24rem;
        text-align: center;
        position: absolute;
        left: 0;
        width: 100%;
        top: calc(50% - 24rem);
        z-index: 1;
    }
`

const NoDataRow = styled.div`
    height: 70rem;
    padding: 28rem 0;
    border-bottom: 1rem solid var(--child-05-color);
    margin: 0 auto;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
`

const NoDiv = styled.div`
    display: inline-block;
    width: 20%;
    height: 15rem;
    background-image: none;
    background-position-x: 200%;
    background-size: 200%;
    border-radius: 8rem;
    animation: 1.2s linear 0s infinite normal none running cRjnvO;
    background: var(--child-05-color);
`

const TableLocalData = (props: any) => {
    const loading: boolean = props.loading
    const dataSource: any[] = props.dataSource || []
    const [isShow, setIsShow] = useState(true)

    useEffect(() => {
        setIsShow(loading)
    },[loading])

    return (
        <TableLocalDataContent>
            {
                isShow || dataSource.length ? 
                    <div></div>
                :
                    <NoDivContent>
                        <NoDataRow className=''><NoDiv className='small' /> <NoDiv /> <NoDiv className='small' /> <NoDiv /> <NoDiv /></NoDataRow>

                        <NoDataRow style={{opacity: .7}}><NoDiv className='small' /> <NoDiv /> <NoDiv className='small' /> <NoDiv /> <NoDiv /></NoDataRow>

                        <NoDataRow style={{opacity: .4}}><NoDiv className='small' /> <NoDiv /> <NoDiv className='small' /> <NoDiv /> <NoDiv /></NoDataRow>

                        <h2><FormattedMessage id='chart.no.data' defaultMessage=""/></h2>
                    </NoDivContent>
            }
        </TableLocalDataContent>
    )
}

export default TableLocalData