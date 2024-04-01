import { CategoryModule } from '@/category/application/category.module'
import { CategoryService } from '@/category/application/category.service'
import { CategoryModel } from '@/category/model/category.model'
import { faker } from '@faker-js/faker'
import { Test, TestingModule } from '@nestjs/testing'
import { CategoryCreateController } from './category.create.controller'
import { CategoryDto } from './dto'

describe('CategoryCreateControllerTest', () => {
  let controller: CategoryCreateController
  let categoryService: CategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CategoryModule]
    }).compile()

    controller = module.get<CategoryCreateController>(CategoryCreateController)
    categoryService = module.get<CategoryService>(CategoryService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should call categoryService.execute with valid categoryDto', async () => {
    const title = faker.lorem.word()
    const categoryDto = new CategoryDto()
    categoryDto.title = title
    categoryDto.restaurant.id = 1

    const categoryServiceMock = jest
      .spyOn(categoryService, 'execute')
      .mockResolvedValueOnce({
        title: title,
        restaurant: {
          id: faker.number.int()
        }
      } as CategoryModel)

    const controller = new CategoryCreateController(categoryService)
    controller.execute(categoryDto)

    expect(categoryServiceMock).toHaveBeenCalled()
    expect(categoryServiceMock).toHaveBeenCalledWith(categoryDto)
  })
})
