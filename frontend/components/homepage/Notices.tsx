import { Notice, StrapiRecord } from '../../interfaces/strapi'
import Image from '../common/Image'
import Carousel, { CarouselItem } from '../common/Carousel'
import Modal from '../common/Modal'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const NoticeCard = ({ notice }: { notice: Notice }) => (
  <div className="grid auto-rows-auto max-w-xs text-center px-1 xl:px-12">
    <Image image={notice.image} />
    <h2 className="font-semibold md:font-bold text-sm md:text-base">
      {notice.title}
    </h2>
  </div>
)

const NoticeModal = ({ notice }: { notice: StrapiRecord<Notice> }) => (
  <div
    className="bg-white rounded overflow-y-scroll p-7 w-full"
    style={{ height: '36rem' }}
  >
    <div className="relative flex items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span
        className="flex-shrink mx-4 text-gray-800 text-4xl times-new-roman uppercase"
        style={{ letterSpacing: '10px' }}
      >
        <h2>Avisos</h2>
      </span>
    </div>
    <h3 className="text-3xl">{notice.attributes.title}</h3>
    <p>{notice.attributes.publishedAt}</p>
    <div className="mx-auto">
      <Image image={notice.attributes.image} />
    </div>
    <div className="break-words">
      <ReactMarkdown>{notice.attributes.description}</ReactMarkdown>
    </div>
  </div>
)

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
