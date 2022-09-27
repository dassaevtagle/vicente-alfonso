import { Book, StrapiRecord } from '../../interfaces/strapi'
import Carousel from './Carousel'

const Books = ({ books }: { books: StrapiRecord<Book>[] }) => {
  return (
    <section className="w-full px-14 pt-4">
      <h2 className="text-3xl">Mis Libros</h2>
      <div>
        <Carousel books={books} />
      </div>
    </section>
  )
}

export default Books
