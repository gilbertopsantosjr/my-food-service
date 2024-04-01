import { RestaurantModel } from '@/restaurant/model/restaurant.model'
import { RestaurantWithUser } from '@/restaurant/presenters/http/dto/restaurante.dto'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class RestaurantCreateRepository {
  abstract execute(
    category: Partial<RestaurantWithUser>
  ): Promise<RestaurantModel>
}
