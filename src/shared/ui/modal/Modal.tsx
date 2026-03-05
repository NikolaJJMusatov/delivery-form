import React from "react"

interface ModalProps {
  title?: string
  message: string
  onClose: () => void
  onConfirm?: () => void
}

export const Modal: React.FC<ModalProps> = ({ title, message, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
        {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
        <p className="mb-6 text-gray-600">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            onClick={onClose}
          >
            {onConfirm ? "Отмена" : "Закрыть"}
          </button>

          {onConfirm && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              onClick={onConfirm}
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
