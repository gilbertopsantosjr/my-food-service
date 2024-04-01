import { Body, Controller, Logger, Post } from '@nestjs/common'

import { RestaurantService } from '@/restaurant/application/restaurant.service'
import { RestaurantDto } from './dto/restaurante.dto'

@Controller('restaurant')
export class RestaurantCreateController {
  private readonly logger = new Logger(RestaurantCreateController.name)
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post()
  async execute(@Body() restaurantDto: RestaurantDto) {
    this.logger.log('Creating a restaurant', restaurantDto)
    const result = await this.restaurantService.create({
      ...restaurantDto,
      user: { id: 1 }
    })
    return result
  }
}
