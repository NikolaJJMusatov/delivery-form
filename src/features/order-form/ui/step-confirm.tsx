import { useFormContext } from "react-hook-form"

import { OrderFormData } from "@/shared/lib/validation"

export function StepConfirm() {
  const {
    getValues,
    register,
    formState: { errors, isSubmitted },
  } = useFormContext<OrderFormData>()

  const values = getValues()

  return (
    <div className="space-y-4">
      <div className="border p-4 rounded">
        <p>
          {values.senderCity} → {values.receiverCity}
        </p>

        <p>Получатель: {values.receiverName}</p>

        <p>Тип груза: {values.cargoType}</p>

        <p>Вес: {values.weight} кг</p>
      </div>

      <label className="flex gap-2">
        <input type="checkbox" {...register("agree")} />
        Согласен с условиями
      </label>

      {isSubmitted && errors.agree && (
        <p className="text-xs text-red-500 italic">{errors.agree.message}</p>
      )}
    </div>
  )
}
