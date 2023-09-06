import { getAuthLayout } from '@/src/components/layout/auth-layout/auth-layout'
import { NextPageWithLayout } from '@/src/pages/_app'
import SignInPage from 'src/pages/auth/sign-in'

const Home: NextPageWithLayout = () => <SignInPage />

Home.getLayout = getAuthLayout
export default Home
