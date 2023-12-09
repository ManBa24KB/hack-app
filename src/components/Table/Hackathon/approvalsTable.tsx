import styled from 'styled-components'
import { Table } from 'antd'
import ComNumberStatistic from '@/components/Statistic/numberStatistic'
import { getApprovals } from "@/api/contractApi"
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import TableLocalData from '@/components/NoData/tableLocalData'
import hackApprovals from '@/assets/images/hackApprovals.png'
import { uuid } from '@/utils'
import PersonLogo from '@/assets/images/defaultImg.png'
import { ethers } from 'ethers'

const ApprovalsContent = styled.div`
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
    margin-bottom: 10rem;
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

const ApprovalsTable = (props: any) => {
    const [loading, setLoading] = useState(false)
    const contractAddress: string = props.contractAddress || ''
    const [dataSource, setDataSource] = useState<any[]>([])
    const [page, setPage] = useState(1) // 页码
    const limit: number = 100
    const columns = [
        { 
            title: <FormattedMessage id='chainlink.contract.address' defaultMessage="" />, 
            dataIndex: 'contractAddress',
            key: 'contractAddress',
            width: 300,
            render: (val: string) => {
                return (
                    val ?
                        <div>
                            { val }
                        </div>
                    :
                        <span>-</span>
                )
            }
        },
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
                        <span>{symbol || '--'}</span>
                    </div>
                )
            }
        },
        { 
            title: <FormattedMessage id='chainlink.amount.left' defaultMessage="" />, 
            dataIndex: 'amount',
            key: 'amount',
            render: (val: string) => {
                return (
                    <div className='lastData'>
                        <ComNumberStatistic 
                            value={parseFloat(ethers.utils.formatEther(val))}
                            suffix=''
                            prefix=''
                            color='#fff'
                            fontSize={14}
                            precision={2}
                        />
                    </div>
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
        getApprovals(params).then((res: any) => {
            setLoading(false)
            if (res.code === 200) {
                setDataSource(res.data || [])
            }
        })
    }

    return (
        <ApprovalsContent>
            <HeaderBlock>
                <div className='headerContent'>
                    <div className='nameBox'>
                        <img src={hackApprovals} alt="" />
                        <FormattedMessage id='chainlink.approvals' defaultMessage="" />
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
        </ApprovalsContent>
    )
}

export default ApprovalsTable