import Link from 'next/link'
import Layout from '../components/layout/Layout'

const NotFound = () => (
  <Layout title={'404'} displayName>
    <section className="grid items-center justify-items-center text-center h-[80vh]">
      <div>
        <h1 className="text-2xl font-semibold mb-8">
          Ups! Parece que la página que buscas no existe o se ha eliminado.
        </h1>
        <a className="border-solid border-[2px] rounded-[2px] border-black hover:cursor-pointer hover:bg-black hover:text-white p-2 font-medium">
          <Link href={'/'}>Regresar a Inicio</Link>
        </a>
      </div>
    </section>
  </Layout>
)

export default NotFound
