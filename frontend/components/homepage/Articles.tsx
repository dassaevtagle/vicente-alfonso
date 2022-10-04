import Link from 'next/link'
import React from 'react'
import { Article, StrapiRecord } from '../../interfaces/strapi'
import VerticalLines from '../common/VerticalLines'

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="w-full border-solid border-slate-50 border-2 mb-5 p-2">
        <h2 className="text-lg">{article.title}</h2>
        {article.category && article.category.data.attributes.name}
        <br />
        {article.description}
      </div>
    </Link>
  )
}

type ArticlesProps = {
  articles: StrapiRecord<Article>[]
}

const Articles = ({ articles }: ArticlesProps) => {
  return (
    <div className="container">
      <VerticalLines>
        <div className="times-new-roman pl-10 font-bold text-3xl">
          Bloc de Notas
        </div>
      </VerticalLines>
      <div className="px-16 mx-auto">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article.attributes} />
        ))}
      </div>
      <Link href={'/articles'}>Ver más</Link>
    </div>
  )
}

export default Articles
