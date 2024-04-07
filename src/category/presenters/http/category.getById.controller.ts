import { CategoryService } from '@/category/application/category.service'
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { isEmptyObject } from '@new-developers-group/core-ts-lib/'
import { ResponseCategoryDto } from './dto/category.dto'

@Controller('category')
@ApiTags('category')
export class GetCategoryByIdController {
  private readonly logger = new Logger(GetCategoryByIdController.name)
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Find Category by Id' })
  @ApiResponse({
    status: 200,
    type: ResponseCategoryDto
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found.'
  })
  @ApiResponse({
    status: 500,
    description: 'Could not get by id the category.'
  })
  async getById(@Param('id', ParseIntPipe) id: string) {
    const result = await this.categoryService.findById(+id)
    if (!result || isEmptyObject(result)) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }
    this.logger.debug(`Category found:`, result)
    return result
  }
}
