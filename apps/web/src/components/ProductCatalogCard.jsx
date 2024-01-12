import { useState } from 'react';
import { CiHeart } from 'react-icons/ci';

const ProductCatalog = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-[350px] border rounded-sm my-2 mx-2">
      <div>
        <img
          src={isHovered ? props.src2 : props.src}
          className="h-6/12 w-full cursor-pointer h-full transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={props.onClick}
        />
      </div>
      <div className="flex flex-col justify-between p-1">
        <h1 className="text-slate-500 font-medium text-sm mt-2 h-12">
          {props.productName}
        </h1>
        <div className="flex justify-between mt-2 mb-2">
          <div>
            <h2 className="text-orange-500">{props.price}</h2>
            <p className="text-sm font-medium text-gray-500">
              {props.category}
            </p>
          </div>
          <CiHeart
            className="m-2 text-slate-500 flex items-center hover:text-orange-400 transition-all duration-300 cursor-pointer"
            size={24}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
