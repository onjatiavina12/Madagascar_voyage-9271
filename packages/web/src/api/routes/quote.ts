import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import { quoteRequests } from "../database/schema";

export const quoteSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  organization: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  tripType: z.string().trim().min(1).max(60),
  destination: z.string().trim().max(120).optional().default(""),
  participants: z.number().int().min(1).max(5000).optional(),
  travelDate: z.string().trim().max(20).optional().default(""),
  duration: z.string().trim().max(60).optional().default(""),
  budget: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(10).max(4000),
  locale: z.enum(["fr", "en"]).default("fr"),
});

export const quote = {
  submit: base.input(quoteSchema).handler(async ({ input }) => {
    const [row] = await db
      .insert(quoteRequests)
      .values({
        ...input,
        participants: input.participants ?? null,
        destination: input.destination || null,
        organization: input.organization || null,
        travelDate: input.travelDate || null,
        duration: input.duration || null,
        budget: input.budget || null,
      })
      .returning({ id: quoteRequests.id });
    return { ok: true as const, id: row.id };
  }),
};
