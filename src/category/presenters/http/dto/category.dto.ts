import { Type } from 'class-transformer'
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested
} from 'class-validator'

class Restaurant {
  id: number
  name?: string
}

// validate
export class CategoryDto {
  @IsString()
  @IsDefined()
  title: string

  @IsString()
  description: string

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Restaurant)
  restaurant: Restaurant
}

export type CategoryWithId = Partial<CategoryDto> & {
  id: number
}
