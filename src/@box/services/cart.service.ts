import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { DeliveryService } from "./delivery.service";
import { StockItem, CartItem, ICartItemWithProduct, ShoppingCart, DeliveryOption } from '@box/models';
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
        private deliveryOptionsService: DeliveryService
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

    public addItem(product: StockItem, quantity: number, flat: boolean = false): Observable<StockItem> {
        console.log('cart product',product)
        const cart = this.retrieve();
        let item = cart.items.find((p) => p.productId === product.id);

        if (item === undefined) {
            item = new CartItem();
            item.productId = product.id;
            item.product = product;
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

        return Observable.of(product);
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
            .map((item) => item.quantity * (item.product ? item.product.recommendedRetailPrice : 0))
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
        this.storage.setItem(CART_KEY, JSON.stringify(cart));
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
