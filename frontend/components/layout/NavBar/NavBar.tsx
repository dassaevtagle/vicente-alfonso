import { useEffect, useState } from 'react'
import useWidth from '../../../hooks/useWidth'
import ScrollIndicator from '../../common/ScrollIndicator'
import DesktopNavBar from './Desktop'
import MobileNavBar from './Mobile'

type NavBarProps = {
  displayName: boolean
  facebook_url: string
  twitter_url: string
  email: string
  scrollIndicator: boolean
  hideNavbarOnScroll: boolean
}

const NavBar = ({
  displayName,
  facebook_url,
  twitter_url,
  email,
  scrollIndicator,
  hideNavbarOnScroll,
}: NavBarProps) => {
  const { isMobile } = useWidth()
  const links = {
    facebook: facebook_url,
    twitter: twitter_url,
    email,
  }
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    if (!hideNavbarOnScroll) return null
    let lastPosition = 0
    function onScroll() {
      let currentPosition = window.scrollY
      if (lastPosition > currentPosition) {
        setShowNavbar(true)
      } else {
        setShowNavbar(false)
      }
      lastPosition = currentPosition
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {isMobile ? (
        <MobileNavBar links={links} showNavbar={showNavbar} />
      ) : (
        <DesktopNavBar
          displayName={displayName}
          links={links}
          showNavbar={showNavbar}
        />
      )}
      {scrollIndicator && <ScrollIndicator showNavbar={showNavbar} />}
    </>
  )
}

export default NavBar
