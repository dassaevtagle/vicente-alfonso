interface MediaFormats {
  thumbnail?: BaseMedia & { path: unknown | null }
  small?: BaseMedia & { path: unknown | null }
}
interface BaseMedia {
  name: string
  hash: string
  ext: string
  mime: string
  width: number | null
  height: number | null
  size: number
  url: string
}

export type Media = BaseMedia & {
  alternativeText: string
  caption: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
  formats: null | MediaFormats
}
