export type CategoryModel = {
  id: number
  title: string
  description: string
  // category domain should not understand its relationship with another dto
  restaurant?: Partial<{
    restaurantId: number
    name: string
  }>
  user?: Partial<{
    userId: number
    name: string
  }>
}
