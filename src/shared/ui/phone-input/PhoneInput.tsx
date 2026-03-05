import { Controller, useFormContext } from "react-hook-form"
import { PatternFormat } from "react-number-format"

export function PhoneInput({ name, label }: { name: string; label: string }) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]?.message as string

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, name, value } }) => (
          <PatternFormat
            format="+7 (###) ###-##-##"
            mask="_"
            value={value}
            name={name}
            onValueChange={(values) => {
              onChange(values.formattedValue)
            }}
            placeholder="+7 (___) ___-__-__"
            className={`px-4 py-2 border rounded-lg outline-none transition-all
              ${error ? "border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}`}
          />
        )}
      />
      {error && <span className="text-xs text-red-500 italic">{error}</span>}
    </div>
  )
}
