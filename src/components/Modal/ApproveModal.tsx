import styled from 'styled-components'
import { Modal, Input, notification } from 'antd'
import { useState, useImperativeHandle, useEffect } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import ComNumberStatistic from '../Statistic/numberStatistic'
import { SyncOutlined } from '@ant-design/icons'
import { ethers } from 'ethers'
import { approveAbi } from '@/abi/approveAbi'

const AddWatchAddressContent = styled.div`
    .nextAddressContent {
        margin-top: 40rem;
    }
    .active {
        background: #3AC89F;
        color: #101015;
    }
`

const AddressContent = styled.div`
    margin-top: 20rem;
    display: flex;
    flex-direction: column;
    gap: 5rem;
    .ant-input {
        background: transparent !important;
        color: #FFF !important;
        font-size: 14rem !important;
        height: 40rem !important;
        line-height: 40rem !important;
        border-radius: 6rem;
        border: 1rem solid #59677E !important;
    }
    .ant-input:focus, .ant-input-focused {
        border: 1rem solid #3AC89F !important;
    }
    .amountBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #FFF;
        font-family: Inter;
        font-size: 16rem;
        font-style: normal;
        font-weight: 400;
        line-height: 30rem; /* 187.5% */
    }
`

const AddressTitleContent = styled.div`
    color: #FFF;
    font-family: Inter;
    font-size: 20rem;
    font-style: normal;
    font-weight: 700;
    line-height: 21rem; /* 105% */
    letter-spacing: 0.429rem;
`

const AddressNextTitle = styled.div`
    margin-top: 10rem;
    color: #9E9E9E;
    font-family: Inter;
    font-size: 16rem;
    font-style: normal;
    font-weight: 400;
    line-height: 21rem; /* 131.25% */
    letter-spacing: 0.429rem;
`

const BlockBtn = styled.div`
    margin-top: 20rem;
    margin-bottom: 10rem;
    height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;
    border-radius: 6rem;
    background: #35373E;
    color: #FFF;
    font-family: Inter;
    font-size: 14rem;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
    .active {
        background: var(--tabsBntActivityColor);
        border: 1rem solid var(--tabsBntActivityColor);
        color: var(--bodyBgColor);
    }
`

