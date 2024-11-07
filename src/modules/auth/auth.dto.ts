import { z } from 'zod';

export type UserDto = {
  sub: string;
};

export const UserSchema = z.object({
  sub: z.string(),
});

export type UserAuthDTO = z.infer<typeof UserSchema>;

export const UserAuth0InfoSchema = z.object({
  sub: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  nickname: z.string(),
  name: z.string(),
  picture: z.string(),
  updated_at: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
});

export type UserAuth0InfoDTO = z.infer<typeof UserAuth0InfoSchema>;
