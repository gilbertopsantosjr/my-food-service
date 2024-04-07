import { RestaurantService } from '@/restaurant/application/restaurant.service'
import { ZodValidationPipe } from '@anatine/zod-nestjs'
import {
  Body,
  Controller,
  Logger,
  Param,
  ParseIntPipe,
  Put,
  UsePipes
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  ResponseRestaurantDto,
  UpdateRestaurantDto
} from './dto/restaurante.dto'

@Controller('restaurant')
@ApiTags('restaurant')
export class RestaurantUpdateController {
  private readonly logger = new Logger(RestaurantUpdateController.name)
  constructor(private readonly restaurantService: RestaurantService) {}

  @Put(':id')
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Update a restaurant' })
  @ApiResponse({
    status: 200,
    description: 'The restaurant has been successfully created.',
    type: ResponseRestaurantDto
  })
  async execute(
    @Body() restaurantDto: UpdateRestaurantDto,
    @Param('id', ParseIntPipe) id: string
  ) {
    this.logger.log('Updating a restaurant', restaurantDto)
    return await this.restaurantService.update({
      ...restaurantDto,
      user: { id: 1 },
      id: +id
    })
  }
}
