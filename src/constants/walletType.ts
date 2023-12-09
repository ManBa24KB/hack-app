import WalletConnectProvider from "@walletconnect/web3-provider"
import { ethers } from "ethers"

export const getEthereum = (walletType: string = '') => {
    let ethereum: any = {}
    const type: string = walletType ? walletType :localStorage.getItem('walletType') || ''
    if (type === 'MetaMask') {
        ethereum = window.ethereum
    } else if (type === 'OkxWallet') {
        ethereum = window.okxwallet
    } else if (type === 'TeleportWallet') {
        ethereum = window.teleport
    } else if (type === 'Tokenpocket') {
        ethereum = window.ethereum
    } else {
        ethereum = window.ethereum
    }
    return ethereum
}

export const getAccount = async () => {
    let account: string = ''
    const type: string = localStorage.getItem('walletType') || ''
    if (['MetaMask', 'OkxWallet', 'TeleportWallet', 'Tokenpocket'].includes(type)) {
        const ethereum: any = getEthereum()
        const accounts = await ethereum.request({ method: 'eth_accounts' }) // Connecting to MetaMask
        if (accounts && accounts.length > 0) {
            const address: string = accounts[0] !== null ? accounts[0] : ''
            account = address
        }
    } else if (type === 'WalletConnect') {
        const walletProvider: any = new WalletConnectProvider({
            infuraId: 'dc94a23a93a0468dbb629468e3a045c8', // https://app.infura.io/dashboard/ethereum/dc94a23a93a0468dbb629468e3a045c8/settings
            rpc: {
                137: 'https://polygon-rpc.com/'
            }
        })
        const pro: any = await walletProvider.enable()
        if (pro.length && pro[0]) {
            account = pro[0]
            
        }
    }
    return account
}

export const getProvider = async (type: string) => {
    let provider: any = ''
    if (['MetaMask', 'OkxWallet', 'TeleportWallet', 'Tokenpocket'].includes(type)) {
        const ethereum: any = getEthereum(type)
        provider = new ethers.providers.Web3Provider(ethereum)
    } else if (type === 'WalletConnect') {
        const walletProvider: any = new WalletConnectProvider({
            infuraId: 'dc94a23a93a0468dbb629468e3a045c8', // https://app.infura.io/dashboard/ethereum/dc94a23a93a0468dbb629468e3a045c8/settings
            rpc: {
                137: 'https://polygon-rpc.com/'
            }
        })
        const pro: any = await walletProvider.enable()
        provider = new ethers.providers.Web3Provider(walletProvider)
    }
    return provider
}

export const getSigner = async (text: string = '') => {
    const MsgText: string = text ? text : 'Please sign this message to login to Scopescan and confirm you are the owner of this address.'
    const type: string = localStorage.getItem('walletType') || ''
    const provider: any = await getProvider(type)
    const signer = provider.getSigner()
    let signature: string = await signer.signMessage(MsgText) || ''
    return signature
}

export const getChainId = async (type: string) => {
    let chainId: number = 0
    const provier: any = await getProvider(type)
    console.log({
        provier
    })
    chainId = provier.provider.chainId
    return chainId
}