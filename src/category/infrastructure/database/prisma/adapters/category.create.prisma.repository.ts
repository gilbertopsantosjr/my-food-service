/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryCreateRepository } from '@/category/application/ports/category.create.repository'
import { CategoryModel } from '@/category/model/category.model'
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

  async execute(category: CategoryModel): Promise<CategoryModel> {
    const toPersist = CategoryFactory.toCreate(category)
    return await this.prismaService.category.create({
      data: toPersist,
      include: {
        restaurants: true
      }
    })
  }
}
