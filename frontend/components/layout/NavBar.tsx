import Link from 'next/link'
import { useState } from 'react'
import VerticalLines from '../common/VerticalLines'

type NavBarProps = {
  facebook_url: string
  twitter_url: string
  email: string
}

const NavBar = ({ facebook_url, twitter_url, email }: NavBarProps) => {
  const [showContact, setShowContact] = useState<boolean>(false)
  return (
    <header className="sticky top-0 z-10 bg-white">
      <nav>
        <VerticalLines>
          <div className="flex justify-evenly px-20">
            <Link href="/">
              <a>Inicio</a>
            </Link>
            <Link href="/about">
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
              <ul className={`${showContact ? 'block' : 'hidden'}`}>
                <li className="border-solid border-2 border-black">contacto</li>
                <li className="border-solid border-2 border-black">contacto</li>
                <li className="border-solid border-2 border-black">contacto</li>
                <li className="border-solid border-2 border-black">contacto</li>
                <li className="border-solid border-2 border-black">contacto</li>
              </ul>
            </div>
          </div>
        </VerticalLines>
      </nav>
    </header>
  )
}

export default NavBar
