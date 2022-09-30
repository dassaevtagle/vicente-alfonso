import Layout from '../components/layout/Layout'
import Articles from '../components/Articles'
import { fetchAPI } from '../lib/api'
import {
  Article,
  Book,
  Homepage,
  Notice,
  StrapiRecord,
} from '../interfaces/strapi'
import Seo from '../components/common/Seo'
import Books from '../components/homepage/Books'
import About from '../components/homepage/About'
import Notices from '../components/homepage/Notices'

type HomeStaticProps = {
  articles: StrapiRecord<Article>[]
  homepage: StrapiRecord<Homepage>
  books: StrapiRecord<Book>[]
  notices: StrapiRecord<Notice>[]
}

const Home = ({ articles, homepage, books, notices }: HomeStaticProps) => (
  <Layout displayName title="Inicio">
    <Seo seo={homepage.attributes.seo} />
    <Notices notices={notices} />
    <Books books={books} />
    <Articles articles={articles} />
    <div className="relative flex mb-5">
      <div className="flex-grow border-t border-black border-solid"></div>
    </div>
    <About
      bio_photo={homepage.attributes.bio_photo}
      biography={homepage.attributes.biography}
    />
  </Layout>
)
export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, homepageRes, booksRes, noticesRes] = await Promise.all([
    fetchAPI<Article>('/articles', { populate: ['image', 'category'] }),
    fetchAPI<Homepage>('/homepage', {
      populate: {
        seo: { populate: '*' },
        bio_photo: { populate: '*' },
      },
    }),
    fetchAPI<Book>('/books', {
      populate: '*',
      filters: {
        on_homepage: {
          $eq: true,
        },
      },
    }),
    fetchAPI<Notice>('/notices', { populate: '*' }),
  ])
  return {
    props: {
      articles: articlesRes.data,
      homepage: homepageRes.data,
      books: booksRes.data,
      notices: noticesRes.data,
    },
    revalidate: 1,
  }
}

export default Home
