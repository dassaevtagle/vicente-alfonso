import { Photo } from '../interfaces/strapi'
import { fetchAPI } from '../lib/api'

const PAGE_SIZE = 6
const multimediaService = () => {
  const proto = {
    getPhotos: async function (page: number) {
      const photosRes = await fetchAPI<Photo>('/photos', {
        populate: '*',
        pagination: {
          page,
          pageSize: PAGE_SIZE,
        },
      })
      return {
        photos: photosRes.data,
        pagination: photosRes.meta.pagination,
      }
    },
  }
  return Object.freeze(Object.assign({}, proto))
}

export default multimediaService()
