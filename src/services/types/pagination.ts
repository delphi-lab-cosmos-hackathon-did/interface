export interface IPaginationMeta<T> {
    items: T[]
    meta: IMeta
}
  
export interface IMeta {
    itemCount: number
    totalItems?: number
    itemsPerPage: number
    totalPages?: number
    currentPage: number
}