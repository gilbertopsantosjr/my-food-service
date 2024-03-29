import { CategoryCreateDto } from '@/category/presenters/http/dto/category.create.dto'
import { Injectable } from '@nestjs/common'
import { CategoryFactory } from '../infrastructure/database/prisma/factories/category.factory'
import { CategoryModel } from '../model/category.model'
import { CategoryCreateRepository } from './ports/category.create.repository'
import { CategoryQueriesRepository } from './ports/category.queries.repository'

@Injectable()
export class CategoryService {
  constructor(
    private readonly create: CategoryCreateRepository,
    private readonly query: CategoryQueriesRepository
  ) {}

  async execute(_categoryDto: CategoryCreateDto): Promise<CategoryModel> {
    //rules and validations that needs to check before saving the category
    // 1 - check if the restaurant exists

    // 2 - check if the category already exists for that restaurant
    const found = this.query.findByTitleAndResturantId(
      _categoryDto.title,
      _categoryDto.restaurantId
    )
    if (found) throw new Error('Category already exists')

    const result = await this.create.execute(_categoryDto)
    return CategoryFactory.toModel(result)
  }

  async findById(categoryId: number): Promise<CategoryModel> {
    // adding cache here
    return await this.query.findById(categoryId)
  }

  async findAll(): Promise<CategoryModel[]> {
    // adding cache here
    return await this.query.findAll()
  }

  async findAllByRestaurantId(restaurantId: number): Promise<CategoryModel[]> {
    // adding cache here
    return await this.query.findAllByRestaurantId(restaurantId)
  }
}
