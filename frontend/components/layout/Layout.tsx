import React, { ReactNode, useContext } from 'react'
import Head from 'next/head'
import NavBar from './NavBar'
import Footer from './Footer'
import { GlobalContext } from '../../pages/_app'

type Props = {
  children?: ReactNode
  title: string
  displayName?: boolean
}

const Layout = ({ children, title, displayName = false }: Props) => {
  const { siteName, facebook_url, email, twitter_url } =
    useContext(GlobalContext)

  return (
    <div>
      <Head>
        {/* Title will be overriden by metaTitle in Seo component if declared */}
        <title>{`${title} | ${siteName}`} </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {displayName && (
        <h1 className="text-6xl times-new-roman italic font-medium text-center pt-4 pb-8">
          Vicente Alfonso
        </h1>
      )}
      <NavBar
        facebook_url={facebook_url}
        twitter_url={twitter_url}
        email={email}
      />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
