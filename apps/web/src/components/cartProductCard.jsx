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
          <div className="flex pb-2 gap-2 ">
            <input
            // style={{focus:"ring-0"}}
              type="checkbox"
              name="intoOrder"
              className="rounded-sm ring-transparent"
              value={props.checkBoxValue}
              onChange={props.onChangeChecked}
            />
            <div
              className="cursor-pointer gap-2 flex"
              onClick={props.navigateProduct}
            >
              <div className="flex justify-center items-center ">
                <img
                  src={`http://localhost:8000/productimage/${props.productImage}`}
                  alt="gambar"
                  className="rounded-sm h-[60px] w-[60px]"
                />
              </div>
              <div className=" w-[100px] md:w-[200px] ">
                <p className=" truncate">{props.productName}</p>
                <div className=" ">
                  <p className="text-[14px] text-slate-500 ">
                    Rp {props.productPrice.toLocaleString('id')}
                  </p>
                  <p className="text-[14px] text-slate-500">
                    {props.productWeightConvert} Kg
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* untuk qty produk dan stock*/}
          <div>
            <div className="flex mb-1 h-fit  justify-center align-middle items-center border-b-[1px] border-[#F06105]">
              <button
                className="h-fit text-center flex justify-center px-2 rounded-sm w-[10px] bg-white font-bold hover:bg-slate-200"
                onClick={props.onClickMinus}
              >
                -
              </button>
              <div className="rounded-sm bg-white font-bold">
                <input
                  name={props.inputNames}
                  type="text"
                  inputMode="numeric"
                  className="text-center w-[40px] bg-white outline-none border-none"
                  value={props.qty}
                  onChange={props.onHandleChangeQty}
                />
              </div>
              <button
                className="w-[10px] text-center flex  px-2 rounded-sm justify-center font-bold hover:bg-slate-200"
                onClick={props.onClickPlus}
              >
                +
              </button>
            </div>
            <div><p className=' text-xs italic text-center text-slate-400'>Stock : {props.stock}</p></div>
          </div>

          <div className="w-[110px] md:w-[150px]">
            <p className="text-[#F06105] font-bold text-[16px] md:text-[17px] text-right">
              Rp {props.total_price}
            </p>
            <p className="text-right text-[14px] text-slate-500">
              {props.total_weightConvert} Kg
            </p>
          </div>
        </div>
        <div className=" flex justify-end gap-2">
          <button className="rounded-full bg-slate-100 p-1 hover:bg-slate-300">
            <IoIosHeartEmpty className="" />
          </button>
          <button className="rounded-full bg-slate-100 p-1 hover:bg-slate-300">
            <IoShareSocialOutline className="" />
          </button>
          <button
            className="rounded-full bg-slate-100 p-1 hover:bg-slate-300"
            onClick={props.onHandleDelete}
          >
            <CiTrash className="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartProductCard;
