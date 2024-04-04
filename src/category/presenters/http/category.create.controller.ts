import { CategoryService } from '@/category/application/category.service'
import { ZodValidationPipe } from '@core/utils/zod.validation.pipe'
import { Body, Controller, Logger, Post, UsePipes } from '@nestjs/common'
import { CategoryDto, CreateCategorySchema } from './dto/category.dto'

@Controller('category')
export class CategoryCreateController {
  private readonly logger = new Logger(CategoryCreateController.name)
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(CreateCategorySchema))
  async execute(@Body() categoryDto: CategoryDto) {
    this.logger.log('Creating a category', categoryDto)
    return await this.categoryService.create(categoryDto)
  }
}
