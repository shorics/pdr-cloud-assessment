import { Global, Module } from '@nestjs/common';

import { DataUsersService } from './data-users.service';

@Global()
@Module({
  providers: [DataUsersService],
  exports: [DataUsersService],
})
export class DataModule {}
