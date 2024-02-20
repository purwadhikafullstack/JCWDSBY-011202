import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    address:"",
    city:"",
    province:"",
    warehouse_id:"",
    recepient:"",
    order_id:"",
    invoice:"",
    total_price:"",
    total_weight:"",
    shipping_type:"",
    shipping_cost:"",
    orderDate:"",
    status:"",
    data:[]
}
const orderSlice = createSlice({
    name:"dataOrder",
    initialState,
    reducers:{
        updateItem:(state,action)=>{
            state.address = action.payload.address,
            state.city = action.payload.city,
            state.province = action.payload.province,
            state.warehouse_id = action.payload.warehouse_id,
            state.recepient = action.payload.recepient,
            state.order_id = action.payload.order_id,
            state.invoice = action.payload.invoice,
            state.total_price = action.payload.total_price,
            state.total_weight = action.payload.total_weight,
            state.shipping_type = action.payload.shipping_type
            state.shipping_cost = action.payload.shipping_cost,
            state.orderDate = action.payload.orderDate,
            state.data = action.payload.data
            state.status = action.payload.status
        }
    }
})

export const{updateItem} = orderSlice.actions
export default orderSlice.reducer