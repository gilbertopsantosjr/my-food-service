import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDate,
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
  @ApiProperty({})
  title: string

  @IsString()
  @IsDefined()
  @ApiProperty({})
  content: string

  @IsDate()
  @ApiProperty({
    type: Date
  })
  createAt: Date

  @ApiProperty({
    type: Boolean
  })
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
