import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarsRepository } from '../repositories/cars.repository';

export class CreateCarCommand {
  constructor(
    public readonly name: string,
    public readonly vin: string,
    public readonly userSub: string,
  ) {}
}

@CommandHandler(CreateCarCommand)
export class CreateCarHandler implements ICommandHandler {
  constructor(private readonly cars: CarsRepository) {}

  async execute(command: CreateCarCommand) {
    return this.cars.create({
      name: command.name,
      vin: command.vin,
      userSub: command.userSub,
    });
  }
}
