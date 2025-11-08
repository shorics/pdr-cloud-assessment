import { User, UserSchema } from '@pdr-cloud-assessment/shared';
import { readFile, writeFile } from 'fs/promises';

interface LoadResult {
  userList: User[],
  unparsableList: unknown[],
}

export const loadUsersFile = async (file: string): Promise<LoadResult> => {
  return readFile(file).then((buffer) => {
      const data = buffer.toString();
      const json = JSON.parse(data);

      if (!Array.isArray(json)) {
        throw Error('Source is not a JSON array');
      }

      const userList: User[] = [];
      const unparsableList: unknown[] = [];

      for (const item of json) {
        const result = UserSchema.safeParse(item);

        if (result.success) {
          const user = result.data;
          userList.push(user);
        } else {
          unparsableList.push(item);
        }
      }

      return {
        userList,
        unparsableList,
      }
  });
};

export const saveJsonFile = async (file: string, data: unknown): Promise<void> => {
  const json = JSON.stringify(data);

  return writeFile(file, json);
};
