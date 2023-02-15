import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ORDERS_CREATE_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient, private toastrService: ToastrService ) { }

  createOrder( order:Order):Observable<Order>{
   return  this.http.post<Order>(ORDERS_CREATE_URL,order).pipe(
    tap({
      next: order => {

        this.toastrService.success(
          "Thanks "+ order.name,
          "Order Created"

        )

      },
      error: err => {
        this.toastrService.error("unauthorized", "login failed");
      }
    })
   );
  }
}
