import { RestaurantService } from '@/restaurant/application/restaurant.service'
import { Controller, Get } from '@nestjs/common'

@Controller('restaurant')
export class GetRestaurantListAllController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  execute() {
    return this.restaurantService.findAll()
  }
}
