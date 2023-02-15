import { Schema, model, Types } from "mongoose";
import { OrderStatus } from "../constants/order_status";
import { Food, FoodSchema } from "./food.model";


 interface LatLgn{
    lat: string;
    lng:string;
}

export const LatLgnSchema = new Schema<LatLgn>({
    lat:{type: String, required: true},
    lng:{type: String, required: true},

})

export interface OrderItem{
    food:Food,
    price:number,
    quantity:number
}

export const OrderItemSchema = new Schema<OrderItem>({
    food:{type:FoodSchema, required:true},
    price:{type:Number, required:true},
    quantity:{type:Number, required:true}
})


export interface Order{
  id:string;
  items: OrderItem[];
  totalPrice: number;
  name:string;
  address:string;
  addressLatLng:LatLgn;
  paymentId:string;
  status:OrderStatus;
  user:Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema = new Schema<Order>({

  
  items: {type: [OrderItemSchema], required: true},
  totalPrice: {type: Number, required: true},
  name:{type: String, required: true},
  address:{type: String, required: true},
  addressLatLng:LatLgnSchema,
  paymentId: {type: String},
  status:{type: String, default: OrderStatus.NEW},
  user:{type: Schema.Types.ObjectId, required: true},
  
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
})

export const OrderModel= model('Order', OrderSchema);