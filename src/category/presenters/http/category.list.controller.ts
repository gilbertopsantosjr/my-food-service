import { CategoryService } from '@/category/application/category.service'
import { Controller, Get } from '@nestjs/common'

@Controller('category')
export class CategoryListAllController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  execute() {
    return this.categoryService.findAll()
  }
}
