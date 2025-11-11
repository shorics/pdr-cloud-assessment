import { Logger, Module, OnModuleInit } from '@nestjs/common';

import { loadUsersFile, saveJsonFile } from './data-users.utils';
import { USERS_FILE_PATH, USERS_UNPARSABLE_FILE_PATH } from './data.constants';
import { dataProviders } from './data.providers';

@Module({
  providers: [...dataProviders],
  exports: [...dataProviders],
})
export class DataModule implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    const result = await loadUsersFile(USERS_FILE_PATH);

    if (result.unparsableList.length) {
      await saveJsonFile(USERS_UNPARSABLE_FILE_PATH, result.unparsableList);

      Logger.warn(`Found ${result.unparsableList.length} unparsable users. Saved to ${USERS_UNPARSABLE_FILE_PATH}`);
    }

    await saveJsonFile(USERS_FILE_PATH, result.userList);
  }
}
