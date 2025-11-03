import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [UsersModule, DataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
