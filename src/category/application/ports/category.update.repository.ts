import { CategoryModel } from '@/category/model/category.model'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class CategoryUpdateRepository {
  abstract execute(
    category: Partial<CategoryModel>
  ): Promise<CategoryModel | null>
}
