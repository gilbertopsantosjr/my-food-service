import { CategoryService } from '@/category/application/category.service'
import {
  ResponseCategoryDto,
  UpdateCategoryDto
} from '@/category/model/category.model'
import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  NotFoundException,
  Put
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DuplicateError } from '@new-developers-group/core-ts-lib'
import { NotFoundError } from 'rxjs'

@Controller('category')
@ApiTags('category')
export class CategoryUpdateController {
  private readonly logger = new Logger(CategoryUpdateController.name)
  constructor(private readonly categoryService: CategoryService) {}

  @Put()
  @ApiOperation({ summary: 'Update category' })
  @ApiResponse({
    status: 200,
    type: ResponseCategoryDto
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.'
  })
  async execute(
    @Body() categoryDto: UpdateCategoryDto
  ): Promise<ResponseCategoryDto | null> {
    try {
      this.logger.debug('Updating a category', categoryDto)
      return await this.categoryService.update(categoryDto)
    } catch (error) {
      this.logger.error(
        `Error update a category ${categoryDto.title} for the restaurant: ${categoryDto.restaurants.id}`,
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
