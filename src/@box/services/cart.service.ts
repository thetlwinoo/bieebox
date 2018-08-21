import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { DeliveryService } from "./delivery.service";
import { StockItem, CartItem,  ICartItemWithProduct, ExclusiveCartItem, ShoppingCart, DeliveryOption } from '@box/models';
import { environment } from 'environments/environment';

const CART_KEY = "cart";

@Injectable()
export class ShoppingCartService {

    private storage: Storage;
    private subscriptionObservable: Observable<ShoppingCart>;
    private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
    private products: StockItem[];
    private deliveryOptions: DeliveryOption[];

    public constructor(
        private storageService: StorageService,
        private deliveryOptionsService: DeliveryService,
    ) {
        this.storage = this.storageService.get();
        // this.deliveryOptionsService.getDeliveryOptions({ $limit: 10 }).then(deliveryOptions => this.deliveryOptions = deliveryOptions);
        // this.deliveryOptionsService.all('').subscribe((options) => this.deliveryOptions = options);

        this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
            this.subscribers.push(observer);
            observer.next(this.retrieve());
            return () => {
                this.subscribers = this.subscribers.filter((obs) => obs !== observer);
            };
        });
    }

    public get(): Observable<ShoppingCart> {
        return this.subscriptionObservable;
    }

    public addItem(exclusiveItem: ExclusiveCartItem, quantity: number, flat: boolean = false): Observable<ExclusiveCartItem> {
        const cart = this.retrieve();
        let item = cart.items.find((p) => p.productId === exclusiveItem.id);

        if (item === undefined) {
            item = new CartItem();
            item.productId = exclusiveItem.id;
            item.exclusiveItem = exclusiveItem;            
            cart.items.push(item);
        }

        if (flat) { item.quantity = +quantity; }
        else { item.quantity += quantity; }

        cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
        if (cart.items.length === 0) {
            cart.deliveryOptionId = undefined;            
        }

        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);

        return Observable.of(exclusiveItem);
    }

    public empty(): Observable<boolean> {
        const newCart = new ShoppingCart();
        this.save(newCart);
        this.dispatch(newCart);

        return Observable.of(true);
    }

    public getDeliveryOption(): Observable<DeliveryOption[]> {
        return Observable.of(this.deliveryOptions);
    }
    public setDeliveryOption(deliveryOption: DeliveryOption): Observable<boolean> {
        const cart = this.retrieve();
        cart.deliveryOptionId = deliveryOption.id;
        this.calculateCart(cart);
        this.save(cart);
        this.dispatch(cart);

        return Observable.of(true);
    }

    private calculateCart(cart: ShoppingCart): void {
        cart.itemsTotal = cart.items
            .map((item) => item.quantity * (item.exclusiveItem ? item.exclusiveItem.retailPrice : 0))
            .reduce((previous, current) => previous + current, 0);
        cart.deliveryTotal = cart.deliveryOptionId ? this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price : 0;
        cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
    }

    private retrieve(): ShoppingCart {
        const cart = new ShoppingCart();
        const storedCart = this.storage.getItem(CART_KEY);
        if (storedCart) {
            cart.updateFrom(JSON.parse(storedCart));
        }

        cart.cartString = storedCart;

        return cart;
    }

    private save(cart: ShoppingCart): void {
        try{
            this.storage.setItem(CART_KEY, JSON.stringify(cart));
        }
        catch(err){
            alert("cart exceeded the quota");
            this.empty();
        }
    }

    private dispatch(cart: ShoppingCart): void {
        this.subscribers
            .forEach((sub) => {
                try {
                    sub.next(cart);
                } catch (e) {
                    // we want all subscribers to get the update even if one errors.
                }
            });
    }   
}
