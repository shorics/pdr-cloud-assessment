
import { DataUsersService } from './data-users.service';
import { loadUsersFile } from './data-users.utils';
import { USERS_FILE_PATH } from './data.constants';

export const dataProviders = [
  {
    provide: DataUsersService,
    useFactory: async () => {
      const result = await loadUsersFile(USERS_FILE_PATH);

      return new DataUsersService(result.userList, USERS_FILE_PATH);
    },
  },
];
