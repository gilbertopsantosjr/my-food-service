import { RestaurantService } from '@/restaurant/application/restaurant.service'
import { ResponseRestaurantDto } from '@/restaurant/model/restaurant.model'
import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('restaurant')
@ApiTags('restaurant')
export class GetRestaurantListAllController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiOperation({ summary: 'Find all restaurants' })
  @ApiResponse({
    status: 200,
    type: [ResponseRestaurantDto]
  })
  async execute() {
    return await this.restaurantService.findAll()
  }
}
