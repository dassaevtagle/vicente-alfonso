import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'
import { Photo, StrapiRecord } from '../../interfaces/strapi'
import { fetchAPI } from '../../lib/api'
import { useState } from 'react'
import Modal from '../../components/common/Modal'

const PhotoModal = ({ photo }: { photo: Photo }) => (
  <div className="grid justify-items-center ">
    <Image image={photo.file} style={{ width: 'auto', maxHeight: '90vh' }} />
    <span className="text-white mt-2 text-xl">{`${photo.description}, ${photo.year}`}</span>
  </div>
)

type MultimediaProps = {
  photos: StrapiRecord<Photo>[]
}

const Multimedia = ({ photos }: MultimediaProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>(0)
  //Opens modal
  const handlePhotoClick = (modalItemIndex: number) => {
    setModalItem(modalItemIndex)
    setShowModal(true)
  }

  return (
    <Layout title={'Multimedia'}>
      <div className="container mx-auto mt-3 columns-3 gap-2 break-inside-avoid">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="mb-2"
            onClick={() => handlePhotoClick(idx)}
          >
            <Image
              image={photo.attributes.file}
              className="border-solid border-2"
            />
          </div>
        ))}
      </div>
      <Modal
        show={showModal}
        modalItem={modalItem}
        onClose={() => setShowModal(false)}
      >
        {photos.map((photo) => (
          <PhotoModal key={photo.id} photo={photo.attributes} />
        ))}
      </Modal>
    </Layout>
  )
}

export async function getStaticProps() {
  const photosRes = await fetchAPI<Photo>('/photos', {
    populate: '*',
    pagination: {
      page: 1,
      pageSize: 9,
    },
  })
  return {
    props: {
      photos: photosRes.data,
    },
  }
}

export default Multimedia
