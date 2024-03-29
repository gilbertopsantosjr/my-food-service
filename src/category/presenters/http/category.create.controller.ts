import { CategoryService } from '@/category/application/category.service'
import { Body, Controller, Post } from '@nestjs/common'
import { CategoryCreateDto } from './dto/category.create.dto'

@Controller('category')
export class CategoryCreateController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  execute(@Body() categoryDto: CategoryCreateDto) {
    return this.categoryService.execute(categoryDto)
  }
}
