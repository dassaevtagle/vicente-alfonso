import HeroImage from '../public/img/vicente-hero.jpeg'
import Layout from '../components/layout/Layout'
import Articles from '../components/Articles'
import { fetchAPI } from '../lib/api'
import { Article, Book, Homepage, StrapiRecord } from '../interfaces/strapi'
import Seo from '../components/common/Seo'
import Hero from '../components/homepage/Hero'
import Books from '../components/homepage/Books'

type HomeStaticProps = {
  articles: StrapiRecord<Article>[]
  homepage: StrapiRecord<Homepage>
  books: StrapiRecord<Book>[]
}

const Home = ({ articles, homepage, books }: HomeStaticProps) => (
  <Layout title="Inicio">
    <Seo seo={homepage.attributes.seo} />
    <Hero MainImage={HeroImage} />
    <Books books={books} />
    <div className="uk-section">
      <div className="uk-container uk-container-large">
        <Articles articles={articles} />
      </div>
    </div>
  </Layout>
)
export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, homepageRes, booksRes] = await Promise.all([
    fetchAPI<Article>('/articles', { populate: ['image', 'category'] }),
    fetchAPI<Homepage>('/homepage', {
      populate: {
        seo: { populate: '*' },
      },
    }),
    fetchAPI<Book>('/books', { 
      populate: '*',
      filters: {
        on_homepage: {
          $eq:true
        }
      }
    }),
  ])
  return {
    props: {
      articles: articlesRes.data,
      homepage: homepageRes.data,
      books: booksRes.data,
    },
    revalidate: 1,
  }
}

export default Home
