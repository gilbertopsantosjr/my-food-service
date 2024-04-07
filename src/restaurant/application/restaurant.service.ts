import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { Injectable, Logger } from '@nestjs/common'
import {
  DuplicateError,
  NotFoundError
} from '@new-developers-group/core-ts-lib'
import {
  ResponseRestaurantDto,
  RestaurantWithUser,
  UpdateRestaurantDto
} from '../model/restaurant.model'
import { RestaurantCreateRepository } from './ports/restaurant.create.repository'
import { RestaurantQueriesRepository } from './ports/restaurant.queries.repository'
import { RestaurantUpdateRepository } from './ports/restaurant.update.repository'

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger(RestaurantService.name)
  constructor(
    private readonly createRepository: RestaurantCreateRepository,
    private readonly updateRepository: RestaurantUpdateRepository,
    private readonly queryRepository: RestaurantQueriesRepository,
    private readonly categoryQueryRepository: CategoryQueriesRepository
  ) {}

  async create(
    restaurant: RestaurantWithUser
  ): Promise<ResponseRestaurantDto | null> {
    // check if restaurant exists
    const found = await this.queryRepository.findByTitleAndUserId(
      restaurant.title,
      restaurant.user.id
    )
    if (found) {
      throw new DuplicateError('Restaurant already exists')
    }
    // 5 - return restaurant
    const result = await this.createRepository.execute(restaurant)
    this.logger.debug('Restaurant created', result)
    return result
  }

  async update(
    restaurant: UpdateRestaurantDto
  ): Promise<ResponseRestaurantDto | null> {
    const exists = await this.queryRepository.findById(restaurant.id)
    if (!exists) {
      throw new NotFoundError('Restaurant not found')
    }
    // check if categories exists
    const categoriesIds = restaurant.categories?.map((item) => item!.id)
    const categoriesExists =
      await this.categoryQueryRepository.findAllByIds(categoriesIds)

    if (categoriesExists.length !== categoriesIds.length) {
      throw new NotFoundError('Category not found')
    }
    const result = await this.updateRepository.execute(restaurant)
    this.logger.debug('Restaurant updated', result)
    return result
  }

  async findAll(): Promise<ResponseRestaurantDto[]> {
    // adding cache here
    return await this.queryRepository.findAll()
  }

  async findById(id: number): Promise<ResponseRestaurantDto | null> {
    // adding cache here
    return await this.queryRepository.findById(id)
  }

  async delete(id: number, userId: number): Promise<boolean> {
    const exists = await this.queryRepository.findById(id)
    if (!exists) {
      throw new NotFoundError('Restaurant not found')
    }
    const result = await this.updateRepository.execute({
      id,
      published: false,
      user: { id: userId }
    } as UpdateRestaurantDto)
    this.logger.debug('Restaurant deleted', result)
    const deleted = await this.queryRepository.findById(id)
    return deleted ? false : true
  }
}
