/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryCreateRepository } from '@/category/application/ports/category.create.repository'
import { CategoryModel } from '@/category/model/category.model'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Category } from '@prisma/client'
import { CategoryFactory } from '../factories/category.factory'

//Adapter
@Injectable()
export class CategoryCreatePrismaRepository
  implements CategoryCreateRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(category: CategoryModel): Promise<Category> {
    const toPersist = CategoryFactory.toPersist(category)
    return await this.prismaService.category.create({
      data: toPersist
    })
  }
}
