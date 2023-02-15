import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order: Order= new Order;
  checkOutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private userService: UserService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private orderService: OrdersService,
    private router: Router,
    ) {
    const cart = cartService.getCart()
    this.order.items= cart.items;
    this.order.totalPrice= cart.totalPrice;

}

ngOnInit():void{
  let {name,address}= this.userService.currentUser;
  this.checkOutForm= this.formBuilder.group({
    name: [name, Validators.required],
    address:[address, Validators.required]
  })

}
get fc(){
  return this.checkOutForm.controls
}

createOrder(){

  if(this.checkOutForm.invalid){
    this.toastrService.warning("Please fill out the inputs","Invalid Order")
    return;
  }

  if(!this.order.addressLatLng){
    this.toastrService.warning("Please select your location on the map","Valid Address")
    return;
  }
  this.order.name= this.fc['name'].value;
  this.order.address= this.fc['address'].value;

  this.orderService.createOrder(this.order).subscribe({
    next:(user)=>{
      this.router.navigate(['/payment']);
      console.log(user);
    },
    error:(error)=>{
      this.toastrService.error(error, "cart")
    }

   })
}
}
