import { CategoryModel } from '@/category/model/category.model'
import { Category, Prisma } from '@prisma/client'

export class CategoryFactory {
  static toPersist(dto: CategoryModel): Prisma.CategoryCreateInput {
    return {
      title: dto.title,
      description: dto.description,
      user: {
        userId: dto.user.userId
      },
      restaurant: {
        restaurantId: dto.restaurant.restaurantId
      }
    } as Prisma.CategoryCreateInput
  }

  static toModel(entity: Category): CategoryModel {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      createAt: entity.createAt,
      restaurant: null,
      user: null
    } as CategoryModel
  }
}
