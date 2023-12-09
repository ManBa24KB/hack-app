import styled from 'styled-components'
import sunScopeLogo from '@/assets/images/chain-logo.png'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import ApproveModal from '../Modal/ApproveModal'
import { getEventRevoke } from '@/api/contractApi'
import { notification } from 'antd'

const HeaderContent = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 9;
    .fadeInDown {
        animation: fadeInDown 1s;
        -webkit-animation: fadeInDown 1s;
    }

    @keyframes fadeInDown {
        0% {
            margin-top: -150rem;
            opacity: 0;
        }
        100% {
            margin-top: 0;
            opacity: 1;
        }
    }
    @-webkit-keyframes fadeInDown{
        0% {
            margin-top: -150rem;
            opacity: 0;
        }
        100% {
            margin-top: 0;
            opacity: 1;
        }
    }
`

const AppHeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: var(--hederHeight);
    background: var(--headerBgColor);
    z-index: 9;
    padding: 0 20rem;
    gap: 20rem;
`

const LeftContent = styled.div`
    display: flex;
    align-items: center;
    gap: 50rem;
    .leftImg {
        width: 146rem;
        height: auto;
        cursor: pointer;
    }
    .btnBox {
        display: flex;
        align-items: center;
        gap: 15rem;
        .itemBtn {
            width: 174rem;
            height: 40rem;
            line-height: 40rem;
            text-align: center;
            border-radius: 6rem;
            background: #242428;
            color: #FFF;
            font-family: Inter;
            font-size: 14rem;
            font-style: normal;
            font-weight: 400;
            cursor: pointer;
            &:hover {
                opacity: 0.7;
            }
        }
        .active {
            background: #3AC89F;
            color: #101015;
        }
    }
`

const RightContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10rem;
    flex: 1;
    .infoBox {
        display: flex;
        align-items: center;
        gap: 5rem;
        color: #9E9E9E;
        font-family: Inter;
        font-size: 12rem;
        font-style: normal;
        font-weight: 400;
        line-height: 30rem; /* 250% */
        .contract {
            width: 150rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #3ac89f;
            font-weight: 700;
        }
    }
    .itemBtn {
            width: 137rem;
        height: 40rem;
        line-height: 40rem;
        text-align: center;
        border-radius: 6rem;
        background: #242428;
        color: #FFF;
        font-family: Inter;
        font-size: 14rem;
        font-style: normal;
        font-weight: 400;
        cursor: pointer;
        &:hover {
            opacity: 0.7;
        }
    }
`

const HackHeader = (props: any) => {
    const navigate = useNavigate()
    const address: string = props.address
    const contractAddress: string = props.contractAddress || ''
    const [type, setType] = useState('approve')
    const approveModalRef: any = useRef(null)

    const handleType = (type: string) => {
        setType(type)
        if (type === 'approve') {
            approveModalRef.current.updateData({
                visible: true,
                contractAddress
            })
        } else {
            getEventRevoke({ address: contractAddress }).then((res: any) => {
                if (res.code === 200) {
                    notification['success']({
                        message: 'Tip',
                        description: 'Event created!',
                    })
                }
            })
        }
    }

    const backClick = () => {
        navigate('/')
    }

    return (
        <HeaderContent>
            <AppHeaderContent>
                <LeftContent>
                    <div>
                        <img onClick={backClick} className='leftImg' width='146rem' height='auto' alt='' src={sunScopeLogo} />
                    </div>

                    {
                        contractAddress ?
                            <div className='btnBox'>
                                <div className={`itemBtn ${type === 'approve' ? 'active' : ''}`} onClick={() => handleType('approve')}>
                                    <FormattedMessage id='chainlink.approve.spending.to' defaultMessage="" />
                                </div>
                                <div className={`itemBtn ${type === 'api' ? 'active' : ''}`} onClick={() => handleType('api')}>
                                    <FormattedMessage id='chainlink.api.event.creation' defaultMessage="" />
                                </div>
                            </div>
                        :
                            null
                    }
                    
                </LeftContent>
                    
                <RightContent>
                    {
                        address ?
                            <div className='infoBox'>
                                <div><FormattedMessage id='chainlink.connected.eoa' defaultMessage="" />:</div>
                                <div className='contract'>
                                    {address}
                                </div>
                            </div>
                        :
                            null
                    }
                </RightContent>
            </AppHeaderContent>

            <ApproveModal onRef={approveModalRef} />
        </HeaderContent> 
    )   
}

export default HackHeader