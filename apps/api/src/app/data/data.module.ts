import { Module } from '@nestjs/common';

import { dataProviders } from './data.providers';

@Module({
  providers: [...dataProviders],
  exports: [...dataProviders],
})
export class DataModule {}
