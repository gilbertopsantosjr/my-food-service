import { IsDefined, IsString } from 'class-validator'

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
}

export type RestaurantWithUser = Partial<RestaurantDto> & {
  user: {
    id: number
  }
}
