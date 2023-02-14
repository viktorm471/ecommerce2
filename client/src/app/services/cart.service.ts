
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // when you need to oberserve your user without modifying outside
  // declare a usersubjetct as observable (it's the same like the getter in foodservices)
  // to get the object of the obeservable you need to subscribe to the observable
  // this allows you to get a state in whole application, and react when the observable changes
  // (like redux) finally you need to save the state in the local storage or cookies
  private cart: Cart = this.getCartToLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)

  constructor() { }

  addToCart(food:Food): void {
  let cartItem= this.cart.items.find(item => item.food.id === food.id);
  if (cartItem) return;

     this.cart.items.push( new CartItem(food));

  this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);

    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number): void {
    let newItem = this.cart.items.find(item => item.food.id === foodId);
    if(!newItem) return;

    newItem.quantity = quantity;
    newItem.price = quantity * newItem.food.price

    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();

    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
  getCart():Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage():void{

    this.cart.totalPrice= this.cart.items
    .reduce((prev, currentItem)=> prev+currentItem.price, 0)
    this.cart.totalCount= this.cart.items
    .reduce((prev, currentItem)=> prev+currentItem.quantity, 0)

    const cartJson= JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    this.cartSubject.next(this.cart);
  }

  private getCartToLocalStorage(): Cart{
    const cartJson= localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
