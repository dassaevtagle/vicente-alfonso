import Link from 'next/link'

type NavBarProps = {
  facebook_url: string
  twitter_url: string
  email: string
}

const DividingLine = () => (
  <div className="relative flex py-2 px-20 items-center">
    <div className="flex-grow border-t border-gray-400"></div>
  </div>
)

const NavBar = ({ facebook_url, twitter_url, email }: NavBarProps) => (
  <header className="sticky top-0 z-10">
    <nav>
      <DividingLine />
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
        <Link href="/users">
          <a>Bloc de notas</a>
        </Link>
        <div>Contacto</div>
      </div>
      <DividingLine />
    </nav>
  </header>
)

export default NavBar
