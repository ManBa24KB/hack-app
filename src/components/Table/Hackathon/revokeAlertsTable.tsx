import styled from 'styled-components'
import { Table } from 'antd'
import ComNumberStatistic from '@/components/Statistic/numberStatistic'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import TableLocalData from '@/components/NoData/tableLocalData'
import hackLog from '@/assets/images/hackLog.png'
import { uuid } from '@/utils'
import { ArrowRightOutlined } from '@ant-design/icons'
import { getRevokeAlerts } from "@/api/contractApi"
import PersonLogo from '@/assets/images/defaultImg.png'

const RevokeAlertsContent = styled.div`
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
    .contractBox {
        width: 140rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .lastData {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 5rem;
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
    margin-bottom: 10rem;
    .headerContent {
        padding: 28rem 28rem 10rem;
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

const RevokeAlertsTable = (props: any) => {
    const [loading, setLoading] = useState(false)
    const contractAddress: string = props.contractAddress || ''
    const [dataSource, setDataSource] = useState<any[]>([])
    const [page, setPage] = useState(1) // 页码
    const limit: number = 100
    const columns = [
        { 
            title: <FormattedMessage id='vcWatch.vcDashboard.portfolio.time' defaultMessage="" />, 
            dataIndex: 'blockNumber',
            key: 'blockNumber',
            width: '120rem',
        },
        { 
            title: <FormattedMessage id='chainlink.contract.address' defaultMessage="" />, 
            dataIndex: 'contractAddress',
            key: 'contractAddress'
        },
        { 
            title: <FormattedMessage id='menu.token' defaultMessage="" />,
            dataIndex: 'symbol',
            key: 'symbol',
            width: '160rem',
            render: ( symbol: string, record: any, index: number) => {
                return (
                    <div className='addressBlock'>
                        <img
                            width='25'
                            height='25'
                            className='tokenLogoSrc'
                            src={PersonLogo}
                        />
                        <span>{symbol || '--'}</span>
                    </div>
                )
            }
        },
        { 
            title: <FormattedMessage id='vcWatch.vcDashboard.portfolio.amount' defaultMessage="" />, 
            dataIndex: 'amount',
            key: 'amount',
            width: '160rem',
            render: (val: string) => {
                return (
                    <ComNumberStatistic 
                        value={val}
                        suffix=''
                        prefix=''
                        color='#fff'
                        fontSize={14}
                        precision={2}
                    />
                )
            }
        },
        { 
            title: <FormattedMessage id='chainlink.reason' defaultMessage="" />, 
            dataIndex: 'reason',
            key: 'reason',
            width: '120rem',
        },
        { 
            title: <FormattedMessage id='chainlink.amount.left' defaultMessage="" />, 
            dataIndex: 'transactionHash',
            key: 'transactionHash',
            width: '120rem',
            render: (val: string) => {
                return (
                    <a target="_blank" href={`https://testnet.bscscan.com/tx/${val}`}  className='lastData'>
                        <FormattedMessage id='chainlink.link' defaultMessage="" />
                        <ArrowRightOutlined />
                    </a>
                )
            }
        }
    ]

    useEffect(() => {
        if (contractAddress) {
            initData()
        }
    }, [contractAddress])

    const initData = () => {
        setLoading(true)
        let params = {address: contractAddress, limit, page }
        getRevokeAlerts(params).then((res: any) => {
            setLoading(false)
            if (res.code === 200) {
                setDataSource(res.data || [])
            }
        })
    }

    return (
        <RevokeAlertsContent>
            <HeaderBlock>
                <div className='headerContent'>
                    <div className='nameBox'>
                        <img src={hackLog} alt="" />
                        <FormattedMessage id='chainlink.revoke.alerts' defaultMessage="" />
                    </div>
                </div>
            </HeaderBlock>
                
            <Table
                dataSource={dataSource}
                columns={columns}
                loading={loading}
                pagination={{ pageSize: limit, total: dataSource.length, showSizeChanger: false, current: page }}
                rowKey={(record: any) => uuid()}
                scroll={{y: '450rem'}}
                locale={{emptyText: <TableLocalData loading={loading} dataSource={dataSource} />  }} 
            />
        </RevokeAlertsContent>
    )
}

export default RevokeAlertsTable