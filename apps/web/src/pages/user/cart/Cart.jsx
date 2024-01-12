import { useEffect, useState } from "react";
import CartPayment from "../../../components/cartPayment";
import CartProductCard from "../../../components/cartProductCard";
import Layout from "../layout/layout";
import axios from "axios";


const CartPage = () => {
  const [cartProduct,setCartProduct] = useState([]) 
  const getDataCart =async()=>{
    try {
      const result = await axios.get("http://localhost:8000/cart/",{ headers: { Authorization: `Bearer ${token}`}})
      return setCartProduct(result.data.rows)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getDataCart()
  },[cartProduct])
  console.log("ini adalah product",cartProduct);
  return (
    <Layout>
      <div className='text-center mt-4 mb-3 md:mb-8'>
        <p className='text-4xl'>Cart</p>
        <p>home / cart</p>
      </div>
      <div className="flex flex-col gap-y-5 md:flex-row md:justify-center md:gap-3 ">
        <div className="shadow-sm md:border-[1px] h-fit rounded-md">
        {cartProduct.map((val,id)=>{
          return <CartProductCard key={id
          }
          productName = {val.name}
          qty = {val.quantity}
          productPrice = {val.products.price}
          productFinalPrice = {val.total_price}
          />
        })}
        
        </div>
        <div className="shadow-sm md:w-[320px] md:border-[1px] rounded-md pb-2 mb-4">
          <CartPayment/>
        </div>
      </div>

    </Layout>
  );
};

export default CartPage;
