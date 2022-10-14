import React, { ReactNode, useContext } from 'react'
import Head from 'next/head'
import NavBar from './NavBar/NavBar'
import Footer from './Footer'
import { GlobalContext } from '../../pages/_app'

type Props = {
  children?: ReactNode
  title: string
  displayName?: boolean
}

const Layout = ({ children, title, displayName = false }: Props) => {
  const { siteName, facebook_url, email, twitter_url, footer_image } =
    useContext(GlobalContext)

  return (
    <div>
      <Head>
        {/* Title will be overriden by metaTitle in Seo component if declared */}
        <title>{`${title} | ${siteName}`} </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar
        displayName={displayName}
        facebook_url={facebook_url}
        twitter_url={twitter_url}
        email={email}
      />
      <main className='bg-white'>{children}</main>
      <Footer footer_image={footer_image} />
      <div id="modals"></div>
    </div>
  )
}

export default Layout
