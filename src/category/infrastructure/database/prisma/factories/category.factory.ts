import { Category } from '@/category/model/category'
import { CategoryCreateDto } from '@/category/presenters/http/dto'
import { CategoryPrismaEntity } from '../entities/category.prisma.entity'

export class CategoryFactory {
  static toPersist(dto: CategoryCreateDto): Category {
    const persist = new Category()
    persist.name = dto.name
    persist.restaurant = {
      restaurantId: dto.restaurantId
    }
    return persist
  }

  static toDomain(entity: CategoryPrismaEntity): Category {
    const dto = new Category()
    dto.id = entity.id
    dto.name = entity.name
    dto.restaurant = {
      name: 'test'
    }
    return dto
  }
}
