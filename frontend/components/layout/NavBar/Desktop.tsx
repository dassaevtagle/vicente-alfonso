import Link from 'next/link'
import { useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import ExternalLink from '../../common/ExternalLink'
import VerticalLines from '../../common/VerticalLines'

type Props = {
  displayName: boolean
  links: {
    facebook: string
    twitter: string
    email: string
  }
}

const DesktopNavBar = ({ displayName, links }: Props) => {
  const [showContact, setShowContact] = useState<boolean>(false)

  return (
    <>
      {displayName && (
        <h1 className="text-6xl times-new-roman italic font-medium text-center pt-4 pb-8">
          Vicente Alfonso
        </h1>
      )}
      <header className="sticky top-0 z-10 bg-white uppercase typewriter">
        <nav>
          <VerticalLines>
            <div className="flex justify-evenly px-20">
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
            </div>
            {showContact && (
              <ul
                className={
                  'grid w-full justify-center hover:cursor-pointer gap-y-4 pt-3 source-sans-pro capitalize'
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
          </VerticalLines>
        </nav>
      </header>
    </>
  )
}

export default DesktopNavBar
