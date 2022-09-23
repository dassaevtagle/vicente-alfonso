import { Media, SingleStrapiResponse } from '../interfaces/strapi'
import { getStrapiURL } from './api'

export function getStrapiMedia(media: SingleStrapiResponse<Media>) {
  const { url } = media.data.attributes
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url
  return imageUrl
}
