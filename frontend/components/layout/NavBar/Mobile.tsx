import Link from 'next/link'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GrClose } from 'react-icons/gr'
const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen(!isOpen)
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
            <Link href="/">
              <a>Contacto</a>
            </Link>
          </div>
        </>
      ) : (
        <GiHamburgerMenu size={35} onClick={toggleOpen} />
      )}
    </header>
  )
}

export default MobileNavBar
