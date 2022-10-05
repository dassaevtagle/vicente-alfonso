import { useEffect, useState } from 'react'

function useWidth() {
  const [width, setWidth] = useState<number>(0)

  const handleWindowResize = () => setWidth(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const isMobile = width <= 768
  const isDesktop = width > 1200

  return {
    width,
    isMobile,
    isDesktop,
  }
}

export default useWidth
