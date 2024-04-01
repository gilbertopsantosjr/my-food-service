import { CategoryQueriesRepository } from '@/category/application/ports/category.queries.repository'
import { CategoryQueriesPrismaRepository } from '@/category/infrastructure/database/prisma/adapters'
import { PrismaModule } from '@core/databases/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RestaurantCreatePrismaRepository } from '../infrastructure/database/prisma/adapters/restaurant.create.prisma.repository'
import { RestaurantQueriesPrismaRepository } from '../infrastructure/database/prisma/adapters/restaurant.queries.prisma.repository'
import { RestaurantCreateController } from '../presenters/http/restaurant.create.controller'
import { RestaurantCreateRepository } from './ports/restaurant.create.repository'
import { RestaurantQueriesRepository } from './ports/restaurant.queries.repository'
import { RestaurantService } from './restaurant.service'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule.register()],
  controllers: [RestaurantCreateController],
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
    RestaurantService
  ]
})
export class RestaurantModule {}
