import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"
import WatcherLogo from '@/assets/images/phoneLogo.png'
import MetamaskLogo from '@/assets/images/metamaskBut.png'
import TeleportLogo from '@/assets/images/teleportBut.png'
import WaLogo from '@/assets/images/waImg.png'
import IsPenddingLogo from '@/assets/images/isPenddingPoint.png'
import StartPointLogo from '@/assets/images/startPoint.png'
import ErrorPointLogo from '@/assets/images/ErrorPointLogo.png'
import TokenPocketLogo from '@/assets/images/tokenPocket.png'
import { ethers } from 'ethers'
import { messageText } from '@/constants/config'
import OkxLogo from '@/assets/images/okx.png'
import WalletConnectLogo from '@/assets/images/walletconnect.png'
import { FormattedMessage } from 'react-intl'
import availableWallets from '@/assets/images/availableWallets.svg'
import hackMaskImg from '@/assets/images/hackMask.png'
import { ArrowRightOutlined, SyncOutlined } from '@ant-design/icons'
import HackHeader from '@/components/Header/hackHeader'
import { RouterAbi } from '@/abi/routerAbi'
import PaySuccessModel from '@/components/Modal/PaySuccessModel'
import { getSmartScWallets } from '@/api/contractApi'

const MainConten = styled.div`
    position: relative;
    color: #fff;
    font-family: 'Inter';
    height: 100vh;
    background: #101015;
`

const WalletContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const WalletBlock = styled.div`
    margin: auto;
    width: 730rem;
    min-height: 380rem;
    flex-shrink: 0;
    border-radius: 14rem;
    border: 1rem solid #2C2C30;
    background: #1B1B1E;
    padding: 32rem 110rem;
    box-sizing: border-box;
    .title {
        margin-top: 30rem;
        color: #FFF;
        font-family: Inter;
        font-size: 30rem;
        font-style: normal;
        font-weight: 700;
        line-height: 21rem;
        text-align: center;
    }
    .tagsContent {
        display:  block;
        align-items: center;
        overflow-y: scroll;
        padding: 20rem;
        .tag {
            display:inline-block;
            background: #574F3B;
            padding: 0 10rem;
            border-radius: 20rem;
            font-size: 12rem;
            font-family: 'Inter';
            color: #F3BA2F;
            margin-right: 20rem;
            margin-bottom: 20rem;
        }
    }
`

const ConnectedBlock = styled.div`
    margin: auto;
    width: 730rem;
    min-height: 380rem;
    flex-shrink: 0;
    border-radius: 14rem;
    border: 1rem solid #2C2C30;
    background: #1B1B1E;
    .titleBox {
        border-bottom: 1rem solid #2C2C30;
        padding: 30rem 90rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: 15rem;
        img {
            width: 42rem;
        }
        .walletBox {
            .label {
                color: #FFF;
                font-family: Inter;
                font-size: 14rem;
                font-style: normal;
                font-weight: 500;
                line-height: 21rem;
                letter-spacing: 0.429rem;
            }
            .address {
                color: #3AC89F;
                font-family: Inter;
                font-size: 16rem;
                font-style: normal;
                font-weight: 500;
                line-height: 21rem; /* 131.25% */
                letter-spacing: 0.429rem;
            }
        }
    }

    .contentBlock {
        padding: 20rem 90rem;
        box-sizing: border-box;
        .name {
            color: #FFF;
            font-family: Inter;
            font-size: 20rem;
            font-style: normal;
            font-weight: 700;
            line-height: 21rem; /* 105% */
            letter-spacing: 0.429rem;
            text-align: center;
        }
        .available {
            margin-top: 10rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5rem;
            color: #3AC89F;
            font-family: Inter;
            font-size: 14rem;
            font-style: normal;
            font-weight: 400;
            line-height: 21rem; /* 150% */
            letter-spacing: 0.429rem;
                        .icon {
                width: 14rem;
            }
        }
        .tips {
            margin-top: 22rem;
            padding: 23rem;
            box-sizing: border-box;
            border-radius: 10rem;
            border: 1rem dashed #554C34;
            background: #2E2B23;
            color: #FFCB00;
            font-family: Inter;
            font-size: 12rem;
            font-style: normal;
            font-weight: 400;
            line-height: 16.5rem; /* 137.5% */
            letter-spacing: 0.429rem;
        }
        .addressList {
            margin-top: 15rem;
            max-height: 160rem;
            overflow-y: auto;
            .itemAddress {
                margin: 10rem auto 0;
                width: 422rem;
                height: 30rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5rem;
                border-radius: 8rem;
                background: #242428;
                cursor: pointer;
                &:hover {
                    opacity: 0.7;
                }
                .anticon svg {
                    font-size: 14rem;
                }
            }
            .firstItem {
                margin-top: 0;
            }
            ::-webkit-scrollbar { 
                width: 2rem !important; 
            }
            ::-webkit-scrollbar-thumb { 
                background-color: #3AC89F !important; 
                border-radius: 50rem;
            }
        }
        .btnTips {
            margin-top: 35rem;
            color: #9E9E9E;
            font-family: Inter;
            font-size: 12rem;
            font-style: normal;
            font-weight: 400;
            line-height: 21rem; /* 175% */
            letter-spacing: 0.429rem;
            text-align: center;
        }
        .addressBtn {
            margin-top: 5rem;
        }
    }
`

