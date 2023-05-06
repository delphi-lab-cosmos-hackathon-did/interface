export interface Spirit {
  attributes: Attribute[]
  statistics: Statistics
}

export interface Attribute {
  items: Item[]
  type: string
}

export interface Item {
  attribute: string
  description: string
  type: string
}

export interface Statistics {
  first_active_height: number
  first_active_timestamp: string
  last_active_height: number
  last_active_timestamp: string
  success_count: number
}
