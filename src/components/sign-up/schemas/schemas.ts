import { z } from "zod";

const companyRegistrationSchema = z.object({
    name: z.string().min(2).max(50),
    address: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    region: z.string().min(2).max(50),
    phoneNumber: z.string().min(2).max(50),
    postalCode: z.string().min(2).max(50),
    registrationNumber: z.string().min(2).max(50),
  });

  export const lenderRegistrationSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    role: z.string().min(2).max(50),
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
  })