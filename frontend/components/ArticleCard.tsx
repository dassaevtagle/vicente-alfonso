import React from 'react'
import Link from 'next/link'
import Image from './common/Image'
import { Article } from '../interfaces/strapi'

type ArticleProps = {
  article: Article
}

const ArticleCard = ({ article }: ArticleProps) => {
  return (
    <div className="w-full border-solid border-slate-50 border-2 mb-5 p-2">
      <h2 className='text-lg'>
        {article.title}
      </h2>
      {article.category.data.attributes.name}
      <br />
      {article.description}
    </div>
  )
}

export default ArticleCard
