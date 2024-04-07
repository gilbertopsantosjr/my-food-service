import { RestaurantService } from '@/restaurant/application/restaurant.service'
import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NotFoundError } from '@new-developers-group/core-ts-lib'

@Controller('restaurant')
@ApiTags('restaurant')
export class RestaurantDeleteController {
  private readonly logger = new Logger(RestaurantDeleteController.name)
  constructor(private readonly restaurantService: RestaurantService) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a restaurant' })
  @ApiResponse({
    status: 200,
    description: 'The restaurant has been successfully deleted.'
  })
  @ApiResponse({
    status: 404,
    description: 'The restaurant not found.'
  })
  async execute(@Param('id', ParseIntPipe) id: string) {
    try {
      this.logger.log('Deleting a restaurant', id)
      return await this.restaurantService.delete(+id)
    } catch (error) {
      this.logger.error('Error deleting a restaurant', error)
      if (error instanceof NotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND)
      } else {
        throw error
      }
    }
  }
}
