import { Test, TestingModule } from '@nestjs/testing'
import { RestaurantModule } from './restaurant.module'
import { RestaurantService } from './restaurant.service'

describe('restaurantServiceTest', () => {
  let service: RestaurantService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RestaurantModule]
    }).compile()

    service = module.get<RestaurantService>(RestaurantService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
