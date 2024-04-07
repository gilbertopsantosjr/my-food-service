import { RestaurantService } from '@/restaurant/application/restaurant.service'
import { ResponseRestaurantDto } from '@/restaurant/model/restaurant.model'
import {
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { isEmptyObject } from '@new-developers-group/core-ts-lib'

@Controller('restaurant')
@ApiTags('restaurant')
export class GetRestaurantByIdController {
  private readonly logger = new Logger(GetRestaurantByIdController.name)
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a restaurant by id' })
  @ApiResponse({
    status: 200,
    type: ResponseRestaurantDto
  })
  @ApiResponse({
    status: 404,
    description: 'The restaurant not found.'
  })
  @ApiResponse({
    status: 500,
    description: 'Could not get by id the restaurant.'
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.restaurantService.findById(id)
    if (!result || isEmptyObject(result)) {
      throw new NotFoundException('restaurant not found')
    }
    this.logger.debug(`restaurant found:`, result)
    return result
  }
}
