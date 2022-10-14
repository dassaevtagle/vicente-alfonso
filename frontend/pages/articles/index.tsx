import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'
import { fetchAPI } from '../../lib/api'
import { Article as ArticleType, StrapiRecord } from '../../interfaces/strapi'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import * as moment from 'moment'

const ArticleCard = ({ article }: { article: StrapiRecord<ArticleType> }) => (
  <div className="border-solid border-t-2">
    <div className="flex lg:grid lg:grid-cols-12">
      <div className="w-2/3 lg:w-auto lg:col-span-9 self-center">
        <span className="text-sm pl-2 md:pl-0 float-right text-zinc-800">
          {moment.default(article.attributes.publishedAt).format('LL')}
        </span>
        <h3 className="uppercase times-new-roman tracking-[4px] text-sm sm:text-base">
          {article.attributes.title}
        </h3>
        <p className="text-xs sm:text-sm italic pl-2">
          {article.attributes.description}
        </p>
        <Link href={`/articles/${article.attributes.slug}`}>
          <a>
            <ReactMarkdown className="line-clamp-4 sm:line-clamp-6 text-xs sm:text-sm mt-2 hover:cursor-pointer">
              {article.attributes.content}
            </ReactMarkdown>
          </a>
        </Link>
        <span className="hidden sm:block hover:cursor-pointer float-right text-xs hover:text-white hover:bg-gray-900 border-black border-solid border-[1px] rounded-[2px] my-2 p-1">
          <Link href={`/articles/${article.attributes.slug}`}>
            <a>Seguir Leyendo</a>
          </Link>
        </span>
      </div>
      <div className="w-1/3 lg:w-auto lg:col-span-3 m-auto p-2">
        <Link href={`/articles/${article.attributes.slug}`}>
          <Image
            className="hover:cursor-pointer m-auto h-[11rem] lg:h-[15rem] w-auto lg:min-w-fit rounded-[2px]"
            image={article.attributes.image}
          />
        </Link>
      </div>
    </div>
  </div>
)

const Articles = ({ articles }: { articles: StrapiRecord<ArticleType>[] }) => {
  return (
    <Layout title={'Bloc de Notas'}>
      <h2 className="text-center text-4xl times-new-roman italic py-2">
        Bloc de notas
      </h2>
      <div className="container mx-auto px-2 lg:px-36">
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
