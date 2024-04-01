import { Module } from '@nestjs/common'
import { CategoryModule } from './category/application/category.module'
import { RestaurantModule } from './restaurant/application/restaurant.module'

@Module({
  imports: [CategoryModule, RestaurantModule]
})
export class AppModule {}
