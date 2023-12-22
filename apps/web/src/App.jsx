import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/user/home/Home';
import LandingAdmin from './pages/admin/admin/landing/Landing';
import ManageProduct from './pages/admin/admin/manage.product/manage.product';
import ManageCategory from './pages/admin/admin/manage.category/manage.category';
import ProductDetail from './pages/user/product.detail/Product.detail';
import NotFoundPage from './components/Temporary/404';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT KAI*/}
        <Route path="" />
        <Route path="" />
        <Route path="" />
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT GIBRAN*/}
        <Route path="/admin-landing" element={<LandingAdmin />} />
        <Route path="/manage-product" element={<ManageProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="/manage-category" element={<ManageCategory />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
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
