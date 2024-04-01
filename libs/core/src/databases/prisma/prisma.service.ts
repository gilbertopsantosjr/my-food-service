import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { createPrismaQueryEventHandler } from 'prisma-query-log'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name)

  constructor(private config: ConfigService) {
    const dbConfig = {
      datasources: {
        db: {
          url: config.get('DATABASE_URL')
        }
      }
    }
    const logConfig = {
      errorFormat: 'pretty',
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' }
      ]
    }
    const initialConfig: any =
      process.env.ENVIRONMENT === 'production'
        ? { ...dbConfig }
        : { ...dbConfig, ...logConfig }

    super(initialConfig)
  }

  async onModuleInit() {
    await this.$connect()
    const showQuery = this.config.get<string>('SHOW_QUERY_LOG') === 'true'
    if (!showQuery) return

    const log = createPrismaQueryEventHandler({
      format: true,
      queryDuration: true,
      logger: (q) => {
        this.logger.debug(q)
      }
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', log)
  }

  async enableShutdownHooks(app: INestApplication) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
