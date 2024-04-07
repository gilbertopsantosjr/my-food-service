import { CategoryService } from '@/category/application/category.service'
import { Controller, Get, Logger, Query } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ResponseCategoryDto } from './dto/category.dto'

@Controller('category')
@ApiTags('category')
export class CategoryListAllController {
  private readonly logger = new Logger(CategoryListAllController.name)
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Find all categories' })
  @ApiResponse({
    status: 200,
    type: [ResponseCategoryDto]
  })
  async execute(@Query() query) {
    this.logger.log(`Query:${query}`, query)
    return await this.categoryService.findAll()
  }
}
