import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

class Category {
  @ApiProperty({ type: Number })
  id: number
}

export class RestaurantDto {
  @ApiProperty({})
  id: number

  @ApiProperty({})
  title: string

  @ApiProperty({})
  content: string

  @ApiProperty({
    type: Boolean
  })
  published: boolean

  @ApiProperty({ type: [Category] })
  categories: Category[]
}

export const RestaurantSchema = extendApi(
  z.object({
    id: z.number(),
    title: z.string().min(3).max(55),
    content: z.string().min(3).max(255),
    published: z.boolean().optional(),
    categories: z.array(
      z.object({
        id: z.number()
      })
    )
  })
)

export class CreateRestaurantDto extends createZodDto(
  RestaurantSchema.omit({ id: true })
) {}

export type RestaurantWithUser = CreateRestaurantDto & {
  user: { id: number }
}
