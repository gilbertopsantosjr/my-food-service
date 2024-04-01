import { CategoryService } from '@/category/application/category.service'
import { Body, Controller, Logger, Post } from '@nestjs/common'
import { CategoryDto } from './dto/category.dto'

@Controller('category')
export class CategoryCreateController {
  private readonly logger = new Logger(CategoryCreateController.name)
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  async execute(@Body() categoryDto: CategoryDto) {
    this.logger.log('Creating a category', categoryDto)
    return await this.categoryService.create(categoryDto)
  }
}
