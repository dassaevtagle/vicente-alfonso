import { SingleStrapiResponse } from './api'
import { Media } from './common'
import { Seo } from './components'

export type Global = {
  siteName: string
  defaultSeo: Seo
  favicon?: SingleStrapiResponse<Media>
}

export type Homepage = {
  seo: Seo
}
