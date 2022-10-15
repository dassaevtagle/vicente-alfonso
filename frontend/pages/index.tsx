import Layout from '../components/layout/Layout'
import Articles from '../components/homepage/Articles'
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
import * as moment from 'moment'

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
    <section className="md:grid md:grid-cols-[66.66%_33.33%] mt-4">
      <Articles articles={articles} />
      <About
        bio_photo={homepage.attributes.bio_photo}
        biography={homepage.attributes.biography}
      />
    </section>
    <div id="books">
      <Books books={books} />
    </div>
    <Reviews reviews={reviews} />
  </Layout>
)
export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, homepageRes, booksRes, noticesRes, reviewsRes] =
    await Promise.all([
      fetchAPI<Article>('/articles', {
        pagination: { page: 1, pageSize: 3 },
        populate: ['image', 'category'],
      }),
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

  let validNotices
  if (noticesRes.data instanceof Array) {
    const today = moment.default()
    //filters expired notices and non-historical
    validNotices = noticesRes.data.filter(
      (notice) =>
        today.isBefore(moment.default(notice.attributes.valid_until)) ||
        !!notice.attributes.historical
    )
  }

  return {
    props: {
      articles: articlesRes.data,
      homepage: homepageRes.data,
      books: booksRes.data,
      notices: validNotices,
      reviews: reviewsRes.data,
    },
    revalidate: 1,
  }
}

export default Home
