import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'

import { fetchAPI } from '../../lib/api'
import {
  Book as BookType,
  CollectionStrapiResponse,
  Review,
  StrapiRecord,
} from '../../interfaces/strapi'
import ReactMarkdown from 'react-markdown'
import Carousel, { CarouselItem } from '../../components/common/Carousel'
import htmlParse from 'html-react-parser'

const BookReviews = ({
  reviews,
}: {
  reviews: CollectionStrapiResponse<Review>
}) => (
  <Carousel arrows={false}>
    {reviews.data.map((review) => (
      <CarouselItem key={review.id} widthPercentage={100}>
        <div className="mx-auto px-5 lg:px-44 my-20 lg:my-5">
          <ReactMarkdown className="text-center mb-10 italic">{`"${review.attributes.content}"`}</ReactMarkdown>
          <ReactMarkdown className="text-right">
            {review.attributes.author}
          </ReactMarkdown>
        </div>
      </CarouselItem>
    ))}
  </Carousel>
)

const Book = ({ book }: { book: StrapiRecord<BookType> }) => {
  return (
    <Layout title={book.attributes.title}>
      <div className="grid md:grid-cols-12 sm:p-8 justify-items-center items-top">
        {/* Book content */}
        <div className="order-last md:order-first md:col-span-7 pt-4 lg:px-10 lg:pt-0 ">
          <div className="pl-4 mb-8 md:mb-12">
            <h1 className="text-4xl italic times-new-roman indent-2 self-baseline">
              {book.attributes.title}
            </h1>
            <span className="text-sm text-zinc-700">
              {book.attributes.subtitle && book.attributes.subtitle}
            </span>
          </div>
          <div className='mt-3 mx-auto mb-6 md:mb-0 w-11/12 md:w-10/12'>
            {htmlParse(book.attributes.description)}
          </div>
        </div>
        {/* Book image */}
        <Image
          className="object-cover w-[20rem] md:h-[31rem] md:col-span-5 mx-4 md:m-0 border-solid border-2 rounded-[2px] self-baseline mt-10 md:mt-0"
          image={book.attributes.cover_image}
        />
      </div>
      {/* Book reviews (if any) */}
      {book.attributes.reviews.data.length > 0 && (
        <BookReviews reviews={book.attributes.reviews} />
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const booksRes = await fetchAPI<BookType>('/books', {
    fields: ['slug'],
  })

  //'/books' is an endpoint from collection type. It will always return an array.
  if (booksRes.data instanceof Array) {
    return {
      paths: booksRes.data.map((book) => ({
        params: {
          slug: book.attributes.slug,
        },
      })),
      fallback: false,
    }
  }
}

export async function getStaticProps({ params }) {
  const booksRes = await fetchAPI<BookType>('/books', {
    filters: {
      slug: params.slug,
    },
    populate: '*',
  })

  return {
    props: { book: booksRes.data[0] },
    revalidate: 1,
  }
}

export default Book
