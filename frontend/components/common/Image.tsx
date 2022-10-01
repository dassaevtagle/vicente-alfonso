import { getStrapiMedia } from '../../lib/media'
import NextImage, { ImageProps } from 'next/future/image'
import { Media, SingleStrapiResponse } from '../../interfaces/strapi'
import { CSSProperties } from 'react'

type Props = {
  image: SingleStrapiResponse<Media>
  style?: CSSProperties
  nextImageProps?: Omit<ImageProps, 'src' | 'alt'>
}
/* Wrapper of NextImage
  src, alt are not passed.
*/
const Image = ({ image, style, nextImageProps }: Props) => {
  const { alternativeText, width, height } = image.data.attributes

  return (
    <NextImage
      width={width}
      height={height}
      src={getStrapiMedia(image)}
      alt={alternativeText || ''}
      {...nextImageProps}
      style={style}
    />
  )
}

export default Image
