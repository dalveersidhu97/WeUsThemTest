
import Layout from "../Components/Layotu"
import { LoginProvider } from "../store/LoginContext"

function MyApp({ Component, pageProps }) {
  return <LoginProvider> 
        <Layout><Component {...pageProps} /></Layout>
    </LoginProvider>
}

export default MyApp
