import { CategoryModel } from '@/category/model/category.model'

export type RestaurantModel = {
  id: number
  title: string
  content: string | null
  createdAt: Date
  published: boolean | null
  categories?: CategoryModel[]
}
