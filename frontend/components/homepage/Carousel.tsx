import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const DEFAULT_WIDTH_CAROUSEL_ITEM = 33.33

type CarouselItemProps = {
  children: ReactNode
  widthPercentage?: 100 | 50 | 33.33 | 25
}

export const CarouselItem = ({
  children,
  widthPercentage = DEFAULT_WIDTH_CAROUSEL_ITEM,
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
  intervalSeconds?: number
  paused?: boolean
  arrows?: boolean
  circles?: boolean
  children: ReactElement<CarouselItemProps> | ReactElement<CarouselItemProps>[]
}

const Carousel = ({
  intervalSeconds = 3,
  paused = false,
  arrows = true,
  circles = true,
  children,
}: CarouselProps) => {
  let MILISECONDS = intervalSeconds * 1000
  const [totalIndexes, setTotalIndexes] = useState<number>(0)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [innerPause, setInnerPause] = useState<boolean>(false)
  useEffect(() => {
    calculateTotalIndexes()
    let interval
    if (!paused) {
      interval = setInterval(() => {
        !innerPause && goNext()
      }, MILISECONDS)
    }
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
      //Default widthPercentage if prop is not specified
      let widthPercentage =
        child.props.widthPercentage ?? DEFAULT_WIDTH_CAROUSEL_ITEM
      if (Math.round(accumulator) === 100) {
        ++count
        accumulator = widthPercentage
      } else {
        accumulator += widthPercentage
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
      className="grid"
      style={{
        gridTemplateColumns: '30px auto 30px',
      }}
    >
      {arrows && (
        <button className="place-self-center text-gray-400">
          <FiChevronLeft size={30} />
        </button>
      )}
      <div
        className="overflow-hidden"
        style={arrows ? {} : { gridColumn: '1/-1' }}
        onMouseEnter={() => setInnerPause(true)}
        onMouseLeave={() => setInnerPause(false)}
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
      {arrows && (
        <button className="place-self-center text-gray-400">
          <FiChevronRight size={30} />
        </button>
      )}
      {circles && (
        <div
          className="flex justify-center gap-x-2 py-4"
          style={{ gridColumn: '1/-1' }} //span all the columns
        >
          {Array.from(Array(totalIndexes + 1)).map((_, index) => {
            return (
              <div
                className={`${
                  activeIndex === index ? 'bg-gray-500' : 'bg-gray-300'
                } rounded-full w-3 h-3 inline-block hover:cursor-pointer`}
                onClick={() => setActiveIndex(index)}
              ></div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Carousel
