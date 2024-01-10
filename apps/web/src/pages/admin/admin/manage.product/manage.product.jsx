import AdminLayout from '../../../../components/AdminLayout';
import ProductTable from '../../../../components/ProductTable';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageProduct = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate('add-product');
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = (deletedProductId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedProductId),
    );
  };

  const handleAddProduct = async (newProduct) => {
    console.log(newProduct[0]);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products?id=${newProduct[0].id}`,
      );
      console.log(response);
      setProducts((prevProducts) => [...prevProducts, response.data[0]]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <AdminLayout>
        <div>
          <div className="p-4 flex justify-between items-center bg-white">
            <div className="font-bold text-xl ">Product List</div>
            <button
              onClick={handleAddButtonClick}
              style={{ cursor: 'pointer' }}
              className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
            >
              Add Product <span className="font-bold">+</span>
            </button>
          </div>
        </div>
        <div className="w-full mt-4 p-4">
          <ProductTable products={products} onDelete={handleDelete} />
        </div>
      </AdminLayout>
    </div>
  );
};

export default ManageProduct;
