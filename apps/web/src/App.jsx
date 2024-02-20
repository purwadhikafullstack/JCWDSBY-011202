import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import RegisterForm from './pages/user/register/register';
import { useEffect, useState } from 'react';
import CheckoutPage from './pages/user/checkoutPage/Checkout';
import ResetPassword from './components/ForgotPassword';
import EmailVerification from './components/EmailVerification';
import AddMutation from './components/AddMutation';
import AddAccount from './components/AddAccount';
import AdminLogin from './pages/admin/admin/AdminLogin';
import DashboardLanding from './pages/user/dashboard/dashboarLanding';
import DashboardAddress from './pages/user/dashboard/dashboardAddress';
import DashboardOrder from './pages/user/dashboard/dashboardOrder';
import CheckoutSuccess from './pages/user/checkoutPage/CheckoutSuccess';
import EditWarehouse from './components/EditWarehouseModal';
import UpdateAccount from './components/UpdateAccount';
import { keepLogin } from './redux/slice/accountSlice';
import DashboardUploadPayment from './pages/user/dashboard/dashboardUploadPayment';
import WarehouseManageOrder from './pages/admin/admin.warehouse/manage.order/Manage.Order';
import RoleRouting from './components/RoleRouting';
import ViewAllJournal from './components/ViewJournalAdmin';
import ViewAllJournalWarehouse from './components/ViewJournalWarehouseAdmin';
import AdminManageOrder from './pages/admin/admin/manage.order/manage.order';
import AdminManageInventory from './components/AdminManageInventory';
import AdminEditStock from './pages/admin/admin.warehouse/edit.stock/AdminEditStock';
function App() {
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(keepLogin());
    const checkData = async () => {
      if (!userGlobal.token && !localStorage.getItem('token')) {
        dispatch(logout());
      } else if (userGlobal.token) {
        dispatch(keepLogin());
      }
    };
    checkData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT KAI*/}
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT GIBRAN*/}
        <Route
          path="/admin/manage-account"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <ManageAccount />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-account/edit-account?"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <UpdateAccount />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-account/add-admin"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <AddAccount />
            </RoleRouting>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <LandingAdmin />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-product"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <ManageProduct />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-product/add-product"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <AddProduct />
            </RoleRouting>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <EditProduct />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-category"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <ManageCategory />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-inventory?"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <ManageInventory />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-warehouse"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <ManageWarehouse />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-warehouse/edit-warehouse?"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <EditWarehouse />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-warehouse/add-warehouse"
          element={
            <RoleRouting role="superadmin" redirect="/unauthorized">
              <AddWarehouse />
            </RoleRouting>
          }
        />
        <Route
          path="/warehouse-admin"
          element={
            <RoleRouting role="admin" redirect="/unauthorized">
              <LandingWarehouse />
            </RoleRouting>
          }
        />
        <Route
          path="/warehouse-admin/view-products"
          element={
            <RoleRouting role="admin" redirect="/unauthorized">
              <ViewProduct />
            </RoleRouting>
          }
        />
        <Route
          path="/warehouse-admin/view-categories"
          element={
            <RoleRouting role="admin" redirect="/unauthorized">
              <ViewCategory />
            </RoleRouting>
          }
        />
        <Route
          path="/warehouse-admin/manage-inventory"
          element={
            <RoleRouting role={['admin', 'superadmin']} redirect="/admin/login">
              <WarehouseInventory />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-warehouse-inventory"
          element={
            <RoleRouting role={['admin', 'superadmin']} redirect="/admin/login">
              <AdminManageInventory />
            </RoleRouting>
          }
        />
        <Route
          path="warehouse-admin/manage-mutation/add-request"
          element={
            <RoleRouting role="admin" redirect="/unauthorized">
              <AddMutation />
            </RoleRouting>
          }
        />
        <Route
          path="/warehouse-admin/manage-mutation?"
          element={
            <RoleRouting role="admin" redirect="/unauthorized">
              <ManageMutation />
            </RoleRouting>
          }
        />
        <Route
          path="/warehouse-admin/edit-stock/:id"
          element={
            <RoleRouting role={['admin', 'superadmin']} redirect="/admin/login">
              <EditStockProduct />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/edit-stock/:id"
          element={
            <RoleRouting role={['admin', 'superadmin']} redirect="/admin/login">
              <AdminEditStock />
            </RoleRouting>
          }
        />
        <Route
          path="/view-all-journal"
          element={
            <RoleRouting role={'superadmin'} redirect="/admin/login">
              <ViewAllJournal />
            </RoleRouting>
          }
        />
        <Route
          path="/view-warehouse-journal"
          element={
            <RoleRouting role={'admin'} redirect="/admin/login">
              <ViewAllJournalWarehouse />
            </RoleRouting>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/user/email-verification"
          element={<EmailVerification />}
        />
        <Route path="/user/register" element={<RegisterForm />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        {/* BELUM KE ROUTING */}
        <Route
          path="/cart"
          element={
            <RoleRouting role={'user'} redirect="/unathorized">
              <CartPage />
            </RoleRouting>
          }
        />
        <Route
          path="/checkout"
          element={
            <RoleRouting role={'user'} redirect="/unathorized">
              <CheckoutPage />
            </RoleRouting>
          }
        />
        <Route
          path="/checkout/success?"
          element={
            <RoleRouting role={'user'} redirect="/unathorized">
              <CheckoutSuccess />
            </RoleRouting>
          }
        />
        <Route
          path="user/dashboard"
          element={
            <RoleRouting role={'user'} redirect="/unathorized">
              <DashboardLanding />
            </RoleRouting>
          }
        />
        <Route
          path="user/dashboard/address"
          element={
            <RoleRouting role={'user'} redirect="/unathorized">
              <DashboardAddress />
            </RoleRouting>
          }
        />
        <Route
          path="user/dashboard/order"
          element={
            <RoleRouting role={'user'} redirect="/unathorized">
              <DashboardOrder />
            </RoleRouting>
          }
        />
        <Route
          path="user/dashboard/upload-payment?"
          element={
            <RoleRouting role={'user'} redirect="/unathorized">
              <DashboardUploadPayment />
            </RoleRouting>
          }
        />
        <Route
          path="/warehouse-admin/manage-order"
          element={
            <RoleRouting role={'admin'} redirect="/unathorized">
              <WarehouseManageOrder />
            </RoleRouting>
          }
        />
        <Route
          path="/admin/manage-order"
          element={
            <RoleRouting role={'superadmin'} redirect="/unathorized">
              <AdminManageOrder />
            </RoleRouting>
          }
        />
        {/* TEST */}
        <Route path="/user/forgot-pass" element={<ResetPassword />} />
        <Route path="/product-search?" element={<ProdutSearch />} />
        {/* BELUM */}
        <Route path="*" element={<NotFoundPage />} />
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT MAS ADHON*/}
        <Route path="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
