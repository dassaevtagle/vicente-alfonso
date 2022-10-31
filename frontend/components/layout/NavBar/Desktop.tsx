import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import ExternalLink from '../../common/ExternalLink'

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
  const router = useRouter()
  const activeRouteClass = "before:absolute before:translate-y-[8px] before:border-solid before:border-primary-yellow before:border-4 before:content-[''] before:ml-[-12px] before:rounded-full"
  
  return (
    <>
      {displayName && (
        <h1 className="text-6xl times-new-roman italic font-medium text-center pt-4 pb-8">
          <Link href="">Vicente Alfonso</Link>
        </h1>
      )}
      <header
        className="sticky top-0 z-10 uppercase source-sans-pro border-b-solid border-b-[1px] border-b-black py-3 bg-zinc-900 text-white"
        style={{ boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.25)' }}
      >
        <nav>
          <ul className="flex justify-evenly px-20">
            <li className={router.asPath === '/' ? activeRouteClass : ''}>
              <Link href="/">
                <a>Inicio</a>
              </Link>
            </li>
            <li className={router.asPath.includes('/#books') ? activeRouteClass : ''}>
              <Link href="/#books">
                <a>Libros</a>
              </Link>
            </li>
            <li className={router.asPath.includes('/multimedia') ? activeRouteClass : ''}>
              <Link href="/multimedia">
                <a>Multimedia</a>
              </Link>
            </li>
            <li className={router.asPath.includes('/articles') ? activeRouteClass : ''}>
              <Link href="/articles">
                <a>Bloc de notas</a>
              </Link>
            </li>
            <div
              onClick={() => setShowContact(!showContact)}
              className="hover:cursor-pointer"
            >
              <a>Contacto</a>
            </div>
          </ul>
          {showContact && (
            <ul
              className={
                'grid w-full justify-center gap-y-4 pt-3 source-sans-pro capitalize'
              }
            >
              {Array.from(Object.entries(links)).map((url, idx) => {
                let [linkName, linkUrl] = url
                const isEmail: boolean = linkName === 'email' ? true : false
                if (isEmail) linkName = linkUrl
                return (
                  <ExternalLink
                    key={idx}
                    href={`${isEmail ? 'mailto:' : ''}` + linkUrl}
                    classes={`${
                      isEmail ? 'lowercase' : ''
                    } flex mx-auto hover:cursor-pointer`}
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
        </nav>
      </header>
    </>
  )
}

export default DesktopNavBar
