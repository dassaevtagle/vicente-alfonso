import { RefObject, useEffect, useState } from 'react'

type useOnScreenProps = {
  ref: RefObject<HTMLElement>
  observerOptions?: IntersectionObserverInit
  triggerOnce?: boolean
}

function useOnScreen({
  ref,
  observerOptions,
  triggerOnce = false,
}: useOnScreenProps) {
  const [isOnScreen, setIsOnScreen] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[], observer) => {
        setIsOnScreen(entry.isIntersecting)
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(entry.target)
        }
      },
      observerOptions
    )
    ref.current && observer.observe(ref.current)
    return () => {
      observer && observer.disconnect()
    }
  }, [ref, observerOptions, triggerOnce])

  return isOnScreen
}

export default useOnScreen
