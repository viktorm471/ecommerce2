import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartQuantity:number=0;
  user!: User;
  constructor(
    cartService: CartService,
    private userService: UserService,
    ){
    cartService.getCartObservable().subscribe(data =>{
      this.cartQuantity = data.totalCount;
    })
    userService.userObservable.subscribe(data =>{
      this.user = data;
    })
  }

  logout(){
    this.userService.logout();
  }
}
