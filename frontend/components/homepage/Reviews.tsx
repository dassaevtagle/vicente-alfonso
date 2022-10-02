import ReactMarkdown from 'react-markdown'
import { Review, StrapiRecord } from '../../interfaces/strapi'
import Carousel, { CarouselItem } from './Carousel'

type Props = {
  reviews: StrapiRecord<Review>[]
}

export const Reviews = ({ reviews }: Props) => (
  <div className="px-32 py-20">
    <Carousel arrows={false}>
      {reviews.map((review) => (
        <CarouselItem key={review.id} widthPercentage={100}>
          <div className="ml-auto text-right">
            <ReactMarkdown>{review.attributes.content}</ReactMarkdown>
            <ReactMarkdown>{review.attributes.author}</ReactMarkdown>
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  </div>
)

export default Reviews
