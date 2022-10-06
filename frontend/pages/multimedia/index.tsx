import Layout from '../../components/layout/Layout'
import Image from '../../components/common/Image'
import { Photo, StrapiRecord } from '../../interfaces/strapi'
import { fetchAPI } from '../../lib/api'

type MultimediaProps = {
  photos: StrapiRecord<Photo>[]
}

const Multimedia = ({ photos }: MultimediaProps) => {
  return (
    <Layout title={'Multimedia'}>
      Multimedia
      <div className="inline-flex flex-wrap">
        {photos.map((photo) => (
          <div key={photo.id} className="w-96">
            <Image image={photo.attributes.file} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const photosRes = await fetchAPI<Photo>('/photos', { populate: '*' })
  return {
    props: {
      photos: photosRes.data,
    },
  }
}

export default Multimedia
