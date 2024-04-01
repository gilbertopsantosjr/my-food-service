import { PrismaModule } from '@core/databases/prisma/prisma.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { RestaurantCreateController } from '../presenters/http/restaurant.create.controller'
import { RestaurantService } from './restaurant.service'

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule.register()],
  controllers: [RestaurantCreateController],
  providers: [RestaurantService]
})
export class RestaurantModule {}
