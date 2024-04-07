import { CategoryService } from '@/category/application/category.service'
import {
  Controller,
  Delete,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NotFoundError } from '@new-developers-group/core-ts-lib/'

@Controller('category')
@ApiTags('category')
export class CategoryDeleteController {
  private readonly logger = new Logger(CategoryDeleteController.name)
  constructor(private readonly categoryService: CategoryService) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Category by Id' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.'
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.'
  })
  @ApiResponse({
    status: 500,
    description: 'Could not delete the category.'
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    try {
      const result = await this.categoryService.delete(id)
      if (!result) {
        throw new InternalServerErrorException('Could not delete the category')
      }
      this.logger.log(`Category deleted: ${id}`, result)
      return result
    } catch (error) {
      this.logger.error(`Error delete a category ${id}`, error)
      if (error instanceof NotFoundError) {
        throw new NotFoundException(error.message)
      } else {
        throw error
      }
    }
  }
}
