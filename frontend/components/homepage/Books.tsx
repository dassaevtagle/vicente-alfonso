import Link from 'next/link'
import { Book, StrapiRecord } from '../../interfaces/strapi'
import Image from '../common/Image'
import Carousel, { CarouselItem } from '../common/Carousel'
import useWidth from '../../hooks/useWidth'

const Books = ({ books }: { books: StrapiRecord<Book>[] }) => {
  const { isMobile } = useWidth()
  return (
    <section className="w-full px-1 lg:px-14 pt-4">
      <div className="relative flex py-5 items-center">
        {!isMobile && (
          <div className="flex-grow border-t border-gray-400"></div>
        )}
        <span
          className="flex-shrink mx-auto md:mx-4 text-gray-800 text-4xl times-new-roman uppercase"
          style={{ letterSpacing: '20px' }}
        >
          <h2>Libros</h2>
        </span>
      </div>
      <Carousel paused circles={false}>
        {books.map((book) => (
          <CarouselItem key={book.id}>
            <Link href={`/books/${book.attributes.slug}`}>
              <div
                className="grid mx-auto"
                style={{ gridTemplateRows: 'auto' }}
              >
                <div className="w-48 mx-auto">
                  <Image image={book.attributes.cover_image} />
                </div>
                <h3 className="text-xl font-semibold mt-4">
                  {book.attributes.title}
                </h3>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  )
}

export default Books
