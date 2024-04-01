import { RestaurantModel } from '@/restaurant/model/restaurant.model'
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

export class RestaurantFactory {
  static toModel(entity: RestaurantModel): any {
    throw new Error('Method not implemented.')
  }

  static toCreate(dto: RestaurantModel): Prisma.RestaurantCreateInput {
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
      user: {
        connect: { id: dto.user.id }
      }
    } satisfies Prisma.RestaurantCreateInput
  }
}
