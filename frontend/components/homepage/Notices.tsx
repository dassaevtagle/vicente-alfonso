import ReactMarkdown from "react-markdown"
import { Notice, StrapiRecord } from "../../interfaces/strapi"
import Image from "../common/Image"

type NoticesProps = {
  notices: StrapiRecord<Notice>[]
}

const Notices = ({notices}: NoticesProps) => {
  return (
  <div className="container p-4">
  {notices.map(notice => (
    <div key={notice.id}>
      <h2 className="text-xl">{notice.attributes.title}</h2>
      <ReactMarkdown children={notice.attributes.description} />
      <div className="w-96">
        <Image image={notice.attributes.image} />
      </div>
    </div>
  ))}
  </div>)
}

export default Notices