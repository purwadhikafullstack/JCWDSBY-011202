import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    order_id:"",
    invoice:"",
    orderDate:"",
    status:"",
}
const statusSlice = createSlice({
    name:"statusInfo",
    initialState,
    reducers:{
        updateStatus:(state,action)=>{
            state.order_id = action.payload.order_id,
            state.invoice = action.payload.invoice,
            state.status = action.payload.status,
            state.orderDate = action.payload.orderDate
            
        }
    }
})
export const {updateStatus}=statusSlice.actions
export default statusSlice.reducer