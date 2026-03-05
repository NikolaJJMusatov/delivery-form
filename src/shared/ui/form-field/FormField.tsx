import { useFormContext } from "react-hook-form"

interface FormFieldProps {
  name: string
  label: string
  type?: string
  placeholder?: string
}

export const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]?.message as string | undefined

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...register(name, { valueAsNumber: type === "number" })}
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 border rounded-md transition-colors
          ${error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"}
          outline-none focus:ring-4`}
      />
      {error && <span className="text-xs text-red-500 italic">{error}</span>}
    </div>
  )
}
