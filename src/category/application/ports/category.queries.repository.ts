import { Category } from '@/category/model/category'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class CategoryQueriesRepository {
  abstract findById(categoryId: number): Promise<Category>
  abstract findAll(categoryId: number): Promise<Category[]>
  abstract findByRestaurantId(restaurantId: number): Promise<Category[]>
}
