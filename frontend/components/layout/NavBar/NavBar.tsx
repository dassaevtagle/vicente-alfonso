import useWidth from '../../../hooks/useWidth'
import DesktopNavBar from './Desktop'
import MobileNavBar from './Mobile'

type NavBarProps = {
  displayName: boolean
  facebook_url: string
  twitter_url: string
  email: string
}

const NavBar = ({
  displayName,
  facebook_url,
  twitter_url,
  email,
}: NavBarProps) => {
  const { isMobile } = useWidth()
  const links = {
    facebook: facebook_url,
    twitter: twitter_url,
    email,
  }
  return (
    <>
      {isMobile ? (
        <MobileNavBar links={links} />
      ) : (
        <DesktopNavBar displayName={displayName} links={links} />
      )}
    </>
  )
}

export default NavBar
