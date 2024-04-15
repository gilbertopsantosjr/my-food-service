import { AuthModule } from '@core/auth/auth.module'
import { Module } from '@nestjs/common'
import { CategoryModule } from './category/application/category.module'
import { RestaurantModule } from './restaurant/application/restaurant.module'

@Module({
  imports: [AuthModule, CategoryModule, RestaurantModule]
})
export class AppModule {}
