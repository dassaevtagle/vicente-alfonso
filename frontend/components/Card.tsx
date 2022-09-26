import React from 'react'
import Link from 'next/link'
import Image from './common/Image'

const Card = ({ article }) => {
  return (
    <Link href={`/article/${article.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="container w-32">
            <Image image={article.attributes.image} />
          </div>
          <div className="uk-card-body">
            <Link
              href={`/category/${article.attributes.category.data.attributes.name}`}
            >
              <p id="category" className="uk-text-uppercase">
                {article.attributes.category.data.attributes.name}
              </p>
            </Link>
            <p id="title" className="uk-text-large">
              {article.attributes.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Card
