import ReactMarkdown from 'react-markdown'
import { Media, SingleStrapiResponse } from '../../interfaces/strapi'
import Image from '../common/Image'

type AboutProps = {
  bio_photo: SingleStrapiResponse<Media>
  biography: string
}

const About = ({ bio_photo, biography }: AboutProps) => (
  <div className="inline-flex pb-10">
    <div className="w-60 mx-auto">
      <Image image={bio_photo} />
    </div>
    <div className="w-8/12 ml-auto pr-10">
      <ReactMarkdown children={biography} />
    </div>
  </div>
)

export default About
