import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'
import { fetchAPI } from '../../lib/api'
import { Article as ArticleType, StrapiRecord } from '../../interfaces/strapi'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import * as moment from 'moment'

const ArticleCard = ({ article }: { article: StrapiRecord<ArticleType> }) => (
  <div className="border-solid border-t-2">
    <div className="grid grid-cols-12">
      <div className="col-span-8 md:col-span-9 self-center">
        <span className="text-sm pl-2 md:pl-0 md:float-right text-zinc-800">
          {moment.default(article.attributes.publishedAt).format('LL')}
        </span>
        <h3
          className="uppercase times-new-roman"
          style={{ letterSpacing: '4px' }}
        >
          {article.attributes.title}
        </h3>
        <span className="text-sm italic pl-2">
          {article.attributes.description}
        </span>
        <Link href={`/articles/${article.attributes.slug}`}>
          <a>
            <ReactMarkdown className="line-clamp-6 text-sm mt-2 hover:cursor-pointer">
              {article.attributes.content}
            </ReactMarkdown>
          </a>
        </Link>
        <Link
          href={`/articles/${article.attributes.slug}`}
          className="hover:cursor-pointer"
        >
          <a>Seguir Leyendo</a>
        </Link>
      </div>
      <div className="col-span-4 md:col-span-3 m-auto p-2">
        <Link href={`/articles/${article.attributes.slug}`}>
          <Image
            className="hover:cursor-pointer"
            image={article.attributes.image}
            style={{ height: '15rem', width: 'auto', borderRadius: '2px' }}
          />
        </Link>
      </div>
    </div>
  </div>
)

const Articles = ({ articles }: { articles: StrapiRecord<ArticleType>[] }) => {
  return (
    <Layout title={'Bloc de Notas'}>
      <h2 className='text-center text-4xl times-new-roman italic py-2'>Bloc de notas</h2>
      <div className="mx-2 md:mx-36">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const articlesRes = await fetchAPI<ArticleType>('/articles', {
    populate: '*',
  })
  return {
    props: { articles: articlesRes.data },
    revalidate: 1,
  }
}

export default Articles
