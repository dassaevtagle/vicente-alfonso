import Image from 'next/future/image'
import HeroImage from '../public/img/vicente-hero.jpeg'
import Layout from '../components/layout/Layout'
import styles from './index.module.css'
import Articles from '../components/Articles'
import { fetchAPI } from '../lib/api'
import { Article, Category } from '../interfaces/strapi'
import Seo from '../components/common/Seo'

const Home = ({ articles, homepage }) => (
  <Layout title="Inicio">
    <Seo seo={homepage.attributes.seo} />
    <section className="grid h-auto grid-cols-2 w-full mx-auto">
      <div className="w-full flex items-center bg-black text-white text-9xl">
        <h1 className="times-new-roman italic">Vicente Alfonso</h1>
      </div>
      <Image
        src={HeroImage}
        priority
        unoptimized
        className={styles['hero-image']}
        alt="Vicente Alfonso"
      />
    </section>
    <div className="uk-section">
      <div className="uk-container uk-container-large">
        <Articles articles={articles} />
      </div>
    </div>
  </Layout>
)
export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, homepageRes] = await Promise.all([
    fetchAPI<Article>('/articles', { populate: ['image', 'category'] }),
    fetchAPI('/homepage', {
      populate: {
        seo: { populate: '*' },
      },
    }),
  ])

  return {
    props: {
      articles: articlesRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  }
}

export default Home
