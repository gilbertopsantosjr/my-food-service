/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryUpdateRepository } from '@/category/application/ports/category.update.repository'
import {
  ResponseCategoryDto,
  UpdateCategoryDto
} from '@/category/model/category.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { CategoryFactory } from '../factories/category.factory'

//Adapter
@Injectable()
export class CategoryUpdatePrismaRepository
  implements CategoryUpdateRepository
{
  private readonly logger = new Logger(CategoryUpdatePrismaRepository.name)
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    category: UpdateCategoryDto
  ): Promise<ResponseCategoryDto | null> {
    try {
      const toPersist = CategoryFactory.toCreate(category)
      const result = await this.prismaService.category.update({
        data: toPersist,
        include: {
          restaurants: true
        },
        where: {
          id: category.id
        }
      })
      this.logger.log(`Category updated: ${result.id}`)
      return result ? CategoryFactory.toModel(result) : null
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
