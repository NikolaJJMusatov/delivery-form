/* eslint-disable fsd/no-public-api-sidestep */
"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

import { Order } from "@/entities/order/model/types"
import { getOrderById } from "@/shared/lib/storage"

export default function OrderDetailsPage() {
  const params = useParams()
  const id = typeof params?.id === "string" ? params.id : null

  const [data] = useState<Order | null>(() => (id ? getOrderById(id) || null : null))

  if (!id || data === undefined) {
    return <div className="p-8 text-center animate-pulse">Загрузка данных...</div>
  }

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto p-10 text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Заказ не найден</h1>
        <Link href="/orders" className="text-blue-500 hover:underline">
          ← Вернуться к списку
        </Link>
      </div>
    )
  }

  return (
    <main className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between">
        <Link
          href="/orders"
          className="text-sm text-gray-500 hover:text-blue-600 mb-6 flex gap-2 transition-colors"
        >
          <span>←</span> Назад к списку
        </Link>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg mb-6 hover:bg-blue-700 transition-colors"
        >
          + Новая заявка
        </Link>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gray-50 p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">
            Заявка #{data.id.slice(0, 8)}
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase font-mono">{data.id}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Отправитель</p>
              <p className="text-lg">{data.senderName}</p>
              <p className="text-sm text-gray-600">{data.senderCity}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase font-bold">Получатель</p>
              <p className="text-lg">{data.receiverName}</p>
              <p className="text-sm text-gray-600">{data.receiverCity}</p>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-between">
            <span className="text-gray-500 text-sm italic">Вес: {data.weight} кг</span>
            <span className="font-bold text-blue-600">{data.cargoType}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
