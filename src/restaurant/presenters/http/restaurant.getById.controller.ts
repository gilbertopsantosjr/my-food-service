import { RestaurantService } from '@/restaurant/application/restaurant.service'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('restaurant')
export class GetRestaurantByIdController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.restaurantService.findById(+id)
  }
}
