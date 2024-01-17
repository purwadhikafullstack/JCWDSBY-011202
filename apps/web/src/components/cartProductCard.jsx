import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoIosHeartEmpty } from 'react-icons/io';
import { CiTrash } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import { useState } from 'react';
const CartProductCard = (props) => {
  // const [qty, setqty] = useState(props.qty);

  return (
    <>
      <div className="px-2 py-4 pt-6 border-b-[1px] flex flex-col gap-y-3 md:w-[500px] lg:w-[600px]">
        <div className="flex w-full justify-between">
          {/* untuk gambar dan informasi product */}
          <div className="flex gap-2">
            <input type="checkbox" name="intoOrder" className={props.cardNames} value={props.checkBoxValue} onChange={props.onChangeChecked}/>
            <div className=" bg-slate-400">
              <img src={props.productImage} alt="gambar" className="w-[50px]" />
            </div>
            <div className=" w-[100px] md:w-[200px] ">
              <p className=" truncate">
                {props.productName}
              </p>
              <div className=' '>
              <p className="text-[14px] text-slate-500 ">
              Rp {props.productPrice.toLocaleString("id")}
            </p>
              <p className="text-[14px] text-slate-500">{props.productWeightConvert} Kg</p>
              </div>
            </div>
          </div>
          {/* untuk qty produk */}
          <div className="flex gap-1">
          <button className=" border-[1px] h-fit px-2 rounded-sm bg-white font-bold hover:bg-slate-300"
            onClick={
              props.onClickMinus
              // ()=>{return setqty(qty-1)}
              }>
              -
            </button>
            <div className="border-[1px] h-fit px-2 rounded-sm bg-slate-200 font-bold">
              {props.qty}
            </div>
            <button className="border-[1px] h-fit px-2 rounded-sm bg-white font-bold hover:bg-slate-300"
            onClick={
              props.onClickPlus
              // ()=>{return setqty(qty+1)}
              }>
              +
            </button>
          </div>
          <div className="">
            <p className="text-[#F06105] font-bold text-[16px] md:text-[17px]">
              Rp {props.total_price.toLocaleString("id")}
            </p>
            <p className='text-right text-[14px] text-slate-500'>{props.total_weightConvert} Kg</p>
          </div>
        </div>
        <div className=" flex justify-end gap-2">
          {/* <button><FaHeart className="text-red-500" /></button> */}
          <button className="rounded-full bg-slate-100 p-1 hover:bg-slate-300">
            <IoIosHeartEmpty className="" />
          </button>
          <button className="rounded-full bg-slate-100 p-1 hover:bg-slate-300">
            <IoShareSocialOutline className="" />
          </button>
          <button className="rounded-full bg-slate-100 p-1 hover:bg-slate-300"
          onClick={props.onHandleDelete}>
            <CiTrash className="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartProductCard;
