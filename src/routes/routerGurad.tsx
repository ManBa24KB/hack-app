import { useRoutes } from 'react-router-dom'

import HackathonPage from '@/page/hackathon'
import HackDataPage from '@/page/hackathon/hackdata'

const RouterGurad = () => {
    const fullPageRoute = [
        {
            path: '',
            redirect: '/main',
            element: <HackathonPage />
        },
        {
            path: '/main',
            element: <HackathonPage />
        },
        {
            path: '/hackData/:contractAddress',
            element: <HackDataPage />
        }
    ]
    return useRoutes([...fullPageRoute])
}

export default RouterGurad