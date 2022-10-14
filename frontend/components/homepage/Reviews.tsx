import ReactMarkdown from 'react-markdown'
import { Review, StrapiRecord } from '../../interfaces/strapi'
import Carousel, { CarouselItem } from '../common/Carousel'

type Props = {
  reviews: StrapiRecord<Review>[]
}

export const Reviews = ({ reviews }: Props) => (
  <div className="px-3 py-10 md:px-32 md:py-10 my-10 bg-primary-yellow/40">
    <Carousel arrows={false} circles={false}>
      {reviews.map((review) => (
        <CarouselItem key={review.id} widthPercentage={100}>
          <div className="ml-auto italic text-right text-zinc-800 px-1 pb-4">
            <ReactMarkdown>{review.attributes.content}</ReactMarkdown>
            <span className="text-zinc-900 font-semibold">
              <ReactMarkdown>{review.attributes.author}</ReactMarkdown>
            </span>
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  </div>
)

export default Reviews
