import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import { appWithTranslation } from 'next-i18next'
import SmoothCursor from '../components/SmoothCursor'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SmoothCursor />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}


export default appWithTranslation(MyApp)
