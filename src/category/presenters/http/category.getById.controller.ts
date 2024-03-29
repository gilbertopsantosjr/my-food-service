import { CategoryService } from '@/category/application/category.service'
import { Controller, Get, Param } from '@nestjs/common'

@Controller('categories')
export class GetCategoryByIdController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.categoryService.findById(+id)
  }
}
