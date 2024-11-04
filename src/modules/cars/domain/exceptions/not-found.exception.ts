import { CarException } from './car.exception';

export class NotFoundException extends CarException {
  constructor() {
    super('Not found', 404);
  }
}
