import { RestaurantService } from '@/restaurant/application/restaurant.service'
import {
  ResponseRestaurantDto,
  UpdateRestaurantDto
} from '@/restaurant/model/restaurant.model'
import { ZodValidationPipe } from '@anatine/zod-nestjs'
import {
  Body,
  Controller,
  Logger,
  NotFoundException,
  Put,
  UsePipes
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NotFoundError } from '@new-developers-group/core-ts-lib'

@Controller('restaurant')
@ApiTags('restaurant')
export class RestaurantUpdateController {
  private readonly logger = new Logger(RestaurantUpdateController.name)
  constructor(private readonly restaurantService: RestaurantService) {}

  @Put()
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Update a restaurant' })
  @ApiResponse({
    status: 200,
    description: 'The restaurant has been successfully created.',
    type: ResponseRestaurantDto
  })
  async execute(
    @Body() restaurantDto: UpdateRestaurantDto
  ): Promise<ResponseRestaurantDto | null> {
    this.logger.debug('Updating a restaurant', restaurantDto)
    try {
      const result = await this.restaurantService.update({
        ...restaurantDto,
        user: { id: 3 }
      })
      return result
    } catch (error) {
      this.logger.error(
        `Error creating a restaurant ${restaurantDto.title}`,
        error
      )
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      } else {
        throw error
      }
    }
  }
}
