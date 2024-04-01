import { Injectable } from '@nestjs/common'
import { RestaurantFactory } from '../infrastructure/database/prisma/factories/restaurant.factory'
import { RestaurantModel } from '../model/restaurant.model'
import { RestaurantWithUser } from '../presenters/http/dto/restaurante.dto'
import { RestaurantCreateRepository } from './ports/restaurant.create.repository'
import { RestaurantQueriesRepository } from './ports/restaurant.queries.repository'

@Injectable()
export class RestaurantService {
  constructor(
    private readonly createRepository: RestaurantCreateRepository,
    private readonly queryRepository: RestaurantQueriesRepository
  ) {}

  async create(restaurant: RestaurantWithUser): Promise<RestaurantModel> {
    const result = await this.createRepository.execute(restaurant)
    return RestaurantFactory.toModel(result)
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
