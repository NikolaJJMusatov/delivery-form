// eslint-disable-next-line fsd/no-public-api-sidestep
import { Order } from "@/entities/order/model/types"

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
