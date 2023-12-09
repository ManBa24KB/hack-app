import styled from 'styled-components'
import chartNoDataImg from '@/assets/images/chartNoData.png'
import { FormattedMessage } from 'react-intl'

const TableNoDataContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    min-height: 300rem;
    border-radius: 6rem;
    background: #242428;
    gap: 25rem;
    .noDataImg {
        height: 100rem;
    }
    .tip {
        color:#FFF;
        font-family: 'Inter';
        font-size: 24rem;
        font-style: normal;
        font-weight: 700;
        line-height: 30rem;
    }
`

const ChartBoData = (props: any) => {
    const emptyValue:string = props.emptyValue || 'chart.no.data'

    return (
        <TableNoDataContent>
            <img className='noDataImg' alt='no data' src={chartNoDataImg} />
            <div className='tip'>
                <FormattedMessage id={emptyValue} defaultMessage=""/>
            </div>
        </TableNoDataContent>
    )
}

export default ChartBoData