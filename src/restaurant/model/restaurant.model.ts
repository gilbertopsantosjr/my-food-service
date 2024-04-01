export type RestaurantModel = {
  id: number
  title: string
  content: string
  createAt: Date
  published: boolean
  categories?: [
    Partial<{
      id: number
      name: string
    }>
  ]
}
