import { CategoryModel } from '@/category/model/category.model'
import { RestaurantModel } from '@/restaurant/model/restaurant.model'
import { RestaurantWithUser } from '@/restaurant/presenters/http/dto/restaurante.dto'
import { ValidationError } from '@core/errors/validation.error'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

const schema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
  user: z.object({
    id: z.number()
  })
})

export type RestaurantesWithCategories = Prisma.RestaurantGetPayload<{
  include: {
    categories: true
  }
}>

export class RestaurantFactory {
  static toModel(entity: RestaurantesWithCategories): RestaurantModel {
    const categories: CategoryModel[] = []

    for (let index = 0; index < entity.categories.length; index++) {
      const item = entity.categories[index]
      categories.push({
        id: item.id,
        title: item.title,
        description: item.description,
        createdAt: item.createdAt
      } satisfies CategoryModel)
    }

    return {
      id: entity.id,
      createdAt: entity.createdAt,
      title: entity.title,
      content: entity.content,
      published: entity.published,
      categories: categories
    } satisfies RestaurantModel
  }

  static toCreate(dto: RestaurantWithUser): Prisma.RestaurantCreateInput {
    const val = schema.safeParse(dto)

    if (val.success === false) {
      throw new ValidationError(
        `can not factory a model toPersist`,
        val.error.flatten()
      )
    }

    return {
      title: dto.title,
      content: dto.content,
      published: dto.published,
      user: {
        connect: { id: dto.user.id }
      },
      categories: {
        connect: dto.categories
      }
    } satisfies Prisma.RestaurantCreateInput
  }
}
