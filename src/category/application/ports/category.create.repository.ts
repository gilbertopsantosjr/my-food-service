import { Category } from '@/category/model/category'

/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class CategoryCreateRepository {
  abstract execute(category: Category): Promise<Category>
}
