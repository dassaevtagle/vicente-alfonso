import Link from 'next/link'
import ExternalLink from '../common/ExternalLink'

const NavBar = () => (
  <header className="sticky top-0">
    <nav className="flex w-full justify-between py-2 bg-zinc-500 text-white uppercase">
      <div>
        <Link href="/">
          <a className="ml-2 mr-2">Inicio</a>
        </Link>
        <Link href="/about">
          <a className="mr-2">Libros</a>
        </Link>
        <Link href="/users">
          <a className="mr-2">Multimedia</a>
        </Link>
        <Link href="/users">
          <a className="mr-2">Blog</a>
        </Link>
      </div>
      <div>
        <ExternalLink classes="mr-2" href="/">
          Facebook
        </ExternalLink>
        <ExternalLink classes="mr-2" href="/about">
          Correo
        </ExternalLink>
      </div>
    </nav>
  </header>
)

export default NavBar
