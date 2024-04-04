import { Body, Controller, Logger, Post, UsePipes } from '@nestjs/common'

import { RestaurantService } from '@/restaurant/application/restaurant.service'
import { ZodValidationPipe } from '@anatine/zod-nestjs'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateRestaurantDto, RestaurantDto } from './dto/restaurante.dto'

@Controller('restaurant')
export class RestaurantCreateController {
  private readonly logger = new Logger(RestaurantCreateController.name)
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiResponse({
    status: 201,
    description: 'The restaurant has been successfully created.',
    type: RestaurantDto
  })
  async execute(@Body() restaurantDto: CreateRestaurantDto) {
    this.logger.log('Creating a restaurant', restaurantDto)
    return await this.restaurantService.create({
      ...restaurantDto,
      user: { id: 1 }
    })
  }
}
