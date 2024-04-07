import {
  ResponseCategoryDto,
  UpdateCategoryDto
} from '@/category/model/category.model'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class CategoryUpdateRepository {
  abstract execute(
    category: UpdateCategoryDto
  ): Promise<ResponseCategoryDto | null>
}
