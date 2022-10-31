import { useEffect, useRef, useState } from 'react'
import useScreenHeight from '../../hooks/useScreenHeight'

const ScrollIndicator = ({ showNavbar }: { showNavbar: boolean }) => {
  const [scrollIndicatorWidth, setScrollIndicatorWidth] = useState<number>(0)
  const screenHeight = useScreenHeight()
  const indicatorRef = useRef<HTMLDivElement | null>(null)
  const [yPosition, setYPosition] = useState(0)
  const handleScroll = () => {
    const scrollableHeight = document.body.offsetHeight - screenHeight
    // Rule of three
    setScrollIndicatorWidth(
      Math.round((window.scrollY * 100) / scrollableHeight)
    )
  }
  useEffect(() => {
    //Get current y position of scroll indicator, so we can translate it to top of screen (translateY(-${yPosition}))
    if (indicatorRef.current) {
      setYPosition(indicatorRef.current.getBoundingClientRect().y)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [screenHeight])
  return (
    <div
      ref={indicatorRef}
      className={`bg-primary-yellow h-2 fixed transition-transform`}
      style={{ width: `${scrollIndicatorWidth}%`, transform: `${showNavbar ? '' : `translateY(-${yPosition}px)`}` }}
    ></div>
  )
}

export default ScrollIndicator
