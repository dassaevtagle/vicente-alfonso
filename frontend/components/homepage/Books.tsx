import Link from 'next/link'
import { Book, StrapiRecord } from '../../interfaces/strapi'
import Image from '../common/Image'
import Carousel, { CarouselItem } from './Carousel'

const Books = ({ books }: { books: StrapiRecord<Book>[] }) => {
  return (
    <section className="w-full px-14 pt-4">
      <h2 className="text-3xl">Mis Libros</h2>
      <Carousel>
        {books.map((book) => (
          <CarouselItem key={book.id}>
            <Link href={`/books/${book.attributes.slug}`}>
              {book.attributes.title}
            </Link>
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  )
}

export default Books
