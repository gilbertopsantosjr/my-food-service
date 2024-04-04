import { CategoryService } from '@/category/application/category.service'
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe
} from '@nestjs/common'
import { isEmptyObject } from '@new-developers-group/core-ts-lib/'

@Controller('categories')
export class GetCategoryByIdController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: string) {
    const result = await this.categoryService.findById(+id)
    if (!result || isEmptyObject(result)) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }
    return result
  }
}
