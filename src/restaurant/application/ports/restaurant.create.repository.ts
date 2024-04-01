import { RestaurantModel } from '@/restaurant/model/restaurant.model'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class RestaurantCreateRepository {
  abstract execute(category: Partial<RestaurantModel>): Promise<RestaurantModel>
}
