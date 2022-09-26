import Image from 'next/future/image'
import { StaticImageData } from 'next/image'
import { CSSProperties } from 'react'

type HeroProps = {
  MainImage: StaticImageData
}

const ImageStyles: CSSProperties = {
  height: '95vh',
}

const Hero = ({ MainImage }: HeroProps) => (
  <section className="grid h-auto grid-cols-2 w-full mx-auto">
    <div className="w-full flex items-center bg-black text-white text-9xl">
      <h1 className="times-new-roman italic">Vicente Alfonso</h1>
    </div>
    <Image
      src={MainImage}
      priority
      unoptimized
      className="object-top object-cover col-start-2 w-full grayscale -z-10"
      alt="Vicente Alfonso"
      style={ImageStyles}
    />
  </section>
)

export default Hero
