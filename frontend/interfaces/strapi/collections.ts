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
  slug: string
  reviews?: CollectionStrapiResponse<Review>
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
  file: SingleStrapiResponse<Media>
}

export type Review = {
  content: string
  author: string
  on_homepage: boolean
}
