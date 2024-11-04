import { GraphQLError } from 'graphql/error';

export abstract class CarException extends Error {
  protected constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }
}

export const carNotFoundError = (message: string): GraphQLError => {
  return new GraphQLError('Error on cars request', {
    extensions: {
      code: 'CAR_NOT_FOUND',
      message,
    },
  });
};
