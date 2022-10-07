import React, { ReactElement, ReactNode, useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useSwipeable } from 'react-swipeable'
import useWidth from '../../hooks/useWidth'

const DEFAULT_WIDTH_CAROUSEL_ITEM = 33.33
const MOBILE_DEFAULT_WIDTH_CAROUSEL_ITEM = 100

type CarouselItemProps = {
  children: ReactNode
  widthPercentage?: 100 | 50 | 33.33 | 25
  mobilePercentage?: 100 | 50 | 33.33 | 25
}

//If you add a prop to CarouselItem make sure to pass it in Carousel component when it calls React.cloneElement()
export const CarouselItem = ({
  children,
  widthPercentage = DEFAULT_WIDTH_CAROUSEL_ITEM,
  mobilePercentage = MOBILE_DEFAULT_WIDTH_CAROUSEL_ITEM,
}: CarouselItemProps) => {
  const { isMobile } = useWidth()
  return (
    <div
      className="inline-flex whitespace-normal align-top"
      style={{
        width: isMobile ? `${mobilePercentage}%` : `${widthPercentage}%`,
      }}
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
  const [moreThanOneCircle, setMoreThanOneCircle] = useState<boolean>(true)
  const { isMobile } = useWidth()
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrevious(),
    preventScrollOnSwipe: true,
  })

  function calculateTotalIndexes() {
    let count = 0
    //When accumulator reaches 100 we set a new index.
    //100% means current item is full width already
    let accumulator = 0
    React.Children.forEach(children, (child) => {
      //Default widthPercentage if prop is not specified
      let widthPercentage = getChildWidthPercentage(child)
      if (Math.round(accumulator) === 100) {
        ++count
        accumulator = widthPercentage
      } else {
        accumulator += widthPercentage
      }
    })
    //display bottom dots if there is more than one index
    setMoreThanOneCircle(count !== 0)
    setTotalIndexes(count)
  }

  function getChildWidthPercentage(
    child: ReactElement<CarouselItemProps>
  ): number {
    let widthPercentage
    if (isMobile) {
      widthPercentage =
        child.props.mobilePercentage ?? MOBILE_DEFAULT_WIDTH_CAROUSEL_ITEM
    } else {
      widthPercentage =
        child.props.widthPercentage ?? DEFAULT_WIDTH_CAROUSEL_ITEM
    }
    return widthPercentage
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
      {...swipeHandlers}
      className="grid"
      style={{
        gridTemplateColumns: '30px auto 30px',
      }}
    >
      {arrows && (
        <button
          className="place-self-center h-full text-gray-400 hover:text-gray-500"
          onClick={goPrevious}
        >
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
                mobilePercentage: child.props.mobilePercentage,
              })
            })}
        </div>
      </div>
      {arrows && (
        <button
          className="place-self-center h-full text-gray-400 hover:text-gray-500"
          onClick={goNext}
        >
          <FiChevronRight size={30} />
        </button>
      )}
      {circles && moreThanOneCircle && (
        <div
          className="flex justify-center gap-x-2 py-4"
          style={{ gridColumn: '1/-1' }} //span all the columns
        >
          {Array.from(Array(totalIndexes + 1)).map((_, index) => {
            return (
              <div
                key={index}
                className={`${
                  activeIndex === index ? 'bg-gray-500' : 'bg-gray-300'
                } rounded-full w-3 h-3 inline-block hover:cursor-pointer hover:bg-gray-500`}
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
