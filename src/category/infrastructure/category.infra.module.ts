import { Module } from '@nestjs/common'
import { CategoryPrismaModule } from './database/prisma/category.prisma.module'

@Module({})
export class CategoryInfraModule {
  // how to create profiles for diff envs PROD, DEV, TEST
  static use(driver: 'DEV' | 'PROD' | 'TEST') {
    const module = {
      module: CategoryInfraModule
    }
    switch (driver) {
      case 'DEV':
        return {
          imports: [CategoryPrismaModule],
          exports: [CategoryPrismaModule],
          ...module
        }
      case 'TEST':
        return {
          imports: [CategoryPrismaModule],
          exports: [CategoryPrismaModule],
          ...module
        }
      case 'PROD':
        return {
          imports: [CategoryPrismaModule],
          exports: [CategoryPrismaModule],
          ...module
        }
    }
  }
}
