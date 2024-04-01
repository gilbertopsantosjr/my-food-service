import { RestaurantModel } from '@/restaurant/model/restaurant.model'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class RestaurantQueriesRepository {
  abstract findById(categoryId: number): Promise<RestaurantModel>
  abstract findAll(): Promise<RestaurantModel[]>
  abstract findAllByUserId(userId: number): Promise<RestaurantModel[]>
}
