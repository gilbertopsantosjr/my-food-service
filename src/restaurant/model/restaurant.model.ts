import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

export const RestaurantSchema = extendApi(
  z.object({
    id: z.number(),
    title: z.string().min(3).max(55),
    content: z.string().min(3).max(255),
    createdAt: z.date().optional(),
    published: z.boolean().optional(),
    categories: z.array(
      z
        .object({
          id: z.number()
        })
        .optional()
    )
  })
)

export class CreateRestaurantDto extends createZodDto(
  RestaurantSchema.omit({
    id: true,
    createdAt: true,
    published: true,
    categories: true
  })
) {}

export class UpdateRestaurantDto extends createZodDto(
  RestaurantSchema.omit({ createdAt: true })
) {
  user: { id: number }
}

export class ResponseRestaurantDto extends createZodDto(RestaurantSchema) {}

export type RestaurantWithUser = CreateRestaurantDto & {
  user: { id: number }
}
