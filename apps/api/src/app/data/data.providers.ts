import path from 'path';

import { DataUsersService } from './data-users.service';
import { loadUsersFile, saveJsonFile } from './data-users.utils';

export const dataProviders = [
  {
    provide: DataUsersService,
    useFactory: async () => {
      const filePath = path.join(__dirname, 'data', 'users.json');
      const unparsablePath = path.join(__dirname, 'data', 'users-unparsable.json');

      const result = await loadUsersFile(filePath);

      await saveJsonFile(filePath, result.userList);
      await saveJsonFile(unparsablePath, result.unparsableList);

      return new DataUsersService(result.userList, filePath);
    },
  },
];
