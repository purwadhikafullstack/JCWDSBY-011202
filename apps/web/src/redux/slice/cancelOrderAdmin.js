import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    order_id:"",
    invoice:"",
    orderDate:"",
    status:"",
}
const cancelOrderSlice = createSlice({
    name:"cancelOrderAdmin",
    initialState,
    reducers:{
        cancelOrder:(state,action)=>{
            state.order_id = action.payload.order_id,
            state.invoice = action.payload.invoice,
            state.status = action.payload.status,
            state.orderDate = action.payload.orderDate
            
        }
    }
})
export const {cancelOrder}=cancelOrderSlice.actions
export default cancelOrderSlice.reducer