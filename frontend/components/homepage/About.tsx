import { CSSProperties, useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Media, SingleStrapiResponse } from '../../interfaces/strapi'
import Image from '../common/Image'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import useWidth from '../../hooks/useWidth'
type AboutProps = {
  bio_photo: SingleStrapiResponse<Media>
  biography: string
}

const About = ({ bio_photo, biography }: AboutProps) => {
  const { isMobile } = useWidth()
  const [showFullBio, setShowFullBio] = useState<boolean>(false)
  const [bioDisplay, setBioDisplay] = useState<string>('')
  const SHORT_BIO_LENGTH = 1000

  useEffect(() => {
    if(!isMobile) {
      setShowFullBio(true)
      return 
    }
    handleToggleBio()
  }, [showFullBio, isMobile])

  const trimmedBio = useMemo(() => {
    let arr = biography.split('')
    return arr.slice(0, SHORT_BIO_LENGTH).join('') + '...'
  }, [biography])

  const handleToggleBio = () => {
    if (showFullBio) {
      setBioDisplay(biography)
    } else {
      setBioDisplay(trimmedBio)
    }
  }

  const toggleBioDisplay = () => setShowFullBio(!showFullBio)

  return (
    <div className="px-4 md:pr-4 md:pl-0 mt-12 md:m-0">
      <Image
        image={bio_photo}
        className="rounded-[50%] w-[180px] h-[180px] object-cover float-left mr-[25px]"
        style={{ shapeOutside: 'circle()' }}
      />
      <div className="pt-2 text-justify text-sm md:text-base">
        <ReactMarkdown>{bioDisplay}</ReactMarkdown>
      </div>
      { isMobile && 
        <span className="flex justify-center" onClick={toggleBioDisplay}>
          {showFullBio ? <FiChevronUp size={40} /> : <FiChevronDown size={40} />}
        </span>
      }
    </div>
  )
}

export default About
