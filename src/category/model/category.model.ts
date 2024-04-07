import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'
import { z } from 'zod'

// category domain should not understand its relationship with another dto
export const CategorySchema = extendApi(
  z.object({
    id: z.number(),
    title: z.string().min(3).max(55),
    description: z.string().min(3).max(255),
    createdAt: z.date().optional(),
    restaurants: z.object({
      id: z.number()
    })
  })
)

export class CreateCategoryDto extends createZodDto(
  CategorySchema.omit({ id: true, createdAt: true })
) {}

export class UpdateCategoryDto extends createZodDto(
  CategorySchema.omit({ createdAt: true })
) {}

export class ResponseCategoryDto extends createZodDto(CategorySchema) {}
