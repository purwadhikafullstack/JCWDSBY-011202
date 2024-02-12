import { useState } from 'react';
import { FaSortDown } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';

export const InputSearchComponent = (props) => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div className="w-full">
      <div
        className=" rounded-md flex items-center gap-1 bg-white md:w-full"
        // onClick={props.onHandleViewBox}
      >
        <GoSearch className="bg-white ml-2" />
        <input
          id={props.inputSearchId}
          type={props.inputType}
          value={props.valueInputSearch}
          placeholder={props.placeholder}
          className="outline-none w-full py-2 rounded-md placeholder:text-sm text-sm"
          ref={props.refInput}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
        />
      </div>
      <div className={`${props.valueInputSearch ? 'relative' : 'hidden'}`}>
        <ul className="absolute bg-white w-full md:w-full p-1 mt-2 max-h-[400px] overflow-y-auto text-sm">
          {/* {props.data.map((val, idx) => {
            return (
              <li
                key={idx}
                className="p-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setSelectedValue(val[props.listValue]);
                }}
                value={val[props.listValue]}
              >
                {val[props.listValue]}
              </li>
            );
          })} */}
        </ul>
      </div>
    </div>
  );
};

export const SearchDate = (props) => {
  return (
    <div className="flex items-center gap-1 rounded-md text-sm w-full">
      {/* <span>Rentang :</span> */}
      <input
        name="from"
        type="date"
        ref={props.refFrom}
        value={props.valueDateFrom}
        className={`rounded-md p-1 w-full outline-none border-none
         invalid:text-slate-400
        `}
        onChange={props.onChangeFrom}
      />
      <span>-</span>
      <input
        name="to"
        type="date"
        ref={props.refTo}
        value={props.valueDateTo}
        className={`rounded-md w-full p-1 outline-none border-none
         invalid:text-slate-400`}
        onChange={props.onChangeTo}
      />
    </div>
  );
};

export const SearchByStatus = (props) => {
  const get = document.getElementById('status');
  const statusOption = [
    '',
    'Menunggu Pembayaran',
    'Menunggu Konfirmasi Pembayaran',
    'Diproses',
    'Dikirim',
    'Dibatalkan',
    "Berhasil"
  ];
  return (
    <>
      <p>Status :</p>
      <ul className="w-full overflow-x-auto flex gap-2 items-center h-[50px] no-scrollbar">
        {statusOption.map((val, id) => {
          if(val===""){
            return (
              <li key={id} className=" whitespace-nowrap  ">
                <input
                checked={props.checkedValue===""}
                  ref={props.refStatus}
                  type="radio"
                  name={"status"}
                  value={""}
                  id={id}
                  className="peer hidden"
                  onChange={props.onChangeStatus}
                />
                <label
                  for={id}
                  className="cursor-pointer peer-checked:border-[#F06105] peer-checked:text-[#F06105] border-[1px] border-slate-400 rounded-md py-1 px-3"
                >
                  Semua
                </label>
              </li>
            );
          }else {
            return (
              <li key={id} className=" whitespace-nowrap  ">
                <input
                  checked = {props.checkedValue===val}
                  ref={props.refStatus}
                  type="radio"
                  value={val}
                  name={"status"}
                  id={id}
                  className="peer hidden"
                  onClick={props.onClickStatus}
                />
                <label
                  for={id}
                  // onClick={props.onChange}
                  className="cursor-pointer peer-checked:border-[#F06105] peer-checked:text-[#F06105] border-[1px] border-slate-400 rounded-md py-1 px-3"
                >
                  {val}
                </label>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};
