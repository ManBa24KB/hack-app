import { memo } from "react"
import {
    GoogleReCaptchaProvider,
    GoogleReCaptcha
} from 'react-google-recaptcha-v3'

const UseRecapt = memo((props: any) => {
    const refreshReCaptcha = false

    const onVerify = (token: string) => {
        props.handleToken(token)
    }

    return (
        <GoogleReCaptchaProvider useEnterprise={false} useRecaptchaNet={true} reCaptchaKey="6LcjRrInAAAAANVk9cEVBsFwEFibAmcI6-LxrAwP">
            <GoogleReCaptcha onVerify={(res: string) => onVerify(res)} refreshReCaptcha={refreshReCaptcha} action="twitter_verify" />
        </GoogleReCaptchaProvider>
    )
})

export default UseRecapt