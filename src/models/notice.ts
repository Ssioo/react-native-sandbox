export interface Notice {
  id: number
  title: string
  content: string | null
  createdAt: string | null
}

export interface VersionNotice extends Notice {
  version: string
}
