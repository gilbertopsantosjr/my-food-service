import { Type } from 'class-transformer'
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested
} from 'class-validator'

class Category {
  @IsDefined()
  @IsNumber()
  id: number
  title?: string
}

export class RestaurantDto {
  @IsString()
  @IsDefined()
  title: string

  @IsString()
  @IsDefined()
  content: string

  @IsString()
  createAt: Date

  published: boolean

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => Category)
  categories: [Category]
}

export type RestaurantWithUser = Partial<RestaurantDto> & {
  user: {
    id: number
  }
}
