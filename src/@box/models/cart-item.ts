import { StockItem } from './stock-item';
export class CartItem {
    public productId: string;
    public exclusiveItem: ExclusiveCartItem;    
    public quantity: number = 0;
}

export interface ICartItemWithProduct extends CartItem {
    productId: string;
    exclusiveItem: ExclusiveCartItem;
    totalCost: number;
}

export class ExclusiveCartItem {
    public id: string;
    public name: string;
    public unitPrice: number;
    public retailPrice: number;
    public gravatar: string;
}
