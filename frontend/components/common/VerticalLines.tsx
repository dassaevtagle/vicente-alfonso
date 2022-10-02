import { ReactNode } from 'react'

export const DividingLine = () => (
  <div className="relative flex py-2 px-20 items-center">
    <div className="flex-grow border-t border-gray-400"></div>
  </div>
)

export const VerticalLines = ({ children }: { children: ReactNode }) => (
  <>
    <DividingLine />
    <div className="px-20">{children}</div>
    <DividingLine />
  </>
)

export default VerticalLines
