"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { OrderFormData, orderSchema } from "@/shared/lib/validation"
import { Modal } from "@/shared/ui"

import { StepConfirm } from "./step-confirm"
import { StepReceiver } from "./step-receiver"
import { StepSender } from "./step-sender"
import { useRouter } from "next/navigation"

export function OrderForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    mode: "onChange",
    defaultValues: {
      senderName: "",
      senderPhone: "",
      senderCity: "",
      receiverName: "",
      receiverCity: "",
      cargoType: "regular",
      weight: 1, // Важно: число, а не строка
      agree: false,
    },
  })

  const stepFields = [
    ["senderName", "senderPhone", "senderCity"],
    ["receiverName", "receiverCity", "cargoType", "weight"],
    ["agree"],
  ] as const

  const { isSubmitting, errors } = methods.formState

  const currentStepHasErrors = stepFields[step].some(
    (field) => errors[field as keyof OrderFormData],
  )

  const next = async () => {
    const isValid = await methods.trigger(stepFields[step])
    if (isValid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: OrderFormData) => {
    await new Promise((r) => setTimeout(r, 500))
    try {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]")
      const order = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        status: "created",
      }
      localStorage.setItem("orders", JSON.stringify([order, ...orders]))
      methods.reset()
      router.push("/orders")
    } catch (e) {
      setError("Ошибка сохранения")
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
        <div className="flex gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded ${i <= step ? "bg-blue-500" : "bg-gray-200"}`}
            />
          ))}
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {step === 0 && <StepSender />}
          {step === 1 && <StepReceiver />}
          {step === 2 && <StepConfirm />}

          <div className="flex justify-between pt-4 border-t">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                disabled={isSubmitting}
                className="text-gray-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Назад
              </button>
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                disabled={isSubmitting || currentStepHasErrors}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Далее
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Сохранение..." : "Создать заказ"}
              </button>
            )}
          </div>
        </form>
      </div>

      {error && <Modal message={error} onClose={() => setError(null)} />}
    </FormProvider>
  )
}
