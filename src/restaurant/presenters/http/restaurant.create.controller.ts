import { RestaurantService } from '@/restaurant/application/restaurant.service'
import {
  CreateRestaurantDto,
  ResponseRestaurantDto
} from '@/restaurant/model/restaurant.model'
import { ZodValidationPipe } from '@anatine/zod-nestjs'
import {
  Body,
  Controller,
  Logger,
  NotFoundException,
  Post,
  UsePipes
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NotFoundError } from '@new-developers-group/core-ts-lib'

@Controller('restaurant')
@ApiTags('restaurant')
export class RestaurantCreateController {
  private readonly logger = new Logger(RestaurantCreateController.name)
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiResponse({
    status: 201,
    description: 'The restaurant has been successfully created.',
    type: ResponseRestaurantDto
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.'
  })
  @ApiResponse({
    status: 400,
    description: 'Restaurant already exists.'
  })
  async execute(
    @Body() restaurantDto: CreateRestaurantDto
  ): Promise<ResponseRestaurantDto | null> {
    this.logger.debug('Creating a restaurant', restaurantDto)
    try {
      return await this.restaurantService.create({
        ...restaurantDto,
        user: { id: 3 }
      })
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
