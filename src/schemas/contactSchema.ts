// src/schemas/contactSchema.ts
import { z } from 'zod';

export const contactSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    photo: z.string().url("Must be a valid URL"),
    description: z.string().optional(), // Optional field
});

// Define Contact type from schema
export type Contact = z.infer<typeof contactSchema>;
