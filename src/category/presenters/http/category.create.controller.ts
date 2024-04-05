import { CategoryService } from '@/category/application/category.service'
import { ZodValidationPipe } from '@anatine/zod-nestjs'
import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  NotFoundException,
  Post,
  UsePipes
} from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import {
  DuplicateError,
  NotFoundError
} from '@new-developers-group/core-ts-lib'
import { CreateCategoryDto, ResponseCategoryDto } from './dto/category.dto'

@Controller('category')
export class CategoryCreateController {
  private readonly logger = new Logger(CategoryCreateController.name)
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  @UsePipes(ZodValidationPipe)
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
    type: ResponseCategoryDto
  })
  @ApiResponse({
    status: 404,
    description: 'The restaurant for this category has been not found.',
    type: ResponseCategoryDto
  })
  @ApiResponse({
    status: 400,
    description: 'There is already this category for this restaurant.',
    type: ResponseCategoryDto
  })
  async execute(@Body() categoryDto: CreateCategoryDto) {
    try {
      this.logger.log('Creating a category', categoryDto)
      return await this.categoryService.create(categoryDto)
    } catch (error) {
      this.logger.error(
        `Error creating a category ${categoryDto.title} for the restaurant: ${categoryDto.restaurants.id}`,
        error
      )
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      } else if (error instanceof DuplicateError) {
        throw new BadRequestException(error.message)
      } else {
        throw error
      }
    }
  }
}
