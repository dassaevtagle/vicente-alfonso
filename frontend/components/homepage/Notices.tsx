import { Notice, StrapiRecord } from '../../interfaces/strapi'
import Image from '../common/Image'
import Carousel, { CarouselItem } from '../common/Carousel'
import Modal from '../common/Modal'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import * as moment from 'moment'

const NoticeCard = ({ notice }: { notice: Notice }) => (
  <div className="grid auto-rows-auto max-w-xs text-center px-1 xl:px-12">
    <Image image={notice.image} />
    <h2 className="font-medium text-sm md:text-[1rem]">
      {notice.title}
    </h2>
  </div>
)

const NoticeModal = ({ notice }: { notice: StrapiRecord<Notice> }) => {
  const publishedAt = moment.default(notice.attributes.publishedAt).fromNow()
  return (
    <div className='px-4'>
      <div
        className="bg-white rounded-[2px] overflow-y-scroll p-4 md:p-7 w-full h-[28rem] md:h-[39rem]"
      >
      <div className="flex items-center mb-2">
        <div className="flex-grow border-t border-gray-400"></div>
        <span
          className="flex-shrink mx-4 text-black text-4xl times-new-roman uppercase tracking-[10px]"
        >
          <h2>Avisos</h2>
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
        <h3 className="text-lg md:text-2xl times-new-roman font-medium">
          {notice.attributes.title}
        </h3>
        <p className='text-sm italic text-zinc-600'>{!notice.attributes.historical && publishedAt}</p>
        <Image
          image={notice.attributes.image}
          className="mx-auto md:h-96 w-auto"
        />
        <ReactMarkdown className='break-words text-sm md:text-base pt-4'>{notice.attributes.description}</ReactMarkdown>
      </div>
    </div>
  )
}

type NoticesProps = {
  notices: StrapiRecord<Notice>[]
}

const Notices = ({ notices }: NoticesProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>(0)

  const handleNoticeClick = (modalItemIndex: number) => {
    setModalItem(modalItemIndex)
    setShowModal(true)
  }

  return (
    <div className="w-full pt-5 md:px-36">
      <Carousel intervalSeconds={4} arrows={false}>
        {notices.map((notice, idx) => (
          <CarouselItem key={notice.id} mobilePercentage={50}>
            <div onClick={() => handleNoticeClick(idx)}>
              <NoticeCard notice={notice.attributes} />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
      <Modal
        show={showModal}
        modalItem={modalItem}
        onClose={() => setShowModal(false)}
      >
        {notices.map((notice) => (
          <NoticeModal key={notice.id} notice={notice} />
        ))}
      </Modal>
    </div>
  )
}

export default Notices
