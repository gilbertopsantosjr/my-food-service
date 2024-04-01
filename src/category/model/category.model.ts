export type CategoryModel = {
  id: number
  title: string
  description: string
  createdAt: Date
  // category domain should not understand its relationship with another dto
  restaurant?: Partial<{
    id: number
    title: string
  }>
}
