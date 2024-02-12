import { useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import { LiaEdit } from "react-icons/lia";
export const AddressCardMain = (props) => {
//   const [userAddress, setUserAddress] = useState([props.userAddress]);
const userAddress =[props.userAddress]
  console.log('main', userAddress);
  {
    return userAddress.map((val, id) => {
      return (
        <div key={id} className="sm:w-full shadow p-4 mb-2 rounded-md">
          <div className=" flex justify-between">
            <p className="font-semibold mb-2">{val.address}</p>
            <p className="text-sm text-slate-600">Alamat Utama</p>
          </div>
          <div>
            <p>
              {val['city.name']}, {val['province.name']}
            </p>
            <p>{val.phone}</p>
          </div>
          <div className='flex justify-end'>
            <p className='rounded-full hover:bg-slate-200 p-1'><CiTrash className='cursor-pointer 'onClick={props.onHandleDeleteMainAddress}/></p>
            <p className='rounded-full hover:bg-slate-200 p-1'><LiaEdit className='cursor-pointer 'onClick={props.showModalForEdit}/></p>

          </div>
        </div>
      );
    });
  }
};

export const AddressCardSub = (props) => {
const userAddress =[props.userAddress]

  return userAddress.map((val, idx) => {
    return (
      <div key={idx} className="shadow p-4 mb-2 rounded-md">
        <div className=" flex justify-between">
          <p className="font-semibold mb-2">{val.address}</p>
          <p
            className="text-sm text-slate-600 cursor-pointer hover:underline"
            onClick={props.onHandleChangeMainAddress}
          >
            Set Alamat Utama
          </p>
        </div>
        <div>
          <p>
            {val['city.name']}, {val['province.name']}
          </p>
          <p>{val.phone}</p>
        </div>
        <div className='flex justify-end'>
            <p className='rounded-full hover:bg-slate-200 p-1'><CiTrash className='cursor-pointer'
            onClick={props.onHandleDeleteAddress}/></p>
            <p className='rounded-full hover:bg-slate-200 p-1'><LiaEdit className='cursor-pointer 'onClick={props.showModalForEdit}/></p>
          </div>
        <div>

        </div>
      </div>
    );
  });
};