const BtnBlock = styled.div`
    margin-top: 45rem;
    margin-bottom: 20rem;
    display: flex;
    gap: 5rem;
    height: 40rem;
    justify-content: center;
    align-items: center;
    border-radius: 6rem;
    background: #3AC89F;
    color: #101015;
    font-family: Inter;
    font-size: 14rem;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`

const VersionModelHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20rem;
    .title {
        font-size: 22rem;
        font-family: 'Inter';
        color: #3AC89F;
    }
    .childTitle {
        font-size: 15rem;
        font-family: 'Inter';
        color: var(--whiteColor);
    }
    .wallterlogo {
        width: 130rem;
    }
    .pointLogo {
        width: 300rem;
        margin-left: 40rem;
    }
`

const VersionContent = styled.div`
    font-size: 12rem;
    font-family: 'Inter';
    color: var(--whiteColor);
    .title {
        display: flex;
        align-items: center;
        font-size: 18rem;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        line-height: 21rem;
        color: #3AC89F;
        gap: 10rem;
        .icon {
            width: 20rem;
            height: 20rem;
        }
    }
    .text {
        margin-top: 5rem;
        font-size: 14rem;
        font-family: 'Inter';
        color: #FFFFFF;
        font-style: normal;
        font-weight: 400;
        line-height: 21rem;
    }
`

const GridWallterContent = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15rem;
    align-items: center;
    justify-content: space-between;
    margin-top: 15rem;
    .butLogo {
        height: 56rem;
        width: 240rem;
        &:hover {
            opacity: .7;
            cursor: pointer;
        }
    }
    .butNoLogo {
        height: 56rem;
        width: 240rem;
    }
    .WaLogo {
        width: 56rem;
        height: 56rem;
    }
    .loading{
        display: flex;
        align-items: center;
        gap: 10rem;
    }
    .loading span{
        display: inline-block;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background: lightgreen;
        animation: load 1s ease infinite;
    }
`

const WallterButContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #25282E;
    border-radius: 13rem;
    border: 1px solid #374151;
    margin-top: 30rem;
    padding: 20rem;
    .butLogo {
        height: 56rem;
        width: 240rem;
        &:hover {
            opacity: .7;
            cursor: pointer;
        }
    }
    .butNoLogo {
        height: 56rem;
        width: 240rem;
    }
    .WaLogo {
        /* width: 56rem; */
        height: 56rem;
    }
    .loading{
        display: flex;
        align-items: center;
        gap: 10rem;
    }
    .loading span{
        display: inline-block;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background: lightgreen;
        animation: load 1s ease infinite;
    }
    @keyframes load{
        0%, 100%{
            background: lightgreen;
        }
        30%{
            background: #94b0b9;
        }
        50%{
            background: lightblue;
        }
        70%{
            background: #15576d;
        }
        80%{
            background: #546d15;
        }
        90%{
            background: #2a6d15;
        }
        100%{
            background: lightgreen;
        }
    }
    .loading span:nth-child(1){
        -webkit-animation-delay:0.1s;
    }
    .loading span:nth-child(2){
        -webkit-animation-delay:0.2s;
    }
    .loading span:nth-child(3){
        -webkit-animation-delay:0.4s;
    }
    .loading span:nth-child(4){
        -webkit-animation-delay:0.6s;
    }
    .loading span:nth-child(5){
        -webkit-animation-delay:0.8s;
    }
    .loading span:nth-child(6){
        -webkit-animation-delay:0.9s;
    }
