import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoIosHeartEmpty } from 'react-icons/io';
import { CiTrash } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import { useState } from 'react';
const ProductCheckoutCard = (props) => {

  return (
    <>    
      <div className="px-2 py-4 pt-6 border-b-[1px] flex flex-col gap-y-3 md:w-[500px] lg:w-[600px]">
        <div className="flex w-full justify-between">
          {/* untuk gambar dan informasi product */}
          <div className="flex gap-2">
            <div className=" flex justify-center items-center">
              <img src={`http://localhost:8000/productimage/${props.productImage}`} alt="gambar" className="rounded-sm h-[60px] w-[60px]" />
            </div>
            <div className=" w-[100px] md:w-[200px] ">
              <p className=" truncate">
                {props.productName}
              </p>
              <div className=' '>
              <p className="text-[14px] text-slate-500 ">
              Rp {props.productPrice}
            </p>
              <p className="text-[14px] text-slate-500">{props.productWeightConvert} Kg</p>
              </div>
            </div>
          </div>
          {/* untuk qty produk */}
          <div className="flex gap-1">
          <p className="text-slate-500 font-semibold">
              Qty : {props.qty}
            </p>
          </div>
          <div className="">
            <p className="text-[#F06105] font-bold text-[16px] md:text-[17px]">
              Rp {props.total_price}
            </p>
            <p className='text-right text-[14px] text-slate-500'>{props.total_weightConvert} Kg</p>
          </div>
        </div>
    
      </div>
    </>
  );
};

export default ProductCheckoutCard;

