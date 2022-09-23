import { SingleStrapiResponse } from './api'
import { Media } from './common'
import { ComponentApiResponse, Seo } from './components'

export type Global = {
  siteName: string
  defaultSeo: ComponentApiResponse & Seo
  favicon?: SingleStrapiResponse<Media>
}

export type Homepage = {
  seo: ComponentApiResponse & Seo
}