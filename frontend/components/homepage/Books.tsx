import Link from 'next/link'
import { Book, StrapiRecord } from '../../interfaces/strapi'
import Image from '../common/Image'
import Carousel, { CarouselItem } from '../common/Carousel'
import useWidth from '../../hooks/useWidth'

const BookCard = ({ book }: { book: Book }) => (
  <div className='hover:cursor-pointer  mx-auto'>
    <Link href={`/books/${book.slug}`}>
      <div className="grid" style={{ gridTemplateRows: 'auto' }}>
        <div className="w-48 mx-auto">
          <Image image={book.cover_image} />
        </div>
        <h3 className="text-lg text-center mt-4 w-11/12">{book.title}</h3>
      </div>
    </Link>
  </div>
)

const Books = ({ books }: { books: StrapiRecord<Book>[] }) => {
  const { isMobile } = useWidth()
  return (
    <section className="w-full px-1 lg:px-14 pt-10">
      <div className="relative flex py-5 items-center">
        {!isMobile && (
          <div className="flex-grow border-t border-gray-400"></div>
        )}
        <span
          className="flex-shrink mx-auto my-3 md:my-0 md:mx-4 text-gray-800 text-4xl times-new-roman uppercase"
          style={{ letterSpacing: '20px' }}
        >
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
