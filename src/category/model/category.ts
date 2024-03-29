export class Category {
  id: number
  name: string
  // category domain should not understand its relationship with another dto
  restaurant: Partial<{
    restaurantId: number
    name: string
  }>
}
