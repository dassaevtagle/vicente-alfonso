import Image from '../common/Image'
import { Book, StrapiRecord } from '../../interfaces/strapi'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Carousel = ({ books }: { books: StrapiRecord<Book>[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let timeout = setTimeout(() => {
      goToNextIndex(activeIndex)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [activeIndex])

  function goToNextIndex(activeIndex: number) {
    if (activeIndex + 1 === books.length) {
      setActiveIndex(0)
    } else {
      setActiveIndex(activeIndex + 1)
    }
  }

  return (
    <>
      <div className="overflow-hidden h-96">
        {books.map((book, idx) => (
          <div
            key={book.id}
            className={
              `${idx === activeIndex ? '' : 'hidden '}` + 'w-full h-full flex'
            }
          >
            <Link href={`/books/${book.attributes.slug}`}>
              <div className="w-8/12 m-auto">
                {book.attributes.title}
                <ReactMarkdown children={book.attributes.description} />
              </div>
            </Link>
            <Link href={`/books/${book.attributes.slug}`}>
              <div className="w-4/12">
                <Image responsive image={book.attributes.cover_image} />
              </div>
            </Link>
          </div>
        ))}
        <div className="relative w-full h-full">
          <span className="absolute">⬅</span>
          <span className="absolute right-0">➡</span>
        </div>
      </div>
    </>
  )
}

export default Carousel
