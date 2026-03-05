/* eslint-disable fsd/no-public-api-sidestep */
"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { Order } from "@/entities/order/model/types"
import { deleteOrder, getOrders } from "@/shared/lib/storage"
import { Modal, TrashIcon } from "@/shared/ui"

import { filterOrders } from "../model/filters"

export function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getOrders())
    setIsLoaded(true)
  }, [])

  const [search, setSearch] = useState("")
  const [cargoType, setCargoType] = useState("all")
  const [idToDelete, setIdToDelete] = useState<string | null>(null)

  const filteredOrders = useMemo(
    () => filterOrders(orders, { search, cargoType }),
    [orders, search, cargoType],
  )

  const confirmDelete = () => {
    if (idToDelete) {
      deleteOrder(idToDelete)
      setOrders(getOrders())
      setIdToDelete(null)
    }
  }
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">История заявок</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Новая заявка
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border">
        <input
          placeholder="Поиск по имени или городу..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
          value={cargoType}
          onChange={(e) => setCargoType(e.target.value)}
        >
          <option value="all">Все типы груза</option>
          <option value="regular">Обычное</option>
          <option value="fragile">Хрупкое</option>
          <option value="documents">Документы</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-xl p-5 hover:border-blue-300 transition-all relative group shadow-sm"
            >
              <Link href={`/orders/${order.id}`} className="block">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-medium text-gray-400">
                    {new Date(order.createdAt).toLocaleString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full font-bold uppercase tracking-wider">
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="text-lg font-bold text-gray-800">
                    {order.senderCity}
                  </div>
                  <div className="text-blue-400">→</div>
                  <div className="text-lg font-bold text-gray-800">
                    {order.receiverCity}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <p className="text-gray-500">Отправитель:</p>
                  <p className="font-medium text-gray-900">{order.senderName}</p>
                  <p className="text-gray-500">Получатель:</p>
                  <p className="font-medium text-gray-900">{order.receiverName}</p>
                  <p className="text-gray-500">Тип груза:</p>
                  <p className="font-medium text-gray-900">{order.cargoType}</p>
                </div>
              </Link>

              <button
                onClick={() => setIdToDelete(order.id)}
                className="absolute bottom-5 right-5 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <TrashIcon />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
            <p className="text-gray-400 text-lg">Заявки не найдены</p>
          </div>
        )}
      </div>

      {idToDelete && (
        <Modal
          title="Удаление заявки"
          message="Вы действительно хотите удалить эту запись из истории? Это действие необратимо."
          onClose={() => setIdToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  )
}
