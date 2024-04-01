import { CategoryModel } from '@/category/model/category.model'

export type RestaurantModel = {
  id: number
  title: string
  content: string
  createdAt: Date
  published: boolean
  categories?: CategoryModel[]
}
