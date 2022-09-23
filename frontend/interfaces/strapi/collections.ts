import { CollectionStrapiResponse, SingleStrapiResponse } from './api'
import { Media } from './common'

export type Article = {
  title: string
  description: string
  content: string
  slug: string
  category?: SingleStrapiResponse<Category>
  image?: SingleStrapiResponse<Media>
  author?: SingleStrapiResponse<Writer>
}

export type Category = {
  name: string
  slug: string
  articles?: CollectionStrapiResponse<Article>
}

export type Writer = {
  name: string
  picture?: Media
  articles?: CollectionStrapiResponse<Article>
  email: string
}
