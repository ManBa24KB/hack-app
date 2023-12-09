import styled from 'styled-components'
import {useEffect, useState } from "react"
import HackHeader from '@/components/Header/hackHeader'
import SmartWalletAccountPage from '@/components/Table/Hackathon/smartWalletAccountTable'
import ApprovalsTable from '@/components/Table/Hackathon/approvalsTable'
import RevokeAlertsTable from '@/components/Table/Hackathon/revokeAlertsTable'
import { ethers } from 'ethers'
import { useParams } from 'react-router-dom'

const MainConten = styled.div`
    position: relative;
    color: #fff;
    font-family: 'Inter';
    min-height: 100vh;
    background: #101015;
    padding-bottom: 20rem;
    box-sizing: border-box;
    overflow: auto;
`

const DataContent = styled.div`
    margin: 70rem auto 0;
    width: 1200rem;
    height: calc(100% - 70rem);
    padding: 20rem 0 0;
    box-sizing: border-box;
    .firtsMainContent {
        margin-top: 0;
    }
`

const MainContent = styled.div`
    display: flex;
    align-items: center;
    gap: 20rem;
    margin-top: 20rem;
    .nextDataBlock {
        width: 100%;
    }
`

const DataBlock = styled.div`
    width: calc(50% - 10rem);
    height: 400rem;
    border-radius: 14rem;
    border: 1rem solid #2C2C30;
    background: #1B1B1E;
    overflow: hidden;
`

const HackDataPage = () => {
    const params: any = useParams()
    const [address, setAddrss] = useState('')
    const contractAddress: string = params['contractAddress'] || ''

    useEffect(() => {
        initData()
    }, [])

    const initData = async() => {
        const ethereum: any = window.ethereum
        const provider: any = new ethers.providers.Web3Provider(ethereum)
        const res: string[] = await provider.send('eth_requestAccounts', [])
        setAddrss(res[0].toLowerCase())
    }

    return (
        <MainConten>
            <HackHeader contractAddress={ contractAddress } address={address} />

            <DataContent>
                <MainContent className='firtsMainContent'>
                    <DataBlock>
                        <SmartWalletAccountPage 
                            address={address}
                            contractAddress={contractAddress}
                        />
                    </DataBlock>

                    <DataBlock>
                        <ApprovalsTable
                            address={address}
                            contractAddress={contractAddress}
                        />
                    </DataBlock>
                </MainContent>

                <MainContent>
                    <DataBlock className='nextDataBlock'>
                        <RevokeAlertsTable
                            address={address}
                            contractAddress={contractAddress}
                        />
                    </DataBlock>
                </MainContent>
            </DataContent>
        </MainConten>
    )
}

export default HackDataPage