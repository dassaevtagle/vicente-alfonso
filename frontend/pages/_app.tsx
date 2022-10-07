import App, { AppProps } from 'next/app'
import Head from 'next/head'
import { createContext } from 'react'
import { StrapiRecord, Global } from '../interfaces/strapi'
import { fetchAPI } from '../lib/api'
import { getStrapiMedia } from '../lib/media'
import '../styles/globals.css'
import 'moment/locale/es-mx'

type MyAppProps = AppProps & {
  pageProps: { global: StrapiRecord<Global> }
}

// Store Strapi Global object in context
export const GlobalContext = createContext<Global | null>(null)

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const { global } = pageProps

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI<Global>('/global', {
    populate: {
      favicon: '*',
      defaultSeo: {
        populate: '*',
      },
      footer_image: '*',
    },
  })

  // Pass the data to our page via props
  return {
    ...appProps,
    pageProps: {
      global: globalRes.data,
    },
  }
}

export default MyApp
