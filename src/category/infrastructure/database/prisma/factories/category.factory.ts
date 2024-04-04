import { CategoryModel } from '@/category/model/category.model'
import { Prisma } from '@prisma/client'

export type CategoriesWithRestaurantes = Prisma.CategoryGetPayload<{
  include: {
    restaurants: true
  }
}>

export class CategoryFactory {
  static toCreate(dto: CategoryModel): Prisma.CategoryCreateInput {
    return {
      title: dto.title,
      description: dto.description,
      restaurants: {
        connect: { id: dto.restaurants?.id }
      }
    } satisfies Prisma.CategoryCreateInput
  }

  static toModelCreated(entity: CategoryModel): CategoryModel {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      createdAt: entity.createdAt
    } satisfies CategoryModel
  }

  static toModel(entity: CategoriesWithRestaurantes): CategoryModel {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      createdAt: entity.createdAt,
      restaurants: {
        id: entity.restaurants[0].id,
        title: entity.restaurants[0].title
      }
    } satisfies CategoryModel
  }
}
