import { ResponseCategoryDto } from '@/category/model/category.model'
import {
  ResponseRestaurantDto,
  UpdateRestaurantDto
} from '@/restaurant/model/restaurant.model'
import { Prisma } from '@prisma/client'

export type RestaurantesWithCategories = Prisma.RestaurantGetPayload<{
  include: {
    categories: true
  }
}>

export class RestaurantFactory {
  static toModel(entity: RestaurantesWithCategories): ResponseRestaurantDto {
    const categories: ResponseCategoryDto[] = []

    for (let index = 0; index < entity.categories.length; index++) {
      const item = entity.categories[index]
      categories.push({
        id: item.id,
        title: item.title,
        description: item.description,
        createdAt: item.createdAt
      } as ResponseCategoryDto)
    }

    return {
      id: entity.id,
      createdAt: entity.createdAt,
      title: entity.title,
      content: entity.content!,
      published: entity.published ? true : false,
      categories: categories
    } satisfies ResponseRestaurantDto
  }

  /**
   * persist serves the create and update use case
   * @param dto
   * @returns
   */
  static toPersist(
    dto: Partial<UpdateRestaurantDto>
  ): Prisma.RestaurantCreateInput {
    if (!dto.categories || dto.categories.length === 0) {
      return {
        title: dto.title!,
        content: dto.content,
        published: dto.published,
        user: {
          connect: { id: dto.user!.id }
        }
      } satisfies Prisma.RestaurantCreateInput
    } else {
      return {
        title: dto.title!,
        content: dto.content,
        published: dto.published,
        user: {
          connect: { id: dto.user!.id }
        },
        categories: {
          connect: dto.categories?.map((item) => {
            return { id: item!.id }
          })
        }
      } satisfies Prisma.RestaurantCreateInput
    }
  }
}
