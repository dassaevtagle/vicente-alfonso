import ReactMarkdown from "react-markdown"
import { Media, SingleStrapiResponse } from "../../interfaces/strapi"
import Image from "../common/Image"

type AboutProps = {
  bio_photo: SingleStrapiResponse<Media>
  biography: string
}

const About = ({bio_photo, biography}:AboutProps) => (
  <div className="inline-flex">
    <div className="w-60 h-60">
      <Image responsive image={bio_photo} />
    </div>
    <div className="max-w-8/12">
      <ReactMarkdown children={biography} />
    </div>
  </div>
)

export default About