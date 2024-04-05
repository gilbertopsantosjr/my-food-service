/* eslint-disable @typescript-eslint/no-unused-vars */
import { CategoryDeleteRepository } from '@/category/application/ports/category.delete.repository'
import { PrismaService } from '@core/databases/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'

//Adapter
@Injectable()
export class CategoryDeletePrismaRepository
  implements CategoryDeleteRepository
{
  private readonly logger = new Logger(CategoryDeletePrismaRepository.name)
  constructor(private readonly prismaService: PrismaService) {}

  async execute(categoryId: number): Promise<boolean> {
    try {
      const result = await this.prismaService.category.delete({
        where: {
          id: categoryId
        }
      })
      this.logger.log(`Category deleted:`, result)
      return result ? true : false
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
