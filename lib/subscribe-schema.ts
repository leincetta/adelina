import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type SubscribeFieldErrors = Partial<Record<keyof SubscribeInput, string[]>>;
