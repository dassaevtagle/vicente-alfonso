import { getStrapiMedia } from '../../lib/media'
import NextImage from 'next/image'
import { Media, SingleStrapiResponse } from '../../interfaces/strapi'

type ImageProps = {
  image: SingleStrapiResponse<Media>
  responsive?: boolean
}

const Image = ({ image, responsive = false }: ImageProps) => {
  const { alternativeText, width, height } = image.data.attributes

  if (responsive) {
    return (
      <div className="w-full h-full relative">
        <NextImage
          layout="fill"
          objectFit="contain"
          src={getStrapiMedia(image)}
          alt={alternativeText || ''}
        />
      </div>
    )
  }
  return (
    <NextImage
      width={width}
      height={height}
      src={getStrapiMedia(image)}
      alt={alternativeText || ''}
    />
  )
}

export default Image
