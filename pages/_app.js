
import { QuiscoProvider } from '@/context/QuiscoProvider'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <QuiscoProvider>
      <Component {...pageProps} />
    </QuiscoProvider>
  )
}
