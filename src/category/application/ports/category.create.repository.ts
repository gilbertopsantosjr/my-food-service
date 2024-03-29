import { CategoryModel } from '@/category/model/category.model'
import { Category } from '@prisma/client'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class CategoryCreateRepository {
  abstract execute(category: Partial<CategoryModel>): Promise<Category>
}
