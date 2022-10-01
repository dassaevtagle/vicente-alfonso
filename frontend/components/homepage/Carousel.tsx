import React, { ReactElement, ReactNode, useEffect, useState } from 'react'

type CarouselItemProps = {
  children: ReactNode
  widthPercentage?: 100 | 50 | 33.33 | 25
}

export const CarouselItem = ({
  children,
  widthPercentage = 33.33,
}: CarouselItemProps) => {
  return (
    <div
      className="inline-flex whitespace-normal align-top"
      style={{ width: `${widthPercentage}%` }}
    >
      {children}
    </div>
  )
}

type CarouselProps = {
  secondsOfInterval?: number
  children: ReactElement<CarouselItemProps> | ReactElement<CarouselItemProps>[]
}

const Carousel = ({ secondsOfInterval = 3, children }: CarouselProps) => {
  let MILISECONDS = secondsOfInterval * 1000
  const [totalIndexes, setTotalIndexes] = useState<number>(0)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [paused, setPaused] = useState<boolean>(false)
  useEffect(() => {
    calculateTotalIndexes()
    let interval = setInterval(() => {
      !paused && goNext()
    }, MILISECONDS)
    return () => {
      interval && clearInterval(interval)
    }
  })

  function calculateTotalIndexes() {
    let count = 0
    //When accumulator reaches 100 we set a new index.
    //100% means current item is full width already
    let accumulator = 0
    React.Children.forEach(children, (child) => {
      if (Math.round(accumulator) === 100) {
        ++count
        accumulator = child.props.widthPercentage
      } else {
        accumulator += child.props.widthPercentage
      }
    })
    setTotalIndexes(count)
  }

  function goToIndex(newIndex: number) {
    if (newIndex < 0) {
      newIndex = totalIndexes
    }
    if (newIndex >= totalIndexes + 1) {
      newIndex = 0
    }
    setActiveIndex(newIndex)
  }

  function goNext() {
    goToIndex(activeIndex + 1)
  }

  function goPrevious() {
    goToIndex(activeIndex - 1)
  }

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="whitespace-nowrap transition-transform"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {children &&
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              widthPercentage: child.props.widthPercentage,
            })
          })}
      </div>
    </div>
  )
}

export default Carousel
