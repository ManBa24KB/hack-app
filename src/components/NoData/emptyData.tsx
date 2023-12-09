import styled from 'styled-components'
import NodaImg from '@/assets/images/empty-data.png'
import { FormattedMessage } from 'react-intl'

const TableNoDataContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    img {
        height: 100rem;
    }
    .tip {
        font-size: 12rem;
        color: var(--stepDashBorderColor)
    }
`

const EmptyData = (props: any) => {
    const emptyValue:string = props.emptyValue || 'token.token.noData'

    return (
        <TableNoDataContent>
            <img alt='no data' src={NodaImg} />
            <div className='tip'>
                <FormattedMessage id={emptyValue} defaultMessage=""/>
            </div>
        </TableNoDataContent>
    )
}

export default EmptyData