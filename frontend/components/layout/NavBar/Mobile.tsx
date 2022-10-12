import Link from 'next/link'
import { useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
import ExternalLink from '../../common/ExternalLink'

type Props = {
  links: {
    facebook: string
    twitter: string
    email: string
  }
}

const MobileNavBar = ({ links }: Props) => {
  const [showContact, setShowContact] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => {
    setIsOpen(!isOpen)
    setShowContact(false)
  }
  return (
    <header
      className="w-full flex flex-wrap justify-between px-4 py-4 border-b-2 sticky top-0 z-10 bg-white"
      style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)' }}
    >
      <h1 className="text-3xl times-new-roman italic font-medium text-left">
        Vicente Alfonso
      </h1>
      {isOpen ? (
        <>
          <GrClose size={35} onClick={toggleOpen} />
          <div className="grid w-full text-center justify-center gap-y-14 pt-8 uppercase typewriter">
            <Link href="/">
              <a>Inicio</a>
            </Link>
            <Link href="/#books">
              <a>Libros</a>
            </Link>
            <Link href="/multimedia">
              <a>Multimedia</a>
            </Link>
            <Link href="/articles">
              <a>Bloc de notas</a>
            </Link>
            <div onClick={() => setShowContact(!showContact)}>
              <a>Contacto</a>
            </div>
            {showContact && (
              <ul
                className={
                  'grid w-full justify-center hover:cursor-pointer gap-y-4 -mt-6 source-sans-pro capitalize'
                }
              >
                {Array.from(Object.entries(links)).map((url, idx) => {
                  let [linkName, linkUrl] = url
                  const isEmail: boolean = linkName === 'email' ? true : false
                  if (isEmail) linkName = linkUrl
                  return (
                    <ExternalLink
                      key={idx}
                      href={linkUrl}
                      classes={`${isEmail ? 'lowercase' : ''} flex mx-auto`}
                    >
                      {linkName}{' '}
                      {!isEmail && (
                        <FiExternalLink className="my-auto ml-2"></FiExternalLink>
                      )}
                    </ExternalLink>
                  )
                })}
              </ul>
            )}
          </div>
        </>
      ) : (
        <GiHamburgerMenu size={35} onClick={toggleOpen} />
      )}
    </header>
  )
}

export default MobileNavBar
