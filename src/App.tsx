import { Suspense } from 'react'
import { IntlProvider } from 'react-intl'
import { useAppSelector } from '@/state/hooks'
import { AxiosInterceptor } from '@/api/request'
import RouterGurad from '@/routes/routerGurad'
import ComSuspenseGlobleLoading from '@/components/Loading/suspenseLoading'

const App = () => {
	const locale = useAppSelector((state: { locale: { localeState: any } }) => state.locale.localeState)

	return (
		<IntlProvider locale="en" messages={locale} defaultLocale="en">
			<AxiosInterceptor>
				<Suspense fallback={<ComSuspenseGlobleLoading delay={10} />}>
					<RouterGurad />
				</Suspense>
			</AxiosInterceptor>
		</IntlProvider>
	)
}  

export default App