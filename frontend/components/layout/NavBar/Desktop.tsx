import Link from 'next/link'
import { useState } from 'react'
import VerticalLines from '../../common/VerticalLines'

type Props = {
  displayName: boolean
}

const DesktopNavBar = ({ displayName }: Props) => {
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
                <ul className={`${showContact ? 'block' : 'hidden'}`}>
                  <li className="border-solid border-2 border-black">
                    contacto
                  </li>
                  <li className="border-solid border-2 border-black">
                    contacto
                  </li>
                  <li className="border-solid border-2 border-black">
                    contacto
                  </li>
                  <li className="border-solid border-2 border-black">
                    contacto
                  </li>
                  <li className="border-solid border-2 border-black">
                    contacto
                  </li>
                </ul>
              </div>
            </div>
          </VerticalLines>
        </nav>
      </header>
    </>
  )
}

export default DesktopNavBar
