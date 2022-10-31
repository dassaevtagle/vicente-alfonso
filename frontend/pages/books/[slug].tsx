import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'

import { fetchAPI } from '../../lib/api'
import {
  Book as BookType,
  CollectionStrapiResponse,
  Review,
  StrapiRecord,
} from '../../interfaces/strapi'
import Carousel, { CarouselItem } from '../../components/common/Carousel'
import htmlParse from 'html-react-parser'
import { useState } from 'react'
import Modal from '../../components/common/Modal'

const BookReviews = ({
  reviews,
}: {
  reviews: CollectionStrapiResponse<Review>
}) => (
  <Carousel arrows={false}>
    {reviews.data.map((review) => (
      <CarouselItem key={review.id} widthPercentage={100}>
        <div className="mx-auto px-5 lg:px-44 my-20 lg:my-5">
          <div className="text-center mb-10 italic">
            {htmlParse(review.attributes.content)}
          </div>
          <div className="text-right">
            {htmlParse(review.attributes.author)}
          </div>
        </div>
      </CarouselItem>
    ))}
  </Carousel>
)

const Book = ({ book }: { book: StrapiRecord<BookType> }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <Layout title={book.attributes.title} hideNavbarOnScroll>
        <div className="grid md:grid-cols-12 sm:p-8 justify-items-center items-top">
          {/* Book content */}
          <div className="md:col-span-7 pt-4 lg:px-10 lg:pt-0 ">
            <div className="pl-4 mb-8 md:mb-12">
              <h1 className="text-5xl italic times-new-roman indent-2 self-baseline pb-3">
                {book.attributes.title}
              </h1>
              <span className="text-zinc-700">
                {book.attributes.subtitle && book.attributes.subtitle}
              </span>
            </div>
            <div className="mt-3 mx-auto mb-6 md:mb-0 w-11/12 md:w-10/12 times-new-roman md:text-xl">
              {htmlParse(book.attributes.description)}
            </div>
          </div>
          {/* End of book content */}
          {/* Book image */}
          <div
            className="md:col-span-5 mx-4 md:m-0 mt-10 md:mt-0"
            onClick={() => setShowModal(true)}
          >
            <Image
              className="sticky top-16 object-cover w-[20rem] md:h-[31rem] border-solid border-2 rounded-[2px] hover:cursor-zoom-in"
              image={book.attributes.cover_image}
            />
          </div>
        </div>
        {/* Book reviews (if any) */}
        {book.attributes.reviews.data.length > 0 && (
          <BookReviews reviews={book.attributes.reviews} />
        )}
      </Layout>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Image
          nextImageProps={{ onClick: () => setShowModal(false) }}
          className="object-cover w-[18rem] md:w-[25rem] md:h-[38rem] border-solid border-[1px] border-white rounded-[2px] mt-10 md:mt-4 mx-auto hover:cursor-zoom-out"
          image={book.attributes.cover_image}
        />
      </Modal>
    </>
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
