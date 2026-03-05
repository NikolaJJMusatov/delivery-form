// src/features/orders-list/model/filters.ts
import { OrderFormData } from "@/shared/lib/validation"

export interface Order extends OrderFormData {
  id: string
  createdAt: string
  status: string
}

export interface OrderFilters {
  search: string
  cargoType: string
}

export const filterOrders = (orders: Order[], filters: OrderFilters) => {
  return orders.filter((order) => {
    const matchesSearch =
      order.receiverName.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.receiverCity.toLowerCase().includes(filters.search.toLowerCase())

    const matchesType =
      filters.cargoType === "all" || order.cargoType === filters.cargoType

    return matchesSearch && matchesType
  })
}
