import {
  ResponseRestaurantDto,
  UpdateRestaurantDto
} from '@/restaurant/model/restaurant.model'

export abstract class RestaurantUpdateRepository {
  abstract execute(
    category: UpdateRestaurantDto
  ): Promise<ResponseRestaurantDto | null>
}
