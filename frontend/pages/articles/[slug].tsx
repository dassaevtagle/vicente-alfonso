import Seo from '../../components/common/Seo'
import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'

import { fetchAPI } from '../../lib/api'
import { Article as ArticleType, StrapiRecord } from '../../interfaces/strapi'
import ReactMarkdown from 'react-markdown'

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
      <h1 className="text-2xl">{article.attributes.title}</h1>
      <Image image={article.attributes.image} />
      <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
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
