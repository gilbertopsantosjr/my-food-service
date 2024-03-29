import { CategoryFactory } from '@/category/infrastructure/database/prisma/factories/category.factory'
import { CategoryCreateDto } from '@/category/presenters/http/dto/category.create.dto'
import { Injectable } from '@nestjs/common'
import { Category } from '../model/category'
import { CategoryCreateRepository } from './ports/category.create.repository'

@Injectable()
export class CategoryCreateService {
  constructor(private readonly repository: CategoryCreateRepository) {}
  async execute(_categoryDto: CategoryCreateDto): Promise<Category> {
    const category = CategoryFactory.toPersist(_categoryDto)
    //return this.repository.execute(category);
    return category
  }
}
