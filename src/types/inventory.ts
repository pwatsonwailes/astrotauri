export interface InventoryItem {
  commodityId: string;
  amount: number;
  purchasePrice: number; // Average price paid
}

export interface PlayerInventory {
  items: InventoryItem[];
  maxCapacity: number;
}