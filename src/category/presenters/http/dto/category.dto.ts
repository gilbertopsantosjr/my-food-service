import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

export const CreateCategorySchema = z.object({
  title: z.string().min(3).max(55),
  description: z.string().min(3).max(255),
  restaurants: z.object({
    id: z.number()
  })
})

export const UpdateCategorySchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3).max(55),
  description: z.string().min(3).max(255),
  restaurants: z.object({
    id: z.number()
  })
})

class Restaurant {
  @ApiProperty()
  id!: number
}

// validate
export class CategoryDto {
  @ApiProperty()
  title!: string

  @ApiProperty()
  description!: string

  @ApiProperty({ type: () => Restaurant })
  restaurants!: Restaurant
}

export type CategoryWithId = Partial<CategoryDto> & {
  id: number
}
