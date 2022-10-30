import Link from 'next/link'
import Image from '../common/Image'
import React, { useMemo } from 'react'
import htmlParse from 'html-react-parser'
import { Article, StrapiRecord } from '../../interfaces/strapi'
import { FiArrowRightCircle } from 'react-icons/fi'

const ArticleCard = ({ article }: { article: Article }) => {
  const MAX_CONTENT_LENGTH = 300
  const trimmedContent = useMemo(() => {
    let arr = article.content.split('')
    return arr.slice(0, MAX_CONTENT_LENGTH).join('') + '...'
  }, [article.content])

  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="w-full border-solid border-zinc-900 md:mb-5 px-4 pt-2 pb-4 md:p-2 border-b-[1px] bg-white">
        <div className="grid sm:grid-cols-3">
          <Image image={article.image} className='w-full h-48 sm:h-44 object-cover hover:brightness-110 hover:saturate-[1.1] border-solid border-2'/>
          {/* Article text content */}
          <div className='sm:col-span-2 sm:pl-3'>
            <span className='float-right pt-2 pr-2 md:p-0'>
              <FiArrowRightCircle size={25} stroke-width="1"/>
            </span>
            <h2 className="font-semibold text-lg">{article.title}</h2>
            <span className="text-sm pr-3 font-light text-zinc-600 block leading-none border-l-4 border-solid border-primary-yellow pl-2">
              {article.description}
            </span>
            <div className="mt-4 -mb-3 md:mb-0 text-sm md:text-base">
              {htmlParse(trimmedContent)}
            </div>
            {/* {article.category && article.category.data.attributes.name} */}
            <br />
          </div>
          {/* End of article text content */}
        </div>
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
          <div className="times-new-roman md:pl-10 text-center font-bold text-3xl">
            Bloc de Notas
          </div>
      </div>
      <div className="md:px-10 mx-auto">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article.attributes} />
        ))}
      </div>
      <Link href={'/articles'}>
        <a className="hover:pointer mx-auto my-4 w-fit flex py-2 px-6 border-solid border-[1px] border-black">
          Ver más
        </a>
      </Link>
    </div>
  )
}

export default Articles
