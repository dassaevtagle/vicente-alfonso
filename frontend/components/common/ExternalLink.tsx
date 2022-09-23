import { ReactNode, MouseEvent } from 'react'

type ExternalLinkProps = {
  href: string
  classes?: string
  children: ReactNode
}

function ExternalLink({ href, classes, children }: ExternalLinkProps) {
  const stopPropagation = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
  }
  return (
    <a
      href={href}
      className={classes}
      onClick={stopPropagation}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export default ExternalLink
