import React from "react"

interface ModalProps {
  title?: string
  message: string
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <p className="mb-6">{message}</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  )
}
