import React from 'react'
import { Article, StrapiRecord } from '../interfaces/strapi'
import ArticleCard from './ArticleCard'

type ArticlesProps = {
  articles: StrapiRecord<Article>[]
}

const Articles = ({ articles }: ArticlesProps) => {
  return (
    <div className="w-full">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article.attributes} />
      ))}
    </div>
  )
}

export default Articles
