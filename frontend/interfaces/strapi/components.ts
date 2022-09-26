import { SingleStrapiResponse } from './api'
import { Media } from './common'

//Each API response attaches and ID to a component call.
export type ComponentApiResponse = {
  id?: number
}

export type Seo = ComponentApiResponse & {
  metaTitle: string
  metaDescription: string
  shareImage?: SingleStrapiResponse<Media>
}
