import ReactMarkdown from 'react-markdown'
import { Review, StrapiRecord } from '../../interfaces/strapi'
import Carousel, { CarouselItem } from '../common/Carousel'

type Props = {
  reviews: StrapiRecord<Review>[]
}

export const Reviews = ({ reviews }: Props) => (
  <div className="px-3 pt-20 md:px-32 md:py-20">
    <Carousel arrows={false}>
      {reviews.map((review) => (
        <CarouselItem key={review.id} widthPercentage={100}>
          <div className="ml-auto italic text-right text-zinc-500 px-1 pb-4">
            <ReactMarkdown>{review.attributes.content}</ReactMarkdown>
            <span className="text-zinc-700">
              <ReactMarkdown>{review.attributes.author}</ReactMarkdown>
            </span>
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  </div>
)

export default Reviews
