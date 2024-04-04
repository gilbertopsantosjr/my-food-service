import { CategoryModel } from '@/category/model/category.model'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class CategoryQueriesRepository {
  abstract findByTitleAndResturantId(
    title: string,
    restaurantId: number
  ): Promise<CategoryModel | null>
  abstract findById(categoryId: number): Promise<CategoryModel | null>
  abstract findAll(): Promise<CategoryModel[] | []>
  abstract findAllByIds(categoryIds: number[]): Promise<CategoryModel[] | []>
  abstract findAllByRestaurantId(
    restaurantId: number
  ): Promise<CategoryModel[] | []>
}
