/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryCreateRepository } from '@/category/application/ports/category.create.repository'
import { Category } from '@/category/model/category'

export class CategoryCreateDynamoRepository
  implements CategoryCreateRepository
{
  execute(category: Category): Promise<Category> {
    throw new Error('Method not implemented.')
  }
}
