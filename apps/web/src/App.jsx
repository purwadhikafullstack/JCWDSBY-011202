import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Home from './pages/user/home/Home';
import LandingAdmin from './pages/admin/admin/landing/Landing';
import ManageProduct from './pages/admin/admin/manage.product/manage.product';
import ManageCategory from './pages/admin/admin/manage.category/manage.category';
import ManageAccount from './pages/admin/admin/manage.account/manage.account';
import ProductDetail from './pages/user/product.detail/Product.detail';
import NotFoundPage from './components/Temporary/404';
import EditProduct from './components/EditProduct';
import LandingWarehouse from './pages/admin/admin.warehouse/landing/Landing';
import ViewProduct from './pages/admin/admin.warehouse/view.product/View.Product';
import ViewCategory from './pages/admin/admin.warehouse/view.category/View.Category';
import AddProduct from './components/AddProduct';
import ProdutSearch from './pages/user/product.search/Product.search';
import ManageInventory from './pages/admin/admin/manage.inventory/manage.inventory';
import WarehouseInventory from './components/WarehouseInventory';
import EditStockProduct from './pages/admin/admin.warehouse/edit.stock/EditStock';
import Login from './pages/user/login/login';
import Register from './pages/user/register/register';
import CartPage from './pages/user/cart/Cart';
import ManageMutation from './pages/admin/admin.warehouse/manage.mutation/Manage.Mutation';
import AddWarehouse from './components/AddWarehouse';
import ManageWarehouse from './pages/admin/admin/manage.warehouse/manage.warehouse';
import { useDispatch } from 'react-redux';
import RegisterForm from './pages/user/register/register';
import { useEffect, useState } from 'react';
import CheckoutPage from './pages/user/checkoutPage/Checkout';
import axios from 'axios';
import ResetPassword from './components/ForgotPassword';
import EmailVerification from './components/EmailVerification';
import AddMutation from './components/AddMutation';
import AddAccount from './components/AddAccount';
import AdminLogin from './pages/admin/admin/AdminLogin';
function App() {
  useEffect(() => {
    const checkData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `http://localhost:8000/api/accounts/keep-login`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.data.success === true) {
          localStorage.setItem('token', response.data.token);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
      }
    };
    checkData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT KAI*/}
        <Route path="/admin/manage-account" element={<ManageAccount />} />
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT GIBRAN*/}
        <Route
          path="/admin/manage-account/add-admin"
          element={<AddAccount />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/user/email-verification"
          element={<EmailVerification />}
        />
        <Route path="/user/forgot-pass" element={<ResetPassword />} />
        <Route path="/user/register" element={<RegisterForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<LandingAdmin />} />
        <Route path="/admin/manage-product" element={<ManageProduct />} />
        <Route
          path="/admin/manage-product/add-product"
          element={<AddProduct />}
        />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/manage-category" element={<ManageCategory />} />
        <Route path="/admin/manage-inventory?" element={<ManageInventory />} />
        <Route path="/admin/manage-warehouse" element={<ManageWarehouse />} />
        <Route
          path="/admin/manage-warehouse/add-warehouse"
          element={<AddWarehouse />}
        />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/product-search?" element={<ProdutSearch />} />
        <Route path="/warehouse-admin" element={<LandingWarehouse />} />
        <Route
          path="/warehouse-admin/view-products"
          element={<ViewProduct />}
        />
        <Route
          path="/warehouse-admin/view-categories"
          element={<ViewCategory />}
        />
        <Route
          path="/warehouse-admin/view-categories"
          element={<ViewCategory />}
        />
        <Route
          path="/warehouse-admin/manage-inventory"
          element={<WarehouseInventory />}
        />
        <Route
          path="warehouse-admin/manage-mutation/add-request"
          element={<AddMutation />}
        />
        <Route
          path="/warehouse-admin/manage-mutation"
          element={<ManageMutation />}
        />
        <Route
          path="/warehouse-admin/edit-stock/:id"
          element={<EditStockProduct />}
        />
        <Route path="*" element={<NotFoundPage />} />
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT MAS ADHON*/}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="" />
        <Route path="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
