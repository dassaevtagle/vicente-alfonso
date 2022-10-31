import { useEffect, useState } from 'react'
import useScreenHeight from '../../hooks/useScreenHeight'

const ScrollIndicator = () => {
  const [scrollIndicatorWidth, setScrollIndicatorWidth] = useState<number>(0)
  const screenHeight = useScreenHeight()
  const handleScroll = () => {
    const scrollableHeight = document.body.offsetHeight - screenHeight
    // Rule of three
    setScrollIndicatorWidth(
      Math.round((window.scrollY * 100) / scrollableHeight)
    )
  }
  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [screenHeight])
  return (
    <div
      className="bg-primary-yellow h-2 fixed"
      style={{ width: `${scrollIndicatorWidth}%` }}
    ></div>
  )
}

export default ScrollIndicator
