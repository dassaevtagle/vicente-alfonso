type BaseStrapiResponse = {
  readonly meta?: {
    pagination: Pagination
  }
  readonly error?: StrapiError
}

export type SingleStrapiResponse<T> = BaseStrapiResponse & {
  readonly data: StrapiRecord<T> | null
}

export type CollectionStrapiResponse<T> = BaseStrapiResponse & {
  readonly data: StrapiRecord<T>[] | null
}

export type StrapiError = {
  readonly status: number
  readonly name: string
  readonly message: string
  readonly details: any
}

export type StrapiRecord<T> = {
  readonly id: number
  readonly attributes: T & {
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
  }
}

export type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
