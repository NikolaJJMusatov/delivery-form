import { z } from "zod"

export const orderSchema = z
  .object({
    senderName: z.string().min(2, "Введите имя"),
    senderPhone: z
      .string()
      .min(1, "Введите номер телефона")
      .regex(
        /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
        "Введите номер полностью: +7 (XXX) XXX-XX-XX",
      ),
    senderCity: z.string().min(2, "Укажите город"),
    receiverName: z.string().min(2, "Укажите получателя"),
    receiverCity: z.string().min(2, "Укажите город"),
    cargoType: z.enum(["documents", "fragile", "regular"]),

    weight: z.coerce
      .number({ message: "Введите число" })
      .min(0.1, "Минимум 0.1 кг")
      .max(30, "Максимум 30 кг"),

    agree: z.boolean().refine((v) => v === true, "Нужно согласие"),
  })
  .refine((data) => data.senderCity !== data.receiverCity, {
    message: "Города не должны совпадать",
    path: ["receiverCity"],
  })

export type OrderFormInput = z.input<typeof orderSchema>
export type OrderFormData = z.output<typeof orderSchema>
