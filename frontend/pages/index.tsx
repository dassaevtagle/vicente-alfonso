import Layout from '../components/layout/Layout'
import Articles from '../components/Articles'
import { fetchAPI } from '../lib/api'
import {
  Article,
  Book,
  Homepage,
  Notice,
  Review,
  StrapiRecord,
} from '../interfaces/strapi'
import Seo from '../components/layout/Seo'
import Books from '../components/homepage/Books'
import About from '../components/homepage/About'
import Notices from '../components/homepage/Notices'
import Reviews from '../components/homepage/Reviews'

type HomeStaticProps = {
  articles: StrapiRecord<Article>[]
  homepage: StrapiRecord<Homepage>
  books: StrapiRecord<Book>[]
  notices: StrapiRecord<Notice>[]
  reviews: StrapiRecord<Review>[]
}

const Home = ({
  articles,
  homepage,
  books,
  notices,
  reviews,
}: HomeStaticProps) => (
  <Layout displayName title="Inicio">
    <Seo seo={homepage.attributes.seo} />
    <Notices notices={notices} />
    <div className="grid grid-cols-2 mt-4x">
      <Articles articles={articles} />
      <About
        bio_photo={homepage.attributes.bio_photo}
        biography={homepage.attributes.biography}
      />
    </div>
    <Books books={books} />
    <Reviews reviews={reviews} />
  </Layout>
)
export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, homepageRes, booksRes, noticesRes, reviewsRes] =
    await Promise.all([
      fetchAPI<Article>('/articles', { populate: ['image', 'category'] }),
      fetchAPI<Homepage>('/homepage', {
        populate: {
          seo: { populate: '*' },
          bio_photo: { populate: '*' },
        },
      }),
      fetchAPI<Book>('/books', {
        populate: '*',
      }),
      fetchAPI<Notice>('/notices', { populate: '*' }),
      fetchAPI<Review>('/reviews', {
        filters: {
          on_homepage: {
            $eq: true,
          },
        },
      }),
    ])
  return {
    props: {
      articles: articlesRes.data,
      homepage: homepageRes.data,
      books: booksRes.data,
      notices: noticesRes.data,
      reviews: reviewsRes.data,
    },
    revalidate: 1,
  }
}

export default Home
