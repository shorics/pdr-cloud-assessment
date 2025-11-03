import { Module } from '@nestjs/common';
import { DataUsersService } from './data-users.service';

@Module({
  providers: [DataUsersService],
})
export class DataModule {}
