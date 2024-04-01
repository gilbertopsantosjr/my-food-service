import { CategoryModel } from '@/category/model/category.model'
import { ValidationError } from '@core/errors/validation.error'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

export type CategoriesWithRestaurantes = Prisma.CategoryGetPayload<{
  include: {
    restaurants: true
  }
}>

const categorySchema = z.object({
  title: z.string(),
  description: z.string(),
  restaurant: z.object({
    id: z.number()
  }),
  user: z.object({
    id: z.number()
  })
})

const schema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createAt: z.date()
})

export class CategoryFactory {
  static toCreate(dto: CategoryModel): Prisma.CategoryCreateInput {
    const val = categorySchema.safeParse(dto)

    if (val.success === false) {
      throw new ValidationError(
        `can not factory a model toPersist`,
        val.error.flatten()
      )
    }

    return {
      title: dto.title,
      description: dto.description,
      restaurants: {
        connect: { id: dto.restaurant.id }
      }
    } satisfies Prisma.CategoryCreateInput
  }

  static toModelCreated(entity: CategoryModel): CategoryModel {
    const val = schema.safeParse(entity)

    if (val.success === false) {
      throw new ValidationError(
        `can not factory a model toModelCreated`,
        val.error.flatten()
      )
    }

    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      createdAt: entity.createdAt
    } satisfies CategoryModel
  }

  static toModel(entity: CategoriesWithRestaurantes): CategoryModel {
    const val = categorySchema.safeParse(entity)

    if (val.success === false) {
      throw new ValidationError(
        `can not factory a model toModel`,
        val.error.flatten()
      )
    }

    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      createdAt: entity.createdAt,
      restaurant: {
        id: entity.restaurants[0].id,
        title: entity.restaurants[0].title
      }
    } satisfies CategoryModel
  }
}
