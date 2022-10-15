import Link from 'next/link'
import { Book, StrapiRecord } from '../../interfaces/strapi'
import Image from '../common/Image'
import Carousel, { CarouselItem } from '../common/Carousel'
import useWidth from '../../hooks/useWidth'

const BookCard = ({ book }: { book: Book }) => (
  <div className="hover:cursor-pointer mt-3 mx-auto mb-6">
    <Link href={`/books/${book.slug}`}>
      <div className="grid grid-rows-[auto]">
        <div className="mx-auto">
          <Image
            image={book.cover_image}
            className="w-48 object-cover h-[300px] drop-shadow-[0_25px_25px_rgba(0,0,0,0.23)]"
          />
        </div>
        <h3 className="text-2xl text-center mt-6 source-sans-pro font-medium">
          {book.title}
        </h3>
      </div>
    </Link>
  </div>
)

const Books = ({ books }: { books: StrapiRecord<Book>[] }) => {
  const { isMobile } = useWidth()
  return (
    <section className="w-full px-1 lg:px-14 py-32 ">
      <div className="relative flex py-3 items-center">
        {!isMobile && (
          <div className="flex-grow border-t border-gray-400"></div>
        )}
        <span className="flex-shrink mx-auto my-3 md:my-0 md:mx-4 text-gray-800 text-4xl times-new-roman uppercase tracking-[20px]">
          <h2>Libros</h2>
        </span>
      </div>
      <Carousel paused circles={false}>
        {books.map((book) => (
          <CarouselItem key={book.id}>
            <BookCard book={book.attributes} />
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  )
}

export default Books
