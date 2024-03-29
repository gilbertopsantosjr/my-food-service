import { CategoryModule } from '@/category/application/category.module'
import { CategoryCreateService } from '@/category/application/category.service'
import { CategoryInfraModule } from '@/category/infrastructure/category.infra.module'
import { Category } from '@/category/model/category'
import { Test, TestingModule } from '@nestjs/testing'
import { CategoryCreateController } from './category.create.controller'
import { CategoryCreateDto } from './dto'

describe('CategoryCreateControllerTest', () => {
  let controller: CategoryCreateController
  let categoryService: CategoryCreateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CategoryModule.withInfrastructure(CategoryInfraModule.use('TEST'))
      ]
    }).compile()

    controller = module.get<CategoryCreateController>(CategoryCreateController)
    categoryService = module.get<CategoryCreateService>(CategoryCreateService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call categoryService.execute with valid categoryDto', async () => {
    const categoryDto = new CategoryCreateDto()
    categoryDto.name = 'Test Category'
    categoryDto.restaurantId = 1

    const categoryServiceMock = jest
      .spyOn(categoryService, 'execute')
      .mockResolvedValueOnce({
        name: 'Test Category',
        restaurant: {
          restaurantId: 1
        }
      } as Category)

    const controller = new CategoryCreateController(categoryService)
    controller.execute(categoryDto)

    expect(categoryServiceMock).toHaveBeenCalled()
    expect(categoryServiceMock).toHaveBeenCalledWith(categoryDto)
  })
})
