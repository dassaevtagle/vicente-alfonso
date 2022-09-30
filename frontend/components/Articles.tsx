import React from 'react'
import { Article, StrapiRecord } from '../interfaces/strapi'
import ArticleCard from './ArticleCard'

type ArticlesProps = {
  articles: StrapiRecord<Article>[]
}

const Articles = ({ articles }: ArticlesProps) => {
  return (
    <div className="container">
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-800 text-5xl">
          Bloc de Notas
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <div className="p-8 w-9/12 mx-auto">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article.attributes} />
        ))}
      </div>
    </div>
  )
}

export default Articles
