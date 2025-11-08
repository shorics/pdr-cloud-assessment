import { Global, Module } from '@nestjs/common';

import { dataProviders } from './data.providers';

@Global()
@Module({
  providers: [...dataProviders],
  exports: [...dataProviders],
})
export class DataModule {}
