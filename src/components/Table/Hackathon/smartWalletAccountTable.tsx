import styled from 'styled-components'
import { Table } from 'antd'
import ComNumberStatistic from '@/components/Statistic/numberStatistic'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import TableLocalData from '@/components/NoData/tableLocalData'
import greenWallet from '@/assets/images/greenWallet.png'
import { uuid } from '@/utils'
import sendIcon from '@/assets/images/send.png'
import receiveIcon from '@/assets/images/receive.png'
import { ethers } from 'ethers'
import { Erc20Abi } from '@/abi/abi'
import PersonLogo from '@/assets/images/defaultImg.png'
const ethereum: any = window.ethereum

const SmartWalletAccountContent = styled.div`
    position: relative;
    height: 100%;
    .addressBlock {
        display: flex;
        align-items: center;
        cursor: pointer;
        gap: 5rem;
        img {
            width: 24rem;
            border-radius: 50%;
        }
        span {
            font-size: 14rem;
            font-family: 'Inter';
            color: var(--whiteColor);
            &:hover {
                border-bottom: 1rem solid var(--whiteColor);
            }
        }
    }
    .lastData {
        display: flex;
        justify-content: flex-end;
    }
    .ant-table-body {
        ::-webkit-scrollbar {
            width: 0 !important;
        }
    }
    .ant-table .ant-table-container .ant-table-header .ant-table-thead .ant-table-cell:nth-last-child(2) {
        text-align: left;
    }
`

const HeaderBlock = styled.div`
    .headerContent {
        height: 100rem;
        padding: 28rem;
        box-sizing: border-box;
        border: 1rem solid #2C2C30;
        .nameBox {
            display: flex;
            align-items: center;
            gap: 5rem;
            color: #FFF;
            font-family: Inter;
            font-size: 16rem;
            font-style: normal;
            font-weight: 700;
            line-height: 21rem;
            letter-spacing: 0.429rem;
            img {
                width: 14rem;

            }
        }
        .address {
            color: #3AC89F;
            font-family: Inter;
            font-size: 16rem;
            font-style: normal;
            font-weight: 500;
            line-height: 21rem; /* 131.25% */
            letter-spacing: 0.429rem;
            padding-left: 17rem;
        }
    }
    .btnBox {
        margin: 10rem 0;
        display: flex;
        align-items: center;
        gap: 15rem;
        padding: 0 15rem;
        box-sizing: border-box;
        .itemBtn {
            flex: 1;
            height: 40rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5rem;
            border-radius: 6rem;
            background: #242428;
            border: 1rem solid #242428;
            color: #FFF;
            font-family: Inter;
            font-size: 14rem;
            font-style: normal;
            font-weight: 400;
            cursor: pointer;
            &:hover {
                opacity: 0.7;
            }
            img {
                width: 16rem;
            }
        }
        .active {
            border: 1rem solid #3AC89F;
        }
    }
`

