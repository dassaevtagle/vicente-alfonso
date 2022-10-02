import React from 'react'
import { Article, StrapiRecord } from '../interfaces/strapi'
import ArticleCard from './ArticleCard'
import VerticalLines from './common/VerticalLines'

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
    </div>
  )
}

export default Articles
