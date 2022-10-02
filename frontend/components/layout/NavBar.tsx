import Link from 'next/link'
import VerticalLines from '../common/VerticalLines'

type NavBarProps = {
  facebook_url: string
  twitter_url: string
  email: string
}

const NavBar = ({ facebook_url, twitter_url, email }: NavBarProps) => (
  <header className="sticky top-0 z-10">
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
          <Link href="/users">
            <a>Bloc de notas</a>
          </Link>
          <div>Contacto</div>
        </div>
      </VerticalLines>
    </nav>
  </header>
)

export default NavBar
