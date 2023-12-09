
import styled from "styled-components"
import { Modal, Spin } from "antd"
import { useImperativeHandle, useState, forwardRef } from "react"
import orderSuccessImg from '@/assets/images/orderSuccess.png'
import ErrorTipImg from '@/assets/images/errorTip.png'
import { FormattedMessage } from 'react-intl'

const ModalContent = styled.div`
    padding: 40rem 0;
    box-sizing: border-box;
    .successBox {
        display: flex;
        justify-content: center;
        align-items: center;
        .successImg {
            width: 112rem;
        }
    }
    .title {
        text-align: center;
        font-size: 20rem;
        font-family: 'Inter';
        color: var(--whiteColor);
        margin: 20rem 0;
    }
`

const DescribeBlock = styled.div`
    .message {
        font-size: 14rem;
        font-family: 'Inter';
        color: var(--whiteColor);
        text-align: center;
    }
`

const LinkBlock = styled.div`
    margin-top: 20rem;
    .describe {
        font-size: 12rem;
        font-family: 'Inter';
        color: var(--whiteColor);
        text-align: center;
        a {
            color: var(--tagsColor);
        }
    }
`

const LoadingContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoadingText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20rem;
    font-size: 16rem;
    font-family: 'Inter';
    color: var(--whiteColor);
`

const PaySuccessModel = (props:any, ref: any) => {
    const [visible, setVisible] = useState(props.visible || false)
    const [type, setType] = useState(props.type)
    const [content, setContent] = useState(props.content)
    const [message, setMessage] = useState(props.message)
    const [state, setState] = useState(0) // 0 padding, 1 success, failed
    const [title, setTitle] = useState('')

    useImperativeHandle(ref, () => ({
        // onChild 就是暴露给父组件的方法
        updateData ({
            type = '',
            visible = false,
            title = '',
            message = '',
            content = '',
            state = 0
        }) {
            setType(type)
            setTitle(title)
            setVisible(visible)
            setMessage(message)
            setContent(content)
            setState(state)
        }
    }))

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return (
        <Modal
            title={title}
            open={visible}
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={null}
            width='620rem'
        >
            {
                state === 0 ?
                    <ModalContent>
                        <LoadingContent><Spin size="large" /></LoadingContent>
                        <LoadingText>
                            <FormattedMessage id='pricing.fee.processed' defaultMessage="" />
                        </LoadingText>
                    </ModalContent>
                :
                    state === 1 ?
                        <ModalContent>
                            <div className="successBox">
                                <img className="successImg" src={orderSuccessImg} alt="" />
                            </div>
                            <div className="title">
                                <FormattedMessage id='pricing.fee.confirmed' defaultMessage="" />
                            </div>
            
                            <DescribeBlock>
                                <div className="message">
                                    <FormattedMessage id='pricing.fee.system' defaultMessage="" />
                                </div>
                                <div className="message"> 
                                    <FormattedMessage id='pricing.fee.status' defaultMessage="" />
                                </div>
                                <div className="message">
                                    <FormattedMessage id='pricing.fee.membership' defaultMessage="" />
                                </div>
                            </DescribeBlock>
                            
                            <LinkBlock>
                                <div className="describe">
                                    <FormattedMessage id='pricing.fee.encounter' defaultMessage="" />
                                </div>
                                <div className="describe">
                                    <a href="community@0xscope.com">community@0xscope.com</a> 
                                    <span> <FormattedMessage id='pricing.fee.ticket' defaultMessage="" /> </span> 
                                    <a target="_blank" href="https://discord.com/invite/0xscope"><FormattedMessage id='pricing.fee.discord' defaultMessage="" /></a>
                                    <span> <FormattedMessage id='pricing.fee.channel' defaultMessage="" />.</span>
                                </div>
                            </LinkBlock>
                        </ModalContent>
                    :
                        state === 2 ?
                            <ModalContent>
                                <div className="successBox">
                                    <img className="successImg" src={ErrorTipImg} alt="" />
                                </div>
                                <LoadingText>{content}</LoadingText>
                            </ModalContent>
                        :
                            ''
            }
        </Modal>
    )
}
export default forwardRef(PaySuccessModel)