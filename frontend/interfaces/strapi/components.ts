import { SingleStrapiResponse } from './api'
import { Media } from './common'

export type ComponentApiResponse = {
  id: number
}

export type Seo = {
  metaTitle: string
  metaDescription: string
  shareImage?: SingleStrapiResponse<Media>
}

export type Hero = {
  title: string
}
