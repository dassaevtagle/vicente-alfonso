import { SingleStrapiResponse } from './api'
import { Media } from './common'
import { Seo } from './components'

export type Global = {
  siteName: string
  defaultSeo: Seo
  favicon: SingleStrapiResponse<Media>
  facebook_url: string
  twitter_url: string
  email: string
}

export type Homepage = {
  seo: Seo
  biography: string
  bio_photo: SingleStrapiResponse<Media>
}
