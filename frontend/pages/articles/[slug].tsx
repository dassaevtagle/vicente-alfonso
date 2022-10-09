import Seo from '../../components/layout/Seo'
import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'

import { fetchAPI } from '../../lib/api'
import { Article as ArticleType, StrapiRecord } from '../../interfaces/strapi'
import ReactMarkdown from 'react-markdown'
import * as moment from 'moment'

type ArticleProps = {
  article: StrapiRecord<ArticleType>
}

const Article = ({ article }: ArticleProps) => {
  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }

  return (
    <Layout title="Blog">
      <Seo seo={seo} />
      <div className="container mx-auto px-2 md:px-20 pt-3">
      <h1 className="text-4xl text-left times-new-roman italic font-medium">{article.attributes.title}</h1>
      <span className="font-semibold">{moment.default(article.attributes.publishedAt).format('LL')}</span>
      <Image image={article.attributes.image} className="mx-auto mt-3 border-solid border-2 rounded-[3px]"/>
      <p className='text-indent-2 text-zinc-600 text-center text-lg italic p-5'>{article.attributes.description}</p>
      <ReactMarkdown className='px-2 md:px-4 text-justify'>{article.attributes.content}</ReactMarkdown>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const articlesRes = await fetchAPI<ArticleType>('/articles', {
    fields: ['slug'],
  })

  //'/articles' is an endpoint from collection type. It will always return an array.
  if (articlesRes.data instanceof Array) {
    return {
      paths: articlesRes.data.map((article) => ({
        params: {
          slug: article.attributes.slug,
        },
      })),
      fallback: false,
    }
  }
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI<ArticleType>('/articles', {
    filters: {
      slug: params.slug,
    },
    populate: ['image', 'category'],
  })

  return {
    props: { article: articlesRes.data[0] },
    revalidate: 1,
  }
}

export default Article
