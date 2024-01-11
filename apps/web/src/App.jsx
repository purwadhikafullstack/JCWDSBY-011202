import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import TestLoginPage from './pages/user/layout/testLoginPage';

const AdminRoute = ({ element }) => {
  const role = useSelector((state) => state.auth.role);

  if (role === 'admin') {
    return <Navigate to="/admin" />;
  }

  return element;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT KAI*/}
        <Route path="/login" element={<Login />} />
        <Route path="/test-page" element={<TestLoginPage />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/admin/manage-account" element={<ManageAccount />}/>
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT GIBRAN*/}
        <Route path="/admin" element={<LandingAdmin />} />
        <Route path="/admin/manage-product" element={<ManageProduct />} />
        <Route path="/admin/manage-product/add-product"element={<AddProduct />}/>
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/manage-category" element={<ManageCategory />} />
        <Route path="/admin/manage-inventory" element={<ManageInventory />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/product-search" element={<ProdutSearch />} />
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
          path="/warehouse-admin/edit-stock"
          element={<EditStockProduct />}
        />
        <Route path="*" element={<NotFoundPage />} />
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT MAS ADHON*/}
        <Route path="" />
        <Route path="" />
        <Route path="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
