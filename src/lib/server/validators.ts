import z from "zod";

export default {
  userEmail: z.email().max(60),
  userPassword: z.string().min(6).max(255),
  userDisplayName: z.string().min(1).max(60),
  userName: z
    .string()
    .regex(/^[a-z0-9_-]+/g)
    .min(3)
    .max(20),

  inviteCode: z
    .string()
    .regex(/^[A-Z0-9]{6}-[A-Z0-9]{6}/)
    .min(13)
    .max(13)
};
