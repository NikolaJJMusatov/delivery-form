export type CargoType = "documents" | "fragile" | "regular"

export type Order = {
  id: string

  senderName: string
  senderPhone: string
  senderCity: string

  receiverName: string
  receiverCity: string

  cargoType: CargoType
  weight: number

  createdAt: string

  status: "created"
}
