import { Test, TestingModule } from '@nestjs/testing'
import { CategoryInfraModule } from '../infrastructure/category.infra.module'
import { CategoryModule } from './category.module'
import { CategoryCreateService } from './category.service'

describe('CategoryServiceTest', () => {
  let service: CategoryCreateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CategoryModule.withInfrastructure(CategoryInfraModule.use('TEST'))
      ]
    }).compile()

    service = module.get<CategoryCreateService>(CategoryCreateService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
