import { z } from "zod"

export const orderSchema = z
  .object({
    senderName: z.string().min(2),
    senderPhone: z.string().min(10),
    senderCity: z.string().min(2),

    receiverName: z.string().min(2),
    receiverCity: z.string().min(2),

    cargoType: z.enum(["documents", "fragile", "regular"]),

    weight: z.number().min(0.1).max(30),

    agree: z.boolean().refine((v) => v === true, {
      message: "Необходимо согласие",
    }),
  })
  .refine((data) => data.senderCity !== data.receiverCity, {
    message: "Города должны отличаться",
    path: ["receiverCity"],
  })

export type OrderFormData = z.infer<typeof orderSchema>
