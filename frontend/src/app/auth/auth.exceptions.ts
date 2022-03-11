export class UserDoesntExistException extends Error {
  constructor(nickname: string) {
    super(`User ${nickname} doesn't exist`);
  }
}

export class WrongPasswordException extends Error {
  constructor() {
    super("Wrong password");
  }
}

export class UserAlreadyExistsException extends Error {
  constructor(nickname: string) {
    super(`User ${nickname} already exists`);
  }
}

export class UnauthenticatedException extends Error {
  constructor() {
    super("Unauthenticated");
  }
}
