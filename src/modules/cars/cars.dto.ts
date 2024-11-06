import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
@InputType()
export class GetUserCarsRequest {
  @Field(() => Int, { nullable: true })
  limit?: number;
}

@ObjectType()
export class Car {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  vin: string;

  @Field(() => Int)
  weight: number;

  @Field(() => [Insurance])
  Insurance: Insurance[];

  @Field(() => [PeriodicService])
  PeriodicService: PeriodicService[];
}

@ObjectType()
export class Insurance {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  expiredAt: string;
}

@ObjectType()
export class PeriodicService {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  expiredAt: string;
}

@ObjectType()
export class GetUserCarsResponse {
  constructor(cars: Car[]) {
    this.cars = cars;
  }

  @Field(() => [Car])
  cars: Car[];
}
