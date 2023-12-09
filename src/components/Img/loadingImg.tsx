import { useEffect, useState } from 'react'
import styled from 'styled-components'

const LoadingImgContent = styled.div`
    width: 191rem;
    height: 191rem;
    @media (min-width: 1600px) { 
        width: 100%;
        height: 100%;
    }
    .CollectionImg {
        width: 100%;
        height: 100%;
        border-radius: 9rem 9rem 0 0;
    }
    .spinner {
        width: 100%;
        height: 100%;
        margin: auto;
        background-color: #333;
        border-radius: 100%;  
        -webkit-animation: scaleout 1.0s infinite ease-in-out;
        animation: scaleout 1.0s infinite ease-in-out;
    }
        
    @-webkit-keyframes scaleout {
        0% { -webkit-transform: scale(0.0) }
        100% {
            -webkit-transform: scale(1.0);
            opacity: 0;
        }
    }
        
    @keyframes scaleout {
        0% { 
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        } 100% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
            opacity: 0;
        }
    }
`

const ComLoadingImg = (props: any) => {
    const src:string = props.src
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        if (src) {
            updateImg(src)
        }
    }, [src])

    const updateImg = (src: string) => {
        const image = new Image()
        image.src = src
        image.onload = ()=>{
            setImgUrl(src)
        }
    }

    return (
        <LoadingImgContent>
            {
                imgUrl ?
                    <img className='CollectionImg' src={imgUrl} alt="" />
                :
                    <div className="spinner"></div>
            }
            
        </LoadingImgContent>
    )
}

export default ComLoadingImg