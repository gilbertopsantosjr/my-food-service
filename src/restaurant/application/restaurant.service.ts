import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { Injectable, Logger } from '@nestjs/common'
import { RestaurantModel } from '../model/restaurant.model'
import { RestaurantWithUser } from '../presenters/http/dto/restaurante.dto'
import { RestaurantCreateRepository } from './ports/restaurant.create.repository'
import { RestaurantQueriesRepository } from './ports/restaurant.queries.repository'

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger(RestaurantService.name)
  constructor(
    private readonly createRepository: RestaurantCreateRepository,
    private readonly queryRepository: RestaurantQueriesRepository,
    private readonly categoryQueryRepository: CategoryQueriesRepository
  ) {}

  async create(restaurant: RestaurantWithUser): Promise<RestaurantModel> {
    //rules
    // check if categories exists
    const categoriesIds = restaurant.categories.map((item) => item.id)
    const categoriesExists =
      await this.categoryQueryRepository.findAllByIds(categoriesIds)

    if (categoriesExists.length !== categoriesIds.length) {
      throw new Error('Category not found')
    }
    // check if restaurant exists
    const found = await this.queryRepository.findByTitleAndUserId(
      restaurant.title,
      restaurant.user.id
    )
    if (found) {
      throw new Error('Restaurant already exists')
    }
    // 5 - return restaurant
    return await this.createRepository.execute(restaurant)
  }

  async findAll(): Promise<RestaurantModel[]> {
    // adding cache here
    return await this.queryRepository.findAll()
  }

  async findById(id: number): Promise<RestaurantModel> {
    // adding cache here
    return await this.queryRepository.findById(id)
  }

  async update(
    id: string,
    restaurant: RestaurantModel
  ): Promise<RestaurantModel> {
    return null
  }

  async delete(id: string): Promise<RestaurantModel> {
    return null
  }
}
