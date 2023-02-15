import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from "../constants/htttp_status";
import { OrderStatus } from "../constants/order_status";
import { OrderModel } from "../models/Order.model";

const router =  Router();

router.post('/create', asyncHandler(
    async (req:any, res:any) => {
        const requestOrder = req.body;
        const userId = req.user.id;
        if(requestOrder.items.length <= 0) {
            res.status(HTTP_BAD_REQUEST).send("Cart is Empty");
            return;
        }

        await OrderModel.deleteOne({
            user: userId,
            status: OrderStatus.NEW
        })

        const order = new OrderModel({...requestOrder, user: userId});
        await order.save()
        res.send(order);
    }
))

export default router;