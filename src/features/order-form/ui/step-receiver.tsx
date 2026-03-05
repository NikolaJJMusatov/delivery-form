import { useFormContext } from "react-hook-form"

import { FormField } from "@/shared/ui"

export function StepReceiver() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Данные получателя</h2>
      <FormField name="receiverName" label="Имя получателя" />
      <FormField name="receiverCity" label="Город назначения" />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Тип груза</label>
        <select
          {...register("cargoType")}
          className="px-3 py-2 border rounded-md border-gray-300"
        >
          <option value="documents">Документы</option>
          <option value="fragile">Хрупкое</option>
          <option value="regular">Обычное</option>
        </select>
      </div>

      <FormField name="weight" label="Вес (кг)" type="number" />
    </div>
  )
}