`

const WallterErrorButContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #49424A;
    border-radius: 13rem;
    border: 1px solid #634951;
    margin-top: 30rem;
    padding: 20rem;
    .butLogo {
        height: 56rem;
        width: 240rem;
        &:hover {
            opacity: .7;
            cursor: pointer;
        }
    }
    .butNoLogo {
        height: 56rem;
        width: 240rem;
    }
    .WaLogo {
        width: 56rem;
        height: 56rem;
    }
    .errorPoint {
        display: flex;
        align-items: center;
        gap: 20rem;
        .butTLogo {
            width: 22rem;
            height: 22rem;
        }
        div {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background: #FF7979;
        }
        .fristPoint {
            width: 8rem;
            height: 8rem;
        }
        .twoPoint {
            width: 4rem;
            height: 4rem;
        }
    }
`

const BackWalletContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40rem;
    .backBut {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 360rem;
        height: 40rem;
        background: #3AC89F;
        &:hover {
            opacity: .7;
            cursor: pointer;
        }
    }
    .tryAgainBut {
        font-size: 12px;
        font-family: 'Inter';
        color: #38B190;
        margin-bottom: 5rem;
        &:hover {
            opacity: .7;
            cursor: pointer;
        }
    }
`

const HackathonPage = () => {
    const navigate = useNavigate()
    const [loginStatus, setLoginStatus] = useState(1)
    const [errorMsg, setErrorMsg] = useState('')
    const [currentWalletType, setCurrentWalletType] = useState('')
    const PaySuccessModelRef: any = useRef(null)
    const [address, setAddrss] = useState('')
    const [loading, setLoading] = useState(false)
    const [addressList, setAddressList] = useState<any[]>([])

    useEffect(() => {
        initData()
    }, [])

    const initData = async() => {
        const ethereum: any = window.ethereum
        const provider: any = new ethers.providers.Web3Provider(ethereum)
        const res: string[] = await provider.send('eth_requestAccounts', [])
        setAddrss(res[0].toLowerCase())
        getContractList(res[0].toLowerCase())
    }

    const getContractList = (address: string) => {
        let params = { address }
        getSmartScWallets(params).then((res: any) => {
            if (res.code === 200) {
                setAddressList(res.data || [])
            }
        })
    }

    const loginHander = (signature: string, account: string, walletType: string) => {
        setAddrss(account)
    }

    const connectMetamaskClick = async () => {
        let type: string = ''
        setLoginStatus(2)
        if (isMetaMaskProvider()) {
            const ethereum: any = window.ethereum
            if (window.ethereum.isTeleportWallet) {
                type = 'TeleportWallet'
            } else if (window.ethereum.isTokenPocket) {
                type = 'Tokenpocket'
            } else {
                type = 'MetaMask'
            }
            setCurrentWalletType(type)
            const provider: any = new ethers.providers.Web3Provider(ethereum)
            localStorage.setItem('walletType', type)
            singerHander(provider, type)
        }
    }

    const connectTeleportClick = async () => {
        setLoginStatus(2)
        setCurrentWalletType('TeleportWallet')
        localStorage.setItem('walletType', 'TeleportWallet')
        if (isTeleportProvider()) {
            const ethereum: any = window.teleport
            const provider: any = new ethers.providers.Web3Provider(ethereum)
            singerHander(provider, 'TeleportWallet')
        }
    }

    const connectOkxClick = () => {
        setLoginStatus(2)
        setCurrentWalletType('OkxWallet')
        localStorage.setItem('walletType', 'OkxWallet')
        if (isOkxProvider()) {
            const okxwallet: any = window.okxwallet
            const provider: any = new ethers.providers.Web3Provider(okxwallet)
            singerHander(provider, 'OkxWallet')
        }
    }

    const connectTpClick = () => {
        setLoginStatus(2)
        setCurrentWalletType('Tokenpocket')
        localStorage.setItem('walletType', 'Tokenpocket')
        if (isTokenPocketProvider()) {
            const wallet: any = window.ethereum
            const provider: any = new ethers.providers.Web3Provider(wallet)
            singerHander(provider, 'Tokenpocket')
        }
    }

    const isMetaMaskProvider = () => {
        if (typeof window.ethereum !== 'undefined') {
            return true
        } else {
            setLoginStatus(3)
            setCurrentWalletType('MetaMask')
            setErrorMsg('Please install metamask wallet!')
            return false
        }
    }

    const isTeleportProvider = () => {
        if (typeof window.teleport !== 'undefined') {
            return true
        } else {
            setLoginStatus(3)
            setErrorMsg('Please install teleport wallet!')
            return false
        }
    }

    const isOkxProvider = () => {
        if (typeof window.okxwallet !== 'undefined') {
            return true
        } else {
            setLoginStatus(3)
            setErrorMsg('Please install okx wallet!')
            return false
        }
    }

    const isTokenPocketProvider = () => {
        if (window.ethereum && typeof window.ethereum.isTokenPocket !== 'undefined') {
            console.log('TokenPocket Extension is installed!');
            return true
        } else {
            setLoginStatus(3)
            setErrorMsg('Please install Token Pocket wallet or verify if your wallet settings are correct.')
            return false
        }
    }

    const singerHander = async (provider: any, walletType: string) => {
        try {
            const res: string[] = await provider.send('eth_requestAccounts', [])
            const signer = provider.getSigner()
            const signature: string = await signer.signMessage(messageText)
            loginHander(signature, res[0].toLowerCase(), walletType)
        } catch (error: any) {
            setLoginStatus(3)
            let message: string = error.message
            setErrorMsg(message)
        }
    }

    const backWalletsClick = () => {
        setLoginStatus(1)
    }

    const tryAgainClick = () => {
        if (currentWalletType === 'MetaMask') {
            connectMetamaskClick()
        } else if (currentWalletType === 'TeleportWallet') {
            connectTeleportClick()
        } else if (currentWalletType === 'OkxWallet') {
            connectOkxClick()
        } else if (currentWalletType === 'Tokenpocket') {
            connectTpClick()
        }
    }

    const submit = async() => {
        setLoading(true)
        const ethereum: any = window.ethereum
        const provider = new ethers.providers.Web3Provider(ethereum) // 0x648f54f1F304B5F340fBF084F41E1CaaCa0F629c
        const contract: any = new ethers.Contract('0xC5413EEed7C698A2704BE2e5088B4BD98EAc92F5', RouterAbi, provider.getSigner())
        try {
            const transferRes = await contract.createWallet()
            if (transferRes && transferRes.hash) {
                provider.once(transferRes.hash, async (transaction: any) => {
                    setLoading(false)
                    if (transaction.transactionHash && transaction.status === 1) {
                        PaySuccessModelRef.current.updateData({
                            type: '',
                            visible: true,
                            title: '',
                            message: '',
                            content: '',
                            state: 1
                        })
                        getContractList(address)
                    } else {
                        PaySuccessModelRef.current.updateData({
                            type: '',
                            visible: true,
                            title: 'error',
                            message: '',
                            content: transaction.transactionHash,
                            state: 2
                        })
                    }
                })
            }
        } catch (error: any) {
            setLoading(false)
            let msg: string = ''
            if (localStorage.getItem('walletType') === 'MetaMask') {
                msg = 'MetaMask Tx Signature: User denied transaction signature.' // error.message
            } else {
                msg = 'insufficient funds for intrinsic transaction cost '
            }
            PaySuccessModelRef.current.updateData({
                type: '',
                visible: true,
                title: '',
                message: '',
                content: msg,
                state: 2
            })
        }
    }

    const handleContract = (contractAddress: string) => {
        navigate(`/hackData/${contractAddress}`)
    }

    return (
        <MainConten>
            <HackHeader address={address} />

            <WalletContent>
                {
                    address ?
                        <ConnectedBlock>
                            <div className='titleBox'>
                                <img src={hackMaskImg} alt="" />
                                <div className='walletBox'>
                                    <div className='label'><FormattedMessage id='Connected wallet' defaultMessage="" />:</div>
                                    <div className='address'>{address}</div>
                                </div>
                            </div>

                            {
                                addressList.length ?
                                    <div className='contentBlock'>
                                        <div className='name'>
                                            <FormattedMessage id='chainlink.select.wallet' defaultMessage="" />
                                        </div>

                                        <div className='available'>
                                            <img className='icon' src={availableWallets} alt='' />
                                            <FormattedMessage id='chainlink.available.allets' defaultMessage="" />:
                                        </div>

                                        <div className='addressList'>
                                            {
                                                addressList.map((item: any, index: number) => {
                                                    return (
                                                        <div key={index} onClick={() => handleContract(item.wallet)} className={`itemAddress ${index === 0 ? 'firstItem' : ''}`}>
                                                            {item.wallet}
                                                            <ArrowRightOutlined />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div className='btnTips'>
                                            <FormattedMessage id='chainlink.want.wallet' defaultMessage="" />
                                        </div>

                                        {
                                            loading ?
                                                <BtnBlock className='addressBtn'>
                                                    <SyncOutlined spin />
                                                    <FormattedMessage id='chainlink.new.wallet' defaultMessage="" />
                                                </BtnBlock>
                                                :

                                                <BtnBlock className="addressBtn" onClick={submit}>
                                                    <FormattedMessage id='chainlink.new.wallet' defaultMessage="" />
                                                </BtnBlock>
                                        }
                                    </div>
                                :
                                    <div className='contentBlock'>
                                        <div className='name'>
                                            <FormattedMessage id='chainlink.select.wallet' defaultMessage="" />
                                        </div>

                                        <div className='available'>
                                            <img className='icon' src={availableWallets} alt='' />
                                            <FormattedMessage id='chainlink.available.allets' defaultMessage="" />:
                                        </div>

                                        <div className='tips'>
                                            <FormattedMessage id='chainlink.seems.wallet' defaultMessage="" />
                                        </div>

                                        {
                                            loading ?
                                                <BtnBlock>
                                                    <SyncOutlined spin />
                                                    <FormattedMessage id='chainlink.deploy.contract' defaultMessage="" />
                                                </BtnBlock>
                                                :

                                                <BtnBlock onClick={submit}>
                                                    <FormattedMessage id='chainlink.deploy.contract' defaultMessage="" />
                                                </BtnBlock>
                                        }
                                    </div>
                            }
                        </ConnectedBlock>
                    :
                        <WalletBlock>
                            <div className='title'>
                                <FormattedMessage id='chainlink.connect.wallet' defaultMessage="" />
                            </div>

                            <div className="tagsContent">
                                <VersionModelHeader>
                                    {
                                        loginStatus === 3 || loginStatus === 2 ?
                                            <img className='wallterlogo' alt='' src={WatcherLogo} />
                                            :
                                            ''
                                    }

                                    {
                                        loginStatus === 3 ?
                                            <img className='pointLogo' alt='' src={StartPointLogo} />
                                            :
                                            loginStatus === 2 ?
                                                <img className='pointLogo' alt='' src={IsPenddingLogo} />
                                                :
                                                ''
                                    }
                                </VersionModelHeader>

                                {
                                    loginStatus === 1 ?
                                        <VersionContent>
                                            <div className='title'>
                                                <img className='icon' src={availableWallets} alt='' />
                                                <FormattedMessage id='available.wallets' defaultMessage="" />:
                                            </div>
                                            <div className='text'>
                                                <FormattedMessage id='login.logging' defaultMessage="" />
                                            </div>
                                        </VersionContent>
                                        :
                                        loginStatus === 2 ?
                                            <VersionContent>
                                                <div className='title'>
                                                    <img className='icon' src={availableWallets} alt='' />
                                                    <FormattedMessage id='login.approve' defaultMessage="" />
                                                </div>
                                                <div className='text'>
                                                    <FormattedMessage id='login.continue' defaultMessage="" />
                                                </div>
                                            </VersionContent>
                                            :
                                            loginStatus === 3 ?
                                                <VersionContent>
                                                    <div className='title'>
                                                        <img className='icon' src={availableWallets} alt='' />
                                                        <FormattedMessage id='login.rejected' defaultMessage="" />
                                                    </div>
                                                    <div className='text'>{errorMsg}</div>
                                                </VersionContent>
                                                :
                                                ''
                                }

                                {
                                    loginStatus === 1 ?
                                        <GridWallterContent>
                                            <img className='butLogo' alt='' src={MetamaskLogo} onClick={connectMetamaskClick} />
                                        </GridWallterContent>
                                        :
                                        loginStatus === 2 ?
                                            <WallterButContent>
                                                <img className='WaLogo' alt='' src={WaLogo} />
                                                <div className="loading">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                                {
                                                    currentWalletType === 'MetaMask' ?
                                                        <img className='butNoLogo' alt='' src={MetamaskLogo} />
                                                        :
                                                        currentWalletType === 'TeleportWallet' ?
                                                            <img className='butNoLogo' alt='' src={TeleportLogo} />
                                                            :
                                                            currentWalletType === 'OkxWallet' ?
                                                                <img className='butNoLogo' alt='' src={OkxLogo} />
                                                                :
                                                                currentWalletType === 'Tokenpocket' ?
                                                                    <img className='butNoLogo' alt='' src={TokenPocketLogo} />
                                                                    :
                                                                    currentWalletType === 'WalletConnect' ?
                                                                        <img className='butNoLogo' alt='' src={WalletConnectLogo} />
                                                                        :
                                                                        ''
                                                }
                                            </WallterButContent>
                                            :
                                            loginStatus === 3 ?
                                                <WallterErrorButContent>
                                                    <img className='WaLogo' alt='' src={WaLogo} />
                                                    <div className='errorPoint'>
                                                        <div className='fristPoint'></div>
                                                        <div className='twoPoint'></div>
                                                        <div></div>
                                                        <img className='butTLogo' alt='' src={ErrorPointLogo} />
                                                        <div></div>
                                                        <div></div>
                                                        <div></div>
                                                    </div>
                                                    {
                                                        currentWalletType === 'MetaMask' ?
                                                            <img className='butNoLogo' alt='' src={MetamaskLogo} />
                                                            :
                                                            currentWalletType === 'TeleportWallet' ?
                                                                <img className='butNoLogo' alt='' src={TeleportLogo} />
                                                                :
                                                                currentWalletType === 'OkxWallet' ?
                                                                    <img className='butNoLogo' alt='' src={OkxLogo} />
                                                                    :
                                                                    currentWalletType === 'Tokenpocket' ?
                                                                        <img className='butNoLogo' alt='' src={TokenPocketLogo} />
                                                                        :
                                                                        currentWalletType === 'WalletConnect' ?
                                                                            <img className='butNoLogo' alt='' src={WalletConnectLogo} />
                                                                            :
                                                                            ''
                                                    }
                                                </WallterErrorButContent>
                                                :
                                                ''
                                }

                                {
                                    loginStatus === 3 ?
                                        <BackWalletContent>
                                            <div className='tryAgainBut' onClick={tryAgainClick}>
                                                <FormattedMessage id='login.try' defaultMessage="" />
                                            </div>
                                            <div className="backBut" onClick={backWalletsClick}>
                                                <FormattedMessage id='login.back' defaultMessage="" />
                                            </div>
                                        </BackWalletContent>
                                    :
                                        ''
                                }
                            </div>
                        </WalletBlock>
                }
            </WalletContent>

            <PaySuccessModel ref={PaySuccessModelRef}/> 
        </MainConten>
    )
}

export default HackathonPage