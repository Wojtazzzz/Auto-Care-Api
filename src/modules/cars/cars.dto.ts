import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
@InputType()
export class GetCarDetailsRequest {
  @Field(() => Int)
  carId: number;
}

@ObjectType()
export class Car {
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class GetCarDetailsResponse {
  constructor(car: Car) {
    this.car = car;
  }

  @Field(() => Car)
  car: Car;
}
