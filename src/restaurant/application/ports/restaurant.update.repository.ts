import { RestaurantModel } from '@/restaurant/model/restaurant.model'
import { UpdateRestaurantDto } from '@/restaurant/presenters/http/dto/restaurante.dto'

export abstract class RestaurantUpdateRepository {
  abstract execute(
    category: UpdateRestaurantDto
  ): Promise<RestaurantModel | null>
}
