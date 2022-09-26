import Seo from '../../components/common/Seo'
import Layout from '../../components/layout/Layout'

import { fetchAPI } from '../../lib/api'
import { getStrapiMedia } from '../../lib/media'
import { Article as ArticleType } from '../../interfaces/strapi'
import ReactMarkdown from 'react-markdown'

const Article = ({ article }) => {
  const imageUrl = getStrapiMedia(article.attributes.image)

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }

  return (
    <Layout title="Blog">
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown children={article.attributes.content} />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.attributes.author.data.attributes.picture && (
                <img
                  src={getStrapiMedia(
                    article.attributes.author.data.attributes.picture
                  )}
                  alt={
                    article.attributes.author.data.attributes.picture.data
                      .attributes.alternativeText
                  }
                  style={{
                    position: 'static',
                    borderRadius: '20%',
                    height: 60,
                  }}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.attributes.author.data.attributes.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                {article.attributes.published_at}
              </p>
            </div>
          </div>
        </div>
      </div>
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
    populate: ['image', 'category', 'author.picture'],
  })

  return {
    props: { article: articlesRes.data[0] },
    revalidate: 1,
  }
}

export default Article
