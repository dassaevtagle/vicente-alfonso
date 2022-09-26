import { Book, StrapiRecord } from '../../interfaces/strapi'
import Carousel from './Carousel'

const Books = ({ books }: { books: StrapiRecord<Book>[] }) => {
  return (
    <section className="w-full px-14">
      <h2 className="text-xl">Mis Libros</h2>
      <div>
        <Carousel books={books} />
      </div>
    </section>
  )
}

export default Books
