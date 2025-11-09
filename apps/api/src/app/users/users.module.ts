import { Module } from '@nestjs/common';

import { DataModule } from '../data/data.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DataModule],
})
export class UsersModule {}
