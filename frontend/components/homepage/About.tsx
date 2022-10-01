import { CSSProperties } from 'react'
import ReactMarkdown from 'react-markdown'
import { Media, SingleStrapiResponse } from '../../interfaces/strapi'
import Image from '../common/Image'

type AboutProps = {
  bio_photo: SingleStrapiResponse<Media>
  biography: string
}

const imageCss: CSSProperties = {
  borderRadius: '50%',
  width: '200px',
  height: '200px',
  objectFit: 'cover',
  shapeOutside: 'circle()',
  float: 'left',
  margin: '15px',
}

const About = ({ bio_photo, biography }: AboutProps) => (
  <div className="mt-4">
    <Image image={bio_photo} style={imageCss} />
    <div className="pt-4">
      <ReactMarkdown>{biography}</ReactMarkdown>
    </div>
  </div>
)

export default About
