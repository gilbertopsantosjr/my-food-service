import { Module } from '@nestjs/common'
import { ApplicationBoostrapOptions } from './interfaces/application-boostrap-options'

@Module({
  providers: [],
  exports: []
})
export class CoreModule {
  static forRoot(options: ApplicationBoostrapOptions) {
    const imports = options.driver === 'prisma' ? [] : []
    return {
      module: CoreModule,
      imports
    }
  }
}
