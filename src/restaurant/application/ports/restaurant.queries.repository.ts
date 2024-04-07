import { ResponseRestaurantDto } from '@/restaurant/model/restaurant.model'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class RestaurantQueriesRepository {
  abstract findById(categoryId: number): Promise<ResponseRestaurantDto | null>
  abstract findAll(): Promise<ResponseRestaurantDto[] | []>
  abstract findAllByUserId(
    userId: number
  ): Promise<ResponseRestaurantDto[] | []>
  abstract findByTitleAndUserId(
    title: string,
    userId: number
  ): Promise<ResponseRestaurantDto | null>
}
