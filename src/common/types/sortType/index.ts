type OrderType = 'desc' | 'asc';

export type SortType = {
  sortProperty: string,
  name: string,
  order: OrderType
};