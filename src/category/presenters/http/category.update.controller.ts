import { CategoryService } from '@/category/application/category.service'
import { Body, Controller, Logger, Put } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseCategoryDto, UpdateCategoryDto } from './dto/category.dto'

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
  async execute(@Body() categoryDto: UpdateCategoryDto) {
    this.logger.log('Updating a category', categoryDto)
    return await this.categoryService.update(categoryDto)
  }
}
