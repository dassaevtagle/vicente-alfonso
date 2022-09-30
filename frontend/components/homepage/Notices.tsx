import { Notice, StrapiRecord } from '../../interfaces/strapi'
import Image from '../common/Image'
import Carousel, { CarouselItem } from './Carousel'

const NoticeCard = ({ notice }: { notice: Notice }) => (
  <div className="grid auto-rows-auto max-w-xs text-center px-12">
    <Image image={notice.image} />
    <h2 className="font-bold">{notice.title}</h2>
  </div>
)

type NoticesProps = {
  notices: StrapiRecord<Notice>[]
}

const Notices = ({ notices }: NoticesProps) => {
  return (
    <div className="w-full pt-5 px-12 xl:px-64">
      <Carousel secondsOfInterval={4}>
        {notices.map((notice) => (
          <CarouselItem key={notice.id} widthPercentage={33.33}>
            <NoticeCard notice={notice.attributes} />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}

export default Notices
