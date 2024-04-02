import { CategoryService } from '@/category/application/category.service'
import { Controller, Get, Param } from '@nestjs/common'
import { isEmptyObject, notFound } from '@new-developers-group/core-ts-lib/'

@Controller('categories')
export class GetCategoryByIdController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  getById(@Param('id') id: string) {
    const result = this.categoryService.findById(+id)
    if (!result || isEmptyObject(result)) {
      return notFound()
    }
  }
}
