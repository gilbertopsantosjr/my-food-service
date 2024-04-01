import { RestaurantCreateRepository } from '@/restaurant/application/ports/restaurant.create.repository'
import { RestaurantQueriesRepository } from '@/restaurant/application/ports/restaurant.queries.repository'
import { PrismaModule } from '@core/databases/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RestaurantCreatePrismaRepository } from './adapters/restaurant.create.prisma.repository'
import { RestaurantQueriesPrismaRepository } from './adapters/restaurant.queries.prisma.repository'

@Module({})
export class CategoryPrismaModule {
  static forRoot() {
    return {
      module: CategoryPrismaModule,
      imports: [ConfigModule.forRoot(), PrismaModule.register()],
      providers: [
        {
          provider: RestaurantCreateRepository,
          useClass: RestaurantCreatePrismaRepository
        },
        {
          provider: RestaurantQueriesRepository,
          useClass: RestaurantQueriesPrismaRepository
        }
      ],
      exports: [RestaurantCreateRepository, RestaurantQueriesRepository]
    }
  }
}
