import React, { ReactNode, useContext } from 'react'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from './Footer'
import { GlobalContext } from '../../pages/_app'

type Props = {
  children?: ReactNode
  title: string
}

const Layout = ({ children, title }: Props) => {
  const { siteName } = useContext(GlobalContext)

  return (
    <div>
      <Head>
        {/* Title will be overriden by metaTitle in Seo component if declared */}
        <title>{`${title} | ${siteName}`} </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
