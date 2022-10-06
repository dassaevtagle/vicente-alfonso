import { ReactNode } from 'react'

export const DividingLine = () => (
  <div className="relative flex px-4 md:px-20 items-center">
    <div className="flex-grow border-t border-gray-400"></div>
  </div>
)

export const VerticalLines = ({ children }: { children: ReactNode }) => (
  <>
    <DividingLine />
    <div className="md:px-20 py-2">{children}</div>
    <DividingLine />
  </>
)

export default VerticalLines
