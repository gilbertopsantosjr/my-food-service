import { Test, TestingModule } from '@nestjs/testing'
import { CategoryModule } from './category.module'
import { CategoryService } from './category.service'

describe('CategoryServiceTest', () => {
  let service: CategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CategoryModule]
    }).compile()

    service = module.get<CategoryService>(CategoryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
