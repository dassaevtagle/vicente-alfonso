import Seo from '../../components/layout/Seo'
import Layout from '../../components/layout/Layout'
import Articles from '../../components/Articles'

import { fetchAPI } from '../../lib/api'
import { Category } from '../../interfaces/strapi'

const Category = ({ category }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  }

  return (
    <Layout title="Categorías">
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.attributes.name}</h1>
          <Articles articles={category.attributes.articles.data} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI<Category>('/categories', {
    fields: ['slug'],
  })

  if (categoriesRes.data instanceof Array)
    return {
      paths:
        categoriesRes.data &&
        categoriesRes.data.map((category) => ({
          params: {
            slug: category.attributes.slug,
          },
        })),
      fallback: false,
    }
}

export async function getStaticProps({ params }) {
  const matchingCategories = await fetchAPI('/categories', {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: '*',
      },
    },
  })

  return {
    props: {
      category: matchingCategories.data[0],
    },
    revalidate: 1,
  }
}

export default Category
