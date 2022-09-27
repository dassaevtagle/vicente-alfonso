import Layout from '../../components/layout/Layout'

import { fetchAPI } from '../../lib/api'
import { Book as BookType, StrapiRecord } from '../../interfaces/strapi'
import ReactMarkdown from 'react-markdown'

const Book = ({ book }: { book: StrapiRecord<BookType> }) => {
  return (
    <Layout title={book.attributes.title}>
      <h1 className="text-3xl">{book.attributes.title}</h1>
      <ReactMarkdown children={book.attributes.description} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const booksRes = await fetchAPI<BookType>('/books', {
    fields: ['slug'],
  })

  //'/articles' is an endpoint from collection type. It will always return an array.
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
