import { Media, SingleStrapiResponse } from '../../interfaces/strapi'
import Image from '../common/Image'

const Footer = ({
  footer_image,
}: {
  footer_image: SingleStrapiResponse<Media>
}) => (
  <footer className="w-full bg-white text-center">
    <h3 className="font-semibold relative" style={{top: '18vw', fontSize: '3vmax'}}>
      Vicente Alfonso, {new Date().getFullYear()}
    </h3>
    <Image image={footer_image} style={{ width: '100%', height: '60vw', objectFit: 'cover' }} />
  </footer>
)

export default Footer
