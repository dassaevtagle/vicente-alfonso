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
  return (
    <>
      {isMobile ? (
        <MobileNavBar />
      ) : (
        <DesktopNavBar displayName={displayName} />
      )}
    </>
  )
}

export default NavBar
