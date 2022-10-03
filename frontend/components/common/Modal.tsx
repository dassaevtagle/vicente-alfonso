import React, { ReactElement, useCallback, useState } from 'react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FiXCircle } from 'react-icons/fi'
import { useSwipeable } from 'react-swipeable'

type Props = {
  show: boolean
  onClose: () => void
  modalItem?: number
  children: ReactElement | ReactElement[]
}
const Modal = ({ children, show, onClose, modalItem }: Props) => {
  if (!show) return null
  const CHILDREN_COUNT = React.Children.count(children)
  const childrenIsArray = Array.isArray(children)
  const [currentChild, setCurrentChild] = useState<number>(modalItem | 0)

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowRight':
        if (childrenIsArray) {
          handleNext()
        }
        break
      case 'ArrowLeft':
        if (childrenIsArray) {
          handlePrevious()
        }
        break
      default:
        break
    }
  }

  const handleNext = () => {
    const nextChild = currentChild + 1 >= CHILDREN_COUNT ? 0 : currentChild + 1
    setCurrentChild(nextChild)
  }

  const handlePrevious = () => {
    const prevChild =
      currentChild - 1 < 0 ? CHILDREN_COUNT - 1 : currentChild - 1
    setCurrentChild(prevChild)
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentChild])

  const handleSwipe = useSwipeable({
    onSwipedLeft: () => childrenIsArray && handleNext(),
    onSwipedRight: () => childrenIsArray && handlePrevious(),
    preventScrollOnSwipe: true,
  })

  return ReactDOM.createPortal(
    <div
      {...handleSwipe}
      className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-95 z-20"
      onClick={onClose}
    >
      <div
        className="float-right absolute top-5 right-10 text-white hover:cursor-pointer"
        onClick={onClose}
      >
        <FiXCircle size={35} />
      </div>
      <div
        className="container overflow-hidden m-20"
        onClick={(e) => e.stopPropagation()}
      >
        {childrenIsArray && children[currentChild]}
        {!childrenIsArray && children}
      </div>
    </div>,
    document.getElementById('modals')
  )
}

export default Modal
