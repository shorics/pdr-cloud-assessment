import { UserSchema as _UserSchema } from '@pdr-cloud-assessment/shared';
import { readFile as _readFile, writeFile as _writeFile } from 'fs/promises';
import { Volume } from 'memfs';

import { loadUsersFile, saveJsonFile } from './data-users.utils';

jest.mock('@pdr-cloud-assessment/shared', () => ({
  UserSchema:{
    safeParse: jest.fn(),
  },
}));

const UserSchemaSafeParseMock = _UserSchema.safeParse as unknown as jest.Mock;

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
}));

const readFileMock = _readFile as unknown as jest.Mock;
const writeFileMock = _writeFile as unknown as jest.Mock;

describe('data users utils', () => {
  let fs: Volume;

  beforeEach(() => {
    fs = Volume.fromJSON({
      '/fake-source': `["fake-user-1", "fake-user-2"]`,
    });

    readFileMock.mockImplementation((file: string) => Promise.resolve(fs.readFileSync(file)));
    writeFileMock.mockImplementation((file: string, data: string) => Promise.resolve(fs.writeFileSync(file, data)));
    UserSchemaSafeParseMock
      .mockReturnValueOnce({
        success: true,
        data: 'fake-user-parsed',
      })
      .mockReturnValueOnce({ success: false });
  });

  afterEach(() => {
    UserSchemaSafeParseMock.mockClear();
    readFileMock.mockClear();
    writeFileMock.mockClear();
  });

  describe('loadUsersFile', () => {
    it('should read JSON file', async () => {

      const result = await loadUsersFile('/fake-source');

      expect(result.userList).toEqual(['fake-user-parsed']);
      expect(result.unparsableList).toEqual(['fake-user-2']);

      expect(UserSchemaSafeParseMock).toHaveBeenCalledTimes(2);
      expect(UserSchemaSafeParseMock).toHaveBeenNthCalledWith(1, 'fake-user-1');
      expect(UserSchemaSafeParseMock).toHaveBeenNthCalledWith(2, 'fake-user-2');
    });
  });

  describe('saveJsonFile', () => {
    const jsonStringify = JSON.stringify;

    beforeEach(() => {
      JSON.stringify = jest.fn().mockReturnValue('fake-json');
    });

    afterEach(() => {
      JSON.stringify = jsonStringify;
    });

    it('should write JSON file', async () => {

      await saveJsonFile('/fake-path', { fake: 'data' });

      expect(JSON.stringify).toHaveBeenCalledTimes(1);
      expect(JSON.stringify).toHaveBeenCalledWith({ fake: 'data' });
      expect(fs.toJSON()).toEqual(expect.objectContaining({ '/fake-path': 'fake-json' }));
    });
  });
});
