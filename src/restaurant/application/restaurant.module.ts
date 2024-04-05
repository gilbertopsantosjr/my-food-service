import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { CategoryQueriesPrismaRepository } from '@/category/infrastructure/database/prisma/adapters'
import { PrismaModule } from '@core/databases/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
  RestaurantCreatePrismaRepository,
  RestaurantQueriesPrismaRepository,
  RestaurantUpdatePrismaRepository
} from '../infrastructure/database/prisma/adapters'
import {
  GetRestaurantByIdController,
  GetRestaurantListAllController,
  RestaurantCreateController
} from '../presenters/http/'
import {
  RestaurantCreateRepository,
  RestaurantQueriesRepository,
  RestaurantUpdateRepository
} from './ports'
// TODO fazer um pequeno video sobre paths e alias
import { RestaurantService } from './restaurant.service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule.register()],
  controllers: [
    RestaurantCreateController,
    GetRestaurantListAllController,
    GetRestaurantByIdController
  ],
  providers: [
    {
      provide: RestaurantCreateRepository,
      useClass: RestaurantCreatePrismaRepository
    },
    {
      provide: RestaurantQueriesRepository,
      useClass: RestaurantQueriesPrismaRepository
    },
    {
      provide: CategoryQueriesRepository,
      useClass: CategoryQueriesPrismaRepository
    },
    {
      provide: RestaurantUpdateRepository,
      useClass: RestaurantUpdatePrismaRepository
    },
    RestaurantService
  ]
})
export class RestaurantModule {}
