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
