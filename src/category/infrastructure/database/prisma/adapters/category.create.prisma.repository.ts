/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryCreateRepository } from '@/category/application/ports/category.create.repository'
import {
  CreateCategoryDto,
  ResponseCategoryDto
} from '@/category/model/category.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'
import { CategoryFactory } from '../factories/category.factory'

//Adapter
@Injectable()
export class CategoryCreatePrismaRepository
  implements CategoryCreateRepository
{
  private readonly logger = new Logger(CategoryCreatePrismaRepository.name)
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    category: CreateCategoryDto
  ): Promise<ResponseCategoryDto | null> {
    try {
      const toPersist = CategoryFactory.toCreate(category)
      const result = await this.prismaService.category.create({
        data: toPersist,
        include: {
          restaurants: true
        }
      })
      this.logger.log(`Category created: ${result.id}`)
      return result ? CategoryFactory.toModel(result) : null
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
