import styled from 'styled-components'
import NodaImg from '@/assets/images/empty-data.png'
import vcIconImg from '@/assets/images/vcIcon.png'
import { FormattedMessage } from 'react-intl'

const LatestNoDataContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: var(--sideActiveSelectorBg);
    padding-bottom: 100rem;
    box-sizing: border-box;
    .noDataBox {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            height: 120rem;
        }
    }
    .found {
        font-size: 30rem;
        font-family: 'Inter';
        color: var(--tagsColor);
        text-align: center;
    }
    .transactions {
        font-size: 14rem;
        font-family: 'Inter';
        color: var(--whiteColor);
        .historical {
            font-size: 16rem;
            color: var(--tagsColor);
            cursor: pointer;
            &:hover {
                opacity: 0.7;
            }
        }
    }
    .notice {
        margin-top: 60rem;
        min-width: 600rem;
        border: 1px dashed var(--tarckSolid);
        font-size: 14rem;
        font-family: 'Inter';
        color: var(--whiteColor);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 15rem;
        padding: 8rem 10rem;
        box-sizing: border-box;
        img {
            width: 18rem;
        }
    }
`

const LatestNoData = (props: any) => {
    const handleHistorical = () => {
        props.handleHistoricalData()
    }

    return (
        <LatestNoDataContent>
            <div className='noDataBox'>
                <img alt='no data' src={NodaImg} />
            </div>
            
            <div className='found'>
                <FormattedMessage id='global.noFound' defaultMessage=""/>
            </div>

            <div className='transactions'>
                <FormattedMessage id='global.have' defaultMessage=""/>
            </div>

            <div className='transactions'>
                <FormattedMessage id='global.can' defaultMessage=""/> "<span className='historical' onClick={handleHistorical}><FormattedMessage id='global.historical' defaultMessage=""/></span>" <FormattedMessage id='global.history' defaultMessage=""/> 
            </div>

            <div className='notice'>
                <img alt='no data' src={vcIconImg} />
                <span>
                    <FormattedMessage id='global.historicalTip' defaultMessage=""/>
                </span>
            </div>
        </LatestNoDataContent>
    )
}

export default LatestNoData