const SmartWalletAccountPage = (props: any) => {
    const contractAddress: string = props.contractAddress || ''
    const address: string = props.address || ''
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState<any[]>([
        { symbol: 'USDT', address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd', imgUrl: '', balanceString: '' },
        { symbol: 'USDC', address: '0x64544969ed7EBf5f083679233325356EbE738930', imgUrl: '', balanceString: '' },
        { symbol: 'BTC', address: '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8', imgUrl: '', balanceString: '' },
        { symbol: 'DAI', address: '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', imgUrl: '', balanceString: '' },
        { symbol: 'XRP', address: '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9', imgUrl: '', balanceString: '' }
    ])
    const [total, setTotal] = useState(0)
    const [type, setType] = useState('Send')
    const [page, setPage] = useState(1) // 页码
    const limit: number = 10
    const columns = [
        { 
            title: <FormattedMessage id='menu.token' defaultMessage="" />,
            dataIndex: 'symbol',
            key: 'symbol',
            render: ( symbol: string, record: any, index: number) => {
                return (
                    <div className='addressBlock'>
                        <img
                            width='25'
                            height='25'
                            className='tokenLogoSrc'
                            src={PersonLogo}
                        />
                        <span>{symbol}</span>
                    </div>
                )
            }
        },
        { 
            title: <FormattedMessage id='main.balance' defaultMessage="" />, 
            dataIndex: 'balanceString',
            key: 'balanceString',
            render: (val: string) => {
                return (
                    <div className='lastData'>
                        <ComNumberStatistic 
                            value={val}
                            suffix=''
                            prefix=''
                            color='#fff'
                            fontSize={14}
                            precision={2}
                            noFormatter={true}
                        />
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        if (contractAddress && address) {
            initData()
        }
    }, [contractAddress, address])

    const initData = () => {
        getData().then((res: any) => {
            let { USDTBalance, USDCBalance, BTCBalance, DAIBalance, XRPBalance } = res
            console.log({
                USDTBalance,
                USDCBalance,
                BTCBalance,
                DAIBalance,
                XRPBalance
            })
            setDataSource([
                { symbol: 'USDT', address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd', imgUrl: '', balanceString: USDTBalance },
                { symbol: 'USDC', address: '0x64544969ed7EBf5f083679233325356EbE738930', imgUrl: '', balanceString: USDCBalance },
                { symbol: 'BTC', address: '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8', imgUrl: '', balanceString: BTCBalance },
                { symbol: 'DAI', address: '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', imgUrl: '', balanceString: DAIBalance },
                { symbol: 'XRP', address: '0xa83575490D7df4E2F47b7D38ef351a2722cA45b9', imgUrl: '', balanceString: XRPBalance }
            ])
        })
    }

    const getData = async() => {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const USDTcontract: any = new ethers.Contract('0x337610d27c682E347C9cD60BD4b3b107C9d34dDd', Erc20Abi, provider.getSigner())
        const USDCcontract: any = new ethers.Contract('0x64544969ed7EBf5f083679233325356EbE738930', Erc20Abi, provider.getSigner())
        const BTCContract: any = new ethers.Contract('0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8', Erc20Abi, provider.getSigner())
        const DAIContract: any = new ethers.Contract('0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', Erc20Abi, provider.getSigner())
        const XRPcontract: any = new ethers.Contract('0xa83575490D7df4E2F47b7D38ef351a2722cA45b9', Erc20Abi, provider.getSigner())

        let USDTBigBalance = await USDTcontract.balanceOf(address)
        let USDCBigBalance = await USDCcontract.balanceOf(address)
        let BTCBigBalance = await BTCContract.balanceOf(address)
        let DAIBigBalance = await DAIContract.balanceOf(address)
        let XRPBigBalance = await XRPcontract.balanceOf(address)

        let USDTBalance = parseFloat(ethers.utils.formatEther(USDTBigBalance))
        let USDCBalance = parseFloat(ethers.utils.formatEther(USDCBigBalance))
        let BTCBalance = parseFloat(ethers.utils.formatEther(BTCBigBalance))
        let DAIBalance = parseFloat(ethers.utils.formatEther(DAIBigBalance))
        let XRPBalance = parseFloat(ethers.utils.formatEther(XRPBigBalance))
        console.log({
            USDTBalance,
            USDCBalance,
            BTCBalance,
            DAIBalance,
            XRPBalance
        })
        return { USDTBalance, USDCBalance, BTCBalance, DAIBalance, XRPBalance }
    }

    const handleType = (type: string) => {
        setType(type)
    }

    return (
        <SmartWalletAccountContent>
            <HeaderBlock>
                <div className='headerContent'>
                    <div className='nameBox'>
                        <img src={greenWallet} alt="" />
                        <FormattedMessage id='chainlink.deploy.contract' defaultMessage="" />
                    </div>

                    <div className='address'>{contractAddress}</div>
                </div>

                <div className='btnBox'>
                    <div className={`itemBtn ${type === 'Send' ? 'active' : ''}`} onClick={() => handleType('Send')}>
                        <img src={sendIcon} alt="" />
                        <FormattedMessage id='chainlink.send' defaultMessage="" />
                    </div>
                    <div className={`itemBtn ${type === 'Receive' ? 'active' : ''}`} onClick={() => handleType('Receive')}>
                        <img src={receiveIcon} alt="" />
                        <FormattedMessage id='chainlink.receive' defaultMessage="" />
                    </div>
                </div>
            </HeaderBlock>
                
            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={{ pageSize: limit, total, pageSizeOptions: [10], showSizeChanger: false, current: page }}
                rowKey={(record: any) => uuid()}
                scroll={{y: '450rem'}}
                locale={{emptyText: <TableLocalData loading={loading} dataSource={dataSource} />  }} 
            />
        </SmartWalletAccountContent>
    )
}

export default SmartWalletAccountPage