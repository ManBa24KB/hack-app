import styled from 'styled-components'
import NoDataPng from '@/assets/images/nodata.png'
import { FormattedMessage } from 'react-intl'

const NoDataContent = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10rem;;
    img {
        width: 20rem;
    }
    .text {
        font-size: 12px;
        font-family: 'Inter';
        color: var(--secondaryFontColor);
        line-height: 16rem;
        max-width: 200rem;
    }
`

const ComNoData = (props: any) => {
    const textTip: string = props.textTip || 'token.token.noData'

    return (
        <NoDataContent>
            <img alt='' src={NoDataPng} />
            <div className='text'>
                <FormattedMessage id={textTip} defaultMessage=""/>
            </div>
        </NoDataContent>
    )
}

export default ComNoData