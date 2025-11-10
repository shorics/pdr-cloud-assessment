import path from 'path';

import { Logger } from '@nestjs/common';
import { DataUsersService } from './data-users.service';
import { loadUsersFile, saveJsonFile } from './data-users.utils';

export const dataProviders = [
  {
    provide: DataUsersService,
    useFactory: async () => {
      const filePath = path.join(__dirname, 'data', 'users.json');
      const unparsablePath = path.join(__dirname, 'data', 'users-unparsable.json');

      const result = await loadUsersFile(filePath);

      if (result.unparsableList.length) {
        await saveJsonFile(unparsablePath, result.unparsableList);

        Logger.warn(`Found ${result.unparsableList.length} unparsable users. Saved to ${unparsablePath}`);
      }

      await saveJsonFile(filePath, result.userList);

      return new DataUsersService(result.userList, filePath);
    },
  },
];
