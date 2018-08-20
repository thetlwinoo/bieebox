import { StockItem } from './stock-item';
export class CartItem {
  public productId: string;
  public product: StockItem;
  public quantity: number = 0;
}

export interface ICartItemWithProduct extends CartItem {
  productId: string;
  product: StockItem;
  totalCost: number;
}
