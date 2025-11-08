export class BaseException extends Error {
  readonly name = BaseException.name;
};

export class EntityNotFoundException extends BaseException {
  readonly id: string | number;
  readonly name = EntityNotFoundException.name;

  constructor(id: string | number) {
    super(`Entity "${id}" not found`);

    this.id = id;
  }
};

export class JsonParseInvalidException extends BaseException {
  readonly file: string;
  readonly name = JsonParseInvalidException.name;

  constructor(file: string) {
    super(`File "${file}" is not valid JSON`);

    this.file = file;
  }
};

export class JsonParseNotAnArrayException extends BaseException {
  readonly file: string;
  readonly name = JsonParseNotAnArrayException.name;

  constructor(file: string) {
    super(`File "${file}" does not contain a JSON array`);

    this.file = file;
  }
};
