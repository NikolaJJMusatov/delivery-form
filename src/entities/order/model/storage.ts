import { Order } from "./types"

const KEY = "orders"

export const getOrders = (): Order[] => {
  if (typeof window === "undefined") return []

  const data = localStorage.getItem(KEY)

  return data ? JSON.parse(data) : []
}

export const saveOrder = (order: Order) => {
  const orders = getOrders()

  localStorage.setItem(KEY, JSON.stringify([order, ...orders]))
}

export const deleteOrder = (id: string) => {
  const orders = getOrders().filter((o) => o.id !== id)

  localStorage.setItem(KEY, JSON.stringify(orders))
}