const ApproveModal = (props: any) => {
    const [visible, setVisible] = useState(props.visible)
    const [contractAddress, setContractAddress] = useState('')
    const [address, setAddress] = useState('')
    const [token, setToken] = useState('')
    const [spending, setSpending] = useState('')
    const [loading, setLoading] = useState(false)
    const tokenList: any[] = [
        { symbol: 'USDT', address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd', imgUrl: '', balanceString: '' },
        { symbol: 'USDC', address: '0x64544969ed7EBf5f083679233325356EbE738930', imgUrl: '', balanceString: '' },
        { symbol: 'BTC', address: '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8', imgUrl: '', balanceString: '' },
        { symbol: 'DAI', address: '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', imgUrl: '', balanceString: '' },
        { symbol: 'XRP', address: '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9', imgUrl: '', balanceString: '' }
    ]

    useEffect(() => {
        if (!visible) {
            setAddress('')
            setToken('')
            setSpending('')
        }
    },[visible])

    useImperativeHandle(props.onRef, () => ({
        // onChild 就是暴露给父组件的方法
        updateData ({
            visible = false, 
            contractAddress = ''
        }) {
            setVisible(visible)
            setContractAddress(contractAddress)
        }
    }))

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleAddress = (val: string) => {
        setAddress(val)
    }

    const handleToken = (val: string) => {
        setToken(val)
    }

    const handleSpending = (val: string) => {
        setSpending(val)
    }

    const getGasPrice = (num: number) => {
        let res = ethers.BigNumber.from(num)
        return res
    }

    const approveClick = async () => {
        setLoading(true)
        try {
            const ethereum: any = window.ethereum
            const provider = new ethers.providers.Web3Provider(ethereum)
            const contract: any = new ethers.Contract(contractAddress, approveAbi, provider.getSigner())
            console.log('contract==', contract)
            let amountTo = ethers.utils.parseEther(spending + '')
            console.log({
                token,
                address,
                amountTo
            })
            let approveObj = await contract.Approve(token, address, amountTo, {gasPrice: getGasPrice(9000000000), gasLimit: getGasPrice(2400000)})
            setLoading(false)
            setVisible(false)
            if (approveObj && approveObj.hash) {
                notification['success']({
                    message: 'Tip',
                    description: approveObj.hash,
                })
                return approveObj.hash
            }
        } catch (error: any) {
            setLoading(false)
            setVisible(false)
            notification['error']({
                message: 'Tip',
                description: error.message,
            })
            return ''
        }
        
    }

    return (
        <Modal
            title=''
            open={visible}
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={null}
            wrapClassName="approveBlock"
        >
            <AddWatchAddressContent>
                <AddressContent>
                    <AddressTitleContent>
                        <FormattedMessage id='chainlink.approve.spending' defaultMessage="" values={{name: ''}} />
                    </AddressTitleContent>

                    <AddressNextTitle>
                        Address:
                    </AddressNextTitle>
    
                    <Input 
                        placeholder=''
                        onChange={(event) => handleAddress(event.target.value)}
                        value={address}
                    />
                </AddressContent>

                <AddressContent className='nextAddressContent'>
                    <AddressTitleContent>
                        <FormattedMessage id='chainlink.spending.cap.request' defaultMessage="" values={{name: ''}} />
                    </AddressTitleContent>

                    <AddressNextTitle>
                        <FormattedMessage id='menu.token' defaultMessage="" values={{name: ''}} />:
                    </AddressNextTitle>
                
                    <Input 
                        placeholder=''
                        onChange={(event) => handleToken(event.target.value)}
                        value={token}
                    />

                    <AddressNextTitle>
                        <FormattedMessage id='chainlink.spending.cap' defaultMessage="" values={{name: ''}} />:
                    </AddressNextTitle>
                
                    <Input 
                        placeholder=''
                        onChange={(event) => handleSpending(event.target.value)}
                        value={spending}
                    />
                </AddressContent>

                <AddressContent className='nextAddressContent'>
                    <div className='amountBox'>
                        <div className=''>
                            <FormattedMessage id='chainlink.estimated.fee' defaultMessage="" values={{name: ''}} />
                        </div>
                        <ComNumberStatistic 
                            value={0.0002}
                            suffix='ETH'
                            prefix=''
                            color='#fff'
                            fontSize={16}
                            precision={2}
                            noFormatter={true}
                        />
                    </div>

                    <div className='amountBox'>
                        <div>
                            <FormattedMessage id='chainlink.total' defaultMessage="" values={{name: ''}} />
                        </div>
                        <ComNumberStatistic 
                            value={0.0002}
                            suffix='ETH'
                            prefix=''
                            color='#fff'
                            fontSize={16}
                            precision={2}
                            noFormatter={true}
                        />
                    </div>
                </AddressContent>
                
                {
                    loading ?
                        <BlockBtn className='active'>
                            <SyncOutlined spin />
                            <FormattedMessage id='chainlink.execute.token.approve' defaultMessage="" />
                        </BlockBtn>
                    :
                        address && token && spending ? 
                            <BlockBtn className='active' onClick={approveClick}>
                                <FormattedMessage id='chainlink.execute.token.approve' defaultMessage="" values={{name: ''}} />
                            </BlockBtn>
                        :
                            <BlockBtn>
                                <FormattedMessage id='chainlink.execute.token.approve' defaultMessage="" values={{name: ''}} />
                            </BlockBtn>
                }
            </AddWatchAddressContent>
        </Modal>
    )
}
export default injectIntl(ApproveModal)