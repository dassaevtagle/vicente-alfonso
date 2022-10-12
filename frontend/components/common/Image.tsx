import { getStrapiMedia } from '../../lib/media'
import NextImage, { ImageProps } from 'next/future/image'
import { Media, SingleStrapiResponse } from '../../interfaces/strapi'
import { CSSProperties } from 'react'

type Props = {
  image: SingleStrapiResponse<Media>
  style?: CSSProperties
  className?: string
  nextImageProps?: Omit<ImageProps, 'src' | 'alt'>
}
/* Wrapper of NextImage
  src, alt are not passed.
*/
const Image = ({ image, style, className, nextImageProps }: Props) => {
  if (!image.data) return <></>
  const { alternativeText, width, height } = image.data.attributes

  return (
    <NextImage
      className={className}
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
