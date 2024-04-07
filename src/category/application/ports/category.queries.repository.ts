import { ResponseCategoryDto } from '@/category/model/category.model'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class CategoryQueriesRepository {
  abstract findByTitleAndResturantId(
    title: string,
    restaurantId: number
  ): Promise<ResponseCategoryDto | null>
  abstract findById(categoryId: number): Promise<ResponseCategoryDto | null>
  abstract findAll(): Promise<ResponseCategoryDto[] | []>
  abstract findAllByIds(
    categoryIds: number[]
  ): Promise<ResponseCategoryDto[] | []>
  abstract findAllByRestaurantId(
    restaurantId: number
  ): Promise<ResponseCategoryDto[] | []>
}
