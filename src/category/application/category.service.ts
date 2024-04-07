import { RestaurantQueriesRepository } from '@/restaurant/application/ports/restaurant.queries.repository'
import { Injectable, Logger } from '@nestjs/common'
import {
  DuplicateError,
  NotFoundError
} from '@new-developers-group/core-ts-lib'
import {
  CreateCategoryDto,
  ResponseCategoryDto,
  UpdateCategoryDto
} from '../model/category.model'
import {
  CategoryCreateRepository,
  CategoryDeleteRepository,
  CategoryQueriesRepository,
  CategoryUpdateRepository
} from './ports/'

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name)
  constructor(
    private readonly createRepository: CategoryCreateRepository,
    private readonly queryRepository: CategoryQueriesRepository,
    private readonly updateRepository: CategoryUpdateRepository,
    private readonly deleteRepository: CategoryDeleteRepository,
    private readonly restaurantQuery: RestaurantQueriesRepository
  ) {}

  async create(
    _category: CreateCategoryDto
  ): Promise<ResponseCategoryDto | null> {
    //rules and validations that needs to check before saving the category
    // 1 - check if the restaurant exists
    const restaurant = await this.restaurantQuery.findById(
      _category.restaurants.id
    )
    if (!restaurant) throw new NotFoundError('Restaurant not found')

    // 2 - check if the category already exists for that restaurant
    const found = await this.queryRepository.findByTitleAndResturantId(
      _category.title,
      _category.restaurants.id
    )
    if (found) throw new DuplicateError('Category already exists')

    return await this.createRepository.execute(_category)
  }

  async findById(categoryId: number): Promise<ResponseCategoryDto | null> {
    // adding cache here
    return await this.queryRepository.findById(categoryId)
  }

  async findAll(): Promise<ResponseCategoryDto[] | []> {
    // adding cache here
    return await this.queryRepository.findAll()
  }

  async findAllByRestaurantId(
    restaurantId: number
  ): Promise<ResponseCategoryDto[] | []> {
    // adding cache here
    return await this.queryRepository.findAllByRestaurantId(restaurantId)
  }

  async update(
    category: UpdateCategoryDto
  ): Promise<ResponseCategoryDto | null> {
    const exists = await this.queryRepository.findById(category.id)
    if (!exists) {
      throw new NotFoundError('Restaurant not found')
    }
    const result = await this.updateRepository.execute(category)
    this.logger.log('Restaurant updated', result)
    return result
  }

  async delete(id: number): Promise<boolean> {
    const exists = await this.queryRepository.findById(id)
    if (!exists) {
      throw new NotFoundError('Category not found')
    }
    const result = await this.deleteRepository.execute(id)
    this.logger.log('Category deleted', result)
    return result
  }
}
