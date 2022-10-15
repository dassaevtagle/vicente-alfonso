import { Review, StrapiRecord } from '../../interfaces/strapi'
import Carousel, { CarouselItem } from '../common/Carousel'
import htmlParse from 'html-react-parser'

type Props = {
  reviews: StrapiRecord<Review>[]
}

export const Reviews = ({ reviews }: Props) => (
  <div className="px-3 py-10 md:px-32 md:py-10 my-10 bg-primary-brown/30">
    <Carousel arrows={false} circles={false} intervalSeconds={14}>
      {reviews.map((review) => (
        <CarouselItem key={review.id} widthPercentage={100}>
          <div className="ml-auto italic text-center text-zinc-800 px-6 md:px-48 pb-4 source-sans-pro text-lg md:text-2xl pt-10">
            <div>{htmlParse(review.attributes.content)}</div>
            <span className="text-zinc-900 font-semibold">
              <div className="mt-10">{htmlParse(review.attributes.author)}</div>
            </span>
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  </div>
)

export default Reviews
