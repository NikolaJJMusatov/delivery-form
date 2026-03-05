import { FormField, PhoneInput } from "@/shared/ui"

export function StepSender() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Данные отправителя</h2>
      <FormField name="senderName" label="Имя отправителя" placeholder="Иван Иванов" />
      <PhoneInput name="senderPhone" label="Телефон" />
      <FormField name="senderCity" label="Город отправления" placeholder="Москва" />
    </div>
  )
}
