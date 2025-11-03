import { Test, TestingModule } from '@nestjs/testing';
import { DataUsersService } from './data-users.service';

describe('DataUsersService', () => {
  let service: DataUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataUsersService],
    }).compile();

    service = module.get<DataUsersService>(DataUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
