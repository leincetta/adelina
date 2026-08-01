import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  eventDate: z.string().trim().min(1, "Event date is required"),
  headcount: z.coerce
    .number({ message: "Enter a headcount" })
    .int()
    .positive("Enter a headcount")
    .max(10000, "That's a big party — email us directly"),
  selectedFlavors: z.array(z.string().trim().min(1)).max(20).default([]),
  customFlavorRequest: z.string().trim().max(500).optional().or(z.literal("")),
  dietaryRestrictions: z.string().trim().max(2000).optional().or(z.literal("")),
  notes: z.string().trim().max(4000).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
export type BookingFieldErrors = Partial<Record<keyof BookingInput, string[]>>;
