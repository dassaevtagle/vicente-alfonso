import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'
import { fetchAPI } from '../../lib/api'
import { Article as ArticleType, StrapiRecord } from '../../interfaces/strapi'
import ReactMarkdown from 'react-markdown'

const ArticleCard = ({ article }: { article: ArticleType }) => (
  <>
    {article.title}
    {article.category.data.attributes.name}
    {article.description}
    <Image image={article.image} />
    <ReactMarkdown>{article.content}</ReactMarkdown>
  </>
)

const Articles = ({ articles }: { articles: StrapiRecord<ArticleType>[] }) => {
  return (
    <Layout title={'Bloc de Notas'}>
      <>Bloc de notas</>
      <div className="container lg:px-32 h-96 whitespace-nowrap overflow-hidden text-ellipsis">
        {articles.map((article) => (
          <ArticleCard article={article.attributes} />
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
