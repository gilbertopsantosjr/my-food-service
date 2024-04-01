import { RestaurantCreateRepository } from '@/restaurant/application/ports/restaurant.create.repository'
import { RestaurantQueriesRepository } from '@/restaurant/application/ports/restaurant.queries.repository'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { RestaurantCreatePrismaRepository } from './adapters/restaurant.create.prisma.repository'
import { RestaurantQueriesPrismaRepository } from './adapters/restaurant.queries.prisma.repository'

@Module({})
export class CategoryPrismaModule {
  static forRoot(prismaService: PrismaService | any) {
    return {
      module: CategoryPrismaModule,
      providers: [
        {
          provide: PrismaService,
          useValue: prismaService
        },
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
