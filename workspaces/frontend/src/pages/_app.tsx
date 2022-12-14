/**
 * @since 2022/12/06
 * @author ThinhHV <thinh@thinhhv.com>
 * @description description
 * @copyright (c) 2022 Cloudmana Platform
 */

import 'simplebar/src/simplebar.css'
import 'src/assets/third-party/apex-chart.css'
import 'styles/global.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '../state'
import ThemeCustomization from 'src/themes'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { setupAuthInterceptor } from '../utils/api'
import ScrollTop from 'src/components/ScrollTop'
import MainLayout from 'src/layout/MainLayout'
import { Dots } from 'src/components/commons/Dots'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
})

setupAuthInterceptor(store)

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export function reportWebVitals(metric: any) {
  console.log(metric)
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
        <title>Cloudmana</title>
        <link rel="icon" href="/assets/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <!-- HTML Meta Tags --> */}
        <title>Cloudmana</title>
        {/* <meta
          name="description"
          content="A cutting-edge and secure launchpad powered by Creator Platform. KoiStarter promises to provide projects with an unique and amazing experience of well-organized and secure token sale procedures."
        /> */}

        {/* <!-- Facebook Meta Tags --> */}
        {/* <meta property="og:url" content="https://www.koistarter.io" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cloudmana" />
        {/* <meta
          property="og:description"
          content="A cutting-edge and secure launchpad powered by Creator Platform. KoiStarter promises to provide projects with an unique and amazing experience of well-organized and secure token sale procedures."
        /> */}
        <meta property="og:image" content="/assets/images/logo.svg" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta property="twitter:domain" content="koistarter.io" /> */}
        {/* <meta property="twitter:url" content="https://www.koistarter.io" /> */}
        <meta name="twitter:title" content="Shiniki" />
        {/* <meta
          name="twitter:description"
          content="A cutting-edge and secure launchpad powered by Creator Platform. KoiStarter promises to provide projects with an unique and amazing experience of well-organized and secure token sale procedures."
        /> */}
        <meta name="twitter:image" content="/assets/images/logo.svg" />
        <meta name="thumbnail" content="/assets/images/logo.svg" />

        {/* <!-- Meta Tags Generated via https://www.opengraph.xyz --> */}
      </Head>

      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <PersistGate loading={<Dots>Loading</Dots>} persistor={persistor}>
            <ThemeCustomization>
              <SnackbarProvider maxSnack={3}>
                <ScrollTop>{getLayout(<Component {...pageProps} />)}</ScrollTop>
              </SnackbarProvider>
            </ThemeCustomization>
          </PersistGate>
        </ReduxProvider>
      </QueryClientProvider>
    </>
  )
}
