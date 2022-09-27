import { CollectionStrapiResponse, SingleStrapiResponse } from './api'
import { Media } from './common'

export type Article = {
  title: string
  description: string
  content: string
  slug: string
  category: SingleStrapiResponse<Category>
  image?: SingleStrapiResponse<Media>
}

export type Book = {
  title: string
  description: string
  published: boolean
  cover_image: SingleStrapiResponse<Media>
  on_homepage: boolean
  slug: string
}

export type Category = {
  name: string
  slug: string
  articles?: CollectionStrapiResponse<Article>
}

export type Notice = {
  description: string
  title: string
  image: SingleStrapiResponse<Media>
  valid_until: string
}

export type Photo = {
  description: string
  year: number
  photo: SingleStrapiResponse<Media>
}
