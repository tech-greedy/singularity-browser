import '../styles/globals.css'

import type { AppProps } from 'next/app'
import WholeSiteLayout from '../components/WholeSiteLayout'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Singularity Browser</title>
      </Head>
      <WholeSiteLayout><Component {...pageProps} /></WholeSiteLayout>
    </>
  )
}