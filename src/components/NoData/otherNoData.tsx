import styled from 'styled-components'
import otherNoDataImg from '@/assets/images/otherNoData.png'
import { FormattedMessage } from 'react-intl'

const TableNoDataContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 12rem;
    .noDataImg {
        height: 36rem;
    }
    .tip {
        color:#FFF;
        font-family: 'Inter';
        font-size: 12rem;
        font-style: normal;
        font-weight: 700;
    }
`

const OtherNoData = (props: any) => {
    const emptyValue:string = props.emptyValue || 'chart.no.data'

    return (
        <TableNoDataContent>
            <img className='noDataImg' alt='no data' src={otherNoDataImg} />
            <div className='tip'>
                <FormattedMessage id={emptyValue} defaultMessage=""/>
            </div>
        </TableNoDataContent>
    )
}

export default OtherNoData