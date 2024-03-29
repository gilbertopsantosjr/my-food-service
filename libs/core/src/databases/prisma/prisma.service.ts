import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(config: ConfigService) {
    const dbConfig = {
      datasources: {
        db: {
          url: config.get('DATABASE_URL')
        }
      }
    }
    const logConfig = {
      log: [
        {
          emit: 'event',
          level: 'query'
        },
        {
          emit: 'event',
          level: 'error'
        }
      ]
    }
    const initialConfig: any =
      process.env.NODE_ENV === 'production'
        ? { ...dbConfig }
        : { ...dbConfig, ...logConfig }

    super(initialConfig)
  }

  async onModuleInit() {
    await this.$connect()
  }
}
