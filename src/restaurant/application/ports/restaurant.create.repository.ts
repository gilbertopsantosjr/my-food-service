import {
  CreateRestaurantDto,
  ResponseRestaurantDto
} from '@/restaurant/model/restaurant.model'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class RestaurantCreateRepository {
  abstract execute(
    category: CreateRestaurantDto
  ): Promise<ResponseRestaurantDto | null>
}
