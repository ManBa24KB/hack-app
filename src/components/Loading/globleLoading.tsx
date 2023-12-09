import styled from 'styled-components'
import { useAppSelector } from '@/state/hooks'
import ComLoading from '@/assets/images/comLoading.gif'

const LoadingContent = styled.div`
    position: absolute;
    height: 100vh;
    width: 100%;
    margin: auto;
    background: rgba(23, 23, 23, .71);
    z-index: 999;
    top: 0;
    left: 0;
    .gif {
        position: absolute;
        width: 70rem;
        /* height: 120rem; */
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .arc {
        position: absolute;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100rem;
        height: 100rem;
        border-radius: 50%;
        border-top: 2rem solid #ffea29;
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
        animation: rt 2s infinite linear;
    }
    .arc::before {
        position: absolute;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 70rem;
        height: 70rem;
        border-radius: 50%;
        border-top: 2rem solid #8d29ff;
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
        animation: rt 4s infinite linear reverse;
        content: "";
    }
    .arc::after {
        position: absolute;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 0;
        height: 0;
        border-radius: 50%;
        border-top: initial;
        border-left: initial;
        border-right: initial;
        animation: cw 1s infinite;
        content: "";
        background: snow;
    }

    h1 {
        position: absolute;
        height: 40rem;
        margin: auto;
        top: 200rem;
        left: 0;
        right: 0;
        bottom: 0;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 0.1em;
        font-size: 14rem;
        font-weight: lighter;
        color: white;
    }
    h1 span {
        display: none;
    }
    h1::after {
        animation: txt 5s infinite;
        content: "";
    }

    @keyframes rt {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes cw {
        0% {
            width: 0;
            height: 0;
        }
        75% {
            width: 40rem;
            height: 40rem;
        }
        100% {
            width: 0;
            height: 0;
        }
    }
    @keyframes txt {
        0% {
            content: "LOADING.";
        }
        50% {
            content: "LOADING..";
        }
        100% {
            content: "LOADING...";
        }
    }
`

const ComGlobleLoading = () => {
    const isLoading = useAppSelector((state) => state.loading.isGlobleLoading)

    return (
        <LoadingContent
            className='loader'
            style={{ visibility: isLoading ? 'visible' : 'hidden' }}
        >
            <img className='gif' alt='' src={ComLoading} />
        </LoadingContent>
    )
}
export default ComGlobleLoading