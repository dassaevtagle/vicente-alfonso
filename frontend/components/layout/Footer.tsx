import { CSSProperties, useEffect, useRef } from 'react'
import useOnScreen from '../../hooks/useOnScreen'
import { Media, SingleStrapiResponse } from '../../interfaces/strapi'
import Image from '../common/Image'

const caretAnimationCss = `
  @keyframes caret {
    50% {
      border-color: transparent;
    }
  }
`

const Footer = ({
  footer_image,
}: {
  footer_image: SingleStrapiResponse<Media>
}) => {
  const footerTextRef = useRef<HTMLHeadingElement>(null)
  const isOnScreen = useOnScreen({
    ref: footerTextRef,
    observerOptions: {
      rootMargin: '-85px',
    },
    triggerOnce: true,
  })
  const typingLine = (
    <span
      aria-hidden="true"
      style={{
        animation: 'caret 1s steps(1) infinite',
        borderRight: 'black .05em solid',
      }}
    ></span>
  )

  // keeps calling itself until the text is finished
  const typeWriter = (text: string, index?: number) => {
    //first call index is undefined
    index = index ?? 0
    //calls recursively until last index
    if (index < text.length) {
      if (footerTextRef.current) {
        footerTextRef.current.classList.remove('text-transparent')
        footerTextRef.current.classList.add('text-zinc-900')
      }
      footerTextRef.current.innerHTML =
        text.substring(0, index + 1) +
        `<span aria-hidden="true" style="animation: caret 1s steps(1) infinite; border-right: .07em solid;"></span>`
      // wait for a while and call this function again for next character
      setTimeout(function () {
        typeWriter(text, index + 1)
      }, 150)
    }
  }

  useEffect(() => {
    if (footerTextRef.current && isOnScreen) {
      typeWriter(footerTextRef.current.textContent)
    }
  }, [footerTextRef, isOnScreen])

  return (
    <footer className="w-full bg-white text-center">
      <style>{caretAnimationCss}</style>
      <h3
        ref={footerTextRef}
        className="relative text-transparent typewriter font-semibold top-[16vw] sm:top-[14vw] text-[1.3rem] sm:text-[1.7rem]"
      >
        Vicente Alfonso, {new Date().getFullYear()}
      </h3>
      <Image image={footer_image} style={{ width: '100%' }} />
    </footer>
  )
}

export default Footer
