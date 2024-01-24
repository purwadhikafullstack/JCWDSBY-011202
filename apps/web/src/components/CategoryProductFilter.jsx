import { useState, useEffect } from 'react';
import axios from 'axios';
const SearchByCategory = (props) => {
  const get = document.getElementById('status');
  const [selectedValue, setSelectedValue] = useState('');
  const [category, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/categories',
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <p className="mx-2">Category</p>
      <ul className="w-full overflow-x-auto flex gap-2 items-center h-[50px] no-scrollbar">
        {category.map((val, id) => {
          if (val === '') {
            return (
              <li className=" whitespace-nowrap  ">
                <input
                  checked={props.checkedValue === ''}
                  ref={props.refStatus}
                  type="radio"
                  name={'status'}
                  value={''}
                  id={id}
                  className="peer hidden"
                  onClick={props.onClickStatus}
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
                  checked={props.checkedValue === val.category}
                  ref={props.refStatus}
                  type="radio"
                  value={val.category}
                  name={'status'}
                  id={id}
                  className="peer hidden"
                  onClick={props.onClickStatus}
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
