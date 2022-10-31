import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'
import { Pagination, Photo, StrapiRecord } from '../../interfaces/strapi'
import { useEffect, useRef, useState } from 'react'
import Modal from '../../components/common/Modal'
import Spinner from '../../components/common/Spinner'
import Masonry from 'react-masonry-css'
import multimediaService from '../../services/multimedia'
import useOnScreen from '../../hooks/useOnScreen'

const PhotoModal = ({ photo }: { photo: Photo }) => (
  <div className="grid justify-items-center ">
    <Image image={photo.file} className="w-auto max-h-[90vh]" />
    <span className="text-white mt-2 text-xl">{`${photo.description}, ${photo.year}`}</span>
  </div>
)

const PhotoContainer = ({
  handlePhotoClick,
  photo,
  id,
}: {
  handlePhotoClick: (modalItemIndex: number) => void
  photo: StrapiRecord<Photo>
  id: number
}) => (
  <div className="mb-2" onClick={() => handlePhotoClick(id)}>
    <Image
      image={photo.attributes.file}
      className="border-solid border-4 hover:border-primary-yellow hover:border-4"
    />
  </div>
)

type MultimediaProps = {
  photos: StrapiRecord<Photo>[]
  pagination: Pagination
}

const Multimedia = ({ photos, pagination }: MultimediaProps) => {
  const [displayedPhotos, setDisplayedPhotos] =
    useState<StrapiRecord<Photo>[]>(photos)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalItem, setModalItem] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const loadingRef = useRef<HTMLDivElement | null>(null)
  const loadingOnScreen = useOnScreen({ ref: loadingRef })
  const masonryBreakpoints = {
    default: 3,
    700: 2,
    500: 1,
  }
  //Opens modal
  const handlePhotoClick = (modalItemIndex: number) => {
    setModalItem(modalItemIndex)
    setShowModal(true)
  }

  const loadNextPhotos = async () => {
    if (!loadingMore) {
      try {
        setLoadingMore(true)
        const nextPage = page + 1
        const photosRes = await multimediaService.getPhotos(nextPage)
        if (Array.isArray(photosRes.photos)) {
          setDisplayedPhotos([...photos, ...photosRes.photos])
          setPage[nextPage]
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoadingMore(false)
      }
    }
  }

  useEffect(() => {
    if (
      loadingRef.current &&
      loadingOnScreen &&
      displayedPhotos.length < pagination.total
    ) {
      loadNextPhotos()
    }
  }, [loadingRef, loadingOnScreen])

  return (
    <Layout title={'Multimedia'}>
      {/* Photos container */}
      <Masonry
        breakpointCols={masonryBreakpoints}
        className="flex pt-4 px-2 gap-3"
      >
        {displayedPhotos.map((photo, idx) => (
          <PhotoContainer
            key={idx}
            photo={photo}
            handlePhotoClick={handlePhotoClick}
            id={idx}
          />
        ))}
      </Masonry>
      {/* End of photos container */}
      {/* Spinner */}
      <div ref={loadingRef} className="justify-center grid mt-3">
        <span className={`${loadingMore ? 'block' : 'hidden'}`}>
          <Spinner />
        </span>
      </div>
      {/* End of spinner */}
      <Modal
        show={showModal}
        modalItem={modalItem}
        onClose={() => setShowModal(false)}
      >
        {displayedPhotos.map((photo) => (
          <PhotoModal key={photo.id} photo={photo.attributes} />
        ))}
      </Modal>
    </Layout>
  )
}

export async function getStaticProps() {
  const photosRes = await multimediaService.getPhotos(1)
  return {
    props: {
      photos: photosRes.photos,
      pagination: photosRes.pagination,
    },
  }
}

export default Multimedia
