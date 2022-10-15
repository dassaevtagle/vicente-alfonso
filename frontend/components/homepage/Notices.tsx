import { Notice, StrapiRecord } from '../../interfaces/strapi'
import Image from '../common/Image'
import Carousel, { CarouselItem } from '../common/Carousel'
import Modal from '../common/Modal'
import { useState } from 'react'
import * as moment from 'moment'
import htmlParse from 'html-react-parser'

const NoticeCard = ({ notice }: { notice: StrapiRecord<Notice> }) => (
  <div className="grid auto-rows-auto lg:max-h-[25rem] lg:max-w-[50rem] xl:px-12 justify-items-center">
    <Image
      image={notice.attributes.image}
      className="object-cover min-h-full min-w-full hover:brightness-110 hover:saturate-[1.1]"
    />
    <div className="absolute bottom-[0] w-full md:w-11/12 bg-white/70">
      <div className="bg-primary-yellow p-3">
        <span className="source-sans-pro text-gray-700 uppercase text-sm">
          {notice.attributes.historical
            ? 'Histórico'
            : moment.default(notice.attributes.publishedAt).fromNow()}
        </span>
        <h2 className="font-semibold text-[1.4rem] times-new-roman text-gray-900">
          {notice.attributes.title}
        </h2>
      </div>
    </div>
  </div>
)

const NoticeModal = ({ notice }: { notice: StrapiRecord<Notice> }) => {
  const publishedAt = moment.default(notice.attributes.publishedAt).fromNow()
  return (
    <div className="px-4">
      <div className="bg-white rounded-[2px] overflow-y-scroll p-4 md:p-7 w-full h-[28rem] md:h-[39rem]">
        <div className="flex items-center mb-2">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-black text-4xl times-new-roman uppercase tracking-[10px]">
            <h2>Avisos</h2>
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <h3 className="text-lg md:text-2xl times-new-roman font-medium">
          {notice.attributes.title}
        </h3>
        <p className="text-sm italic text-zinc-600">
          {!notice.attributes.historical && publishedAt}
        </p>
        <Image
          image={notice.attributes.image}
          className="mx-auto md:h-96 w-auto"
        />
        <div className="break-words text-sm md:text-base pt-4">
          {htmlParse(notice.attributes.description)}
        </div>
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
    <div className="w-full pt-5 md:px-52 bg-gradient-to-b from-primary-gray/30 to-white">
      <Carousel intervalSeconds={4} arrows={false}>
        {notices.map((notice, idx) => (
          <CarouselItem
            key={notice.id}
            mobilePercentage={100}
            widthPercentage={100}
          >
            <div onClick={() => handleNoticeClick(idx)}>
              <NoticeCard notice={notice} />
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
