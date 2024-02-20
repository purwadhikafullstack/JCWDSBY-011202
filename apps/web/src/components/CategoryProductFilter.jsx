import { useState, useEffect } from 'react';
const SearchByCategory = ({
  categories,
  checkedValue,
  refStatus,
  onClickStatus,
}) => {
  const get = document.getElementById('status');
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <>
      <p className="mx-2">Category</p>
      <ul className="w-full overflow-x-auto flex gap-2 items-center h-[50px] no-scrollbar">
        {categories.map((val, id) => {
          if (val === '') {
            return (
              <li className=" whitespace-nowrap  ">
                <input
                  checked={checkedValue === ''}
                  ref={refStatus}
                  type="radio"
                  name={'status'}
                  value={''}
                  id={id}
                  className="peer hidden"
                  onClick={onClickStatus}
                />
                <label
                  for={id}
                  className="cursor-pointer peer-checked:border-[#F06105] peer-checked:text-[#F06105] border-[1px] border-slate-400 rounded-md py-1 px-3"
                >
                  Semua
                </label>
              </li>
            );
          } else {
            return (
              <li className=" whitespace-nowrap  ">
                <input
                  checked={checkedValue === val.category}
                  ref={refStatus}
                  type="radio"
                  value={val.id}
                  name={'status'}
                  id={id}
                  className="peer hidden"
                  onClick={onClickStatus}
                />
                <label
                  for={id}
                  className="cursor-pointer peer-checked:border-[#F06105] peer-checked:text-[#F06105] border-[1px] border-slate-400 rounded-md py-1 px-3"
                >
                  {val.category}
                </label>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default SearchByCategory;
