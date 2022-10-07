import Link from 'next/link'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Article, StrapiRecord } from '../../interfaces/strapi'
import VerticalLines from '../common/VerticalLines'

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link href={`/articles/${article.slug}`}>
      <div
        className="w-full border-solid border-zinc-900 md:mb-5 px-4 pt-2 md:p-2"
        style={{ borderBottomWidth: '1px' }}
      >
        <h2 className="font-semibold text-lg">{article.title}</h2>
        <span className="text-sm pr-3 font-light text-zinc-600 block leading-none border-l-4 border-solid pl-2">
          {article.description}
        </span>
        <ReactMarkdown className="line-clamp-3 mt-4 -mb-3 md:mb-0 indent-2 text-sm md:text-base">
          {article.content}
        </ReactMarkdown>
        {/* {article.category && article.category.data.attributes.name} */}
        <br />
      </div>
    </Link>
  )
}

type ArticlesProps = {
  articles: StrapiRecord<Article>[]
}

const Articles = ({ articles }: ArticlesProps) => {
  return (
    <div className="container mx-auto">
      <div className="mb-5">
        <VerticalLines>
          <div className="times-new-roman md:pl-10 text-center font-bold text-3xl">
            Bloc de Notas
          </div>
        </VerticalLines>
      </div>
      <div className="md:px-16 mx-auto">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article.attributes} />
        ))}
      </div>
      <Link href={'/articles'}>
        <a className="hover:pointer mx-auto my-4 w-fit flex py-2 px-6 border-solid border-2 border-black">
          Ver más
        </a>
      </Link>
    </div>
  )
}

export default Articles
