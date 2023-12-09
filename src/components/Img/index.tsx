import styled from 'styled-components'
import { useEffect, useState } from 'react'
import PersonLogo from '@/assets/images/defaultImg.png'
import greyToken from '@/assets/images/greyToken.png'

const ImgContent = styled.div`
    display: flex;
    align-items: center;
    .tokenLogoSrc {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 1rem solid #fff;
    }
    .spinner {
        width: 100%;
        height: 100%;
        margin: auto;
        background-color: #ACB5C5;
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

const ComImg = (props: any) => {
    const src: string = props.src || ''
    const width: string = props.width + 'rem'
    const height: string = props.width + 'rem'
    const errorImg: string = props.errorImg || PersonLogo
    const type: string = props.type || ''
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        if (src) {
            // 设置一个定时器，在1秒后更新计数器
            const timer = setTimeout(() => {
                updateImg(src)
            }, 200)
            // 返回一个清理函数，在组件卸载前执行
            return () => {
                // 取消定时器
                clearTimeout(timer)
            }
        } else {
            if (type === 'token') {
                setImgUrl(greyToken)
            } else {
                setImgUrl(errorImg)
            }
        }
    }, [src])

    const updateImg = (src: string) => {
        const image = new Image()
        image.src = src
        image.onload = ()=>{
            setImgUrl(src)
        }
        image.onerror = () => {
            if (type === 'token') {
                setImgUrl(greyToken)
            } else {
                setImgUrl(errorImg)
            }
        }
    }

    const handleImageErrored = () => {
        if (type === 'token') {
            setImgUrl(greyToken)
        } else {
            setImgUrl(errorImg)
        }
    }

    return (
        <ImgContent style={{width, height, minHeight: height, minWidth: width}}>
            {
                imgUrl ?
                    <img
                        className='tokenLogoSrc'
                        src={imgUrl}
                        onError={handleImageErrored}
                    />
                :
                    <div className="spinner" style={{width, height}}></div>
            }
            
        </ImgContent>
    )
}

export default ComImg