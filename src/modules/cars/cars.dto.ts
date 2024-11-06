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

@ObjectType()
export class Service {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  createdAt: string;
}

@ArgsType()
@InputType()
export class GetCarServicesRequest {
  @Field(() => Int, { nullable: true })
  carId?: number;

  @Field(() => Int, { nullable: true })
  limit?: number;
}

@ObjectType()
export class GetCarServicesResponse {
  constructor(services: Service[]) {
    this.services = services;
  }

  @Field(() => [Service])
  services: Service[];
}
