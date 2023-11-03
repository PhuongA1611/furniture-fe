import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from '../admin/Admin';
import {
  AddProduct,
  AdminBanner,
  AdminCategory,
  AdminDetail,
  AdminLogin,
  AdminOrder,
  AdminSlider,
  AdminUser,
  Dashboard,
  Products,
} from '../admin/pages';
import {
  About,
  Account,
  Address,
  AddressDetail,
  Cart,
  Category,
  Checkout,
  Contact,
  Detail,
  Favorite,
  Home,
  Login,
  MainLayout,
  Order,
  OrderDetail,
  Profile,
  Register,
} from '../pages';

const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" exact element={<Home />} />
        <Route path="home" element={<Navigate replace to="/" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="shop/product-category/:category" element={<Category />} />
        <Route path="shop" exact element={<Category />} />
        <Route path="shop/search/:key" exact element={<Category />} />
        <Route path="shop/:id" element={<Detail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="account" element={<Account />}>
          <Route path="profile" element={<Profile />} />
          <Route path="" element={<Navigate replace to="orders" />} />
          <Route path="orders" element={<Order />} />
          <Route path="orders/:orderId" element={<OrderDetail />} />
          <Route path="addresses" element={<Address />} />
          <Route path="addresses/new-address" element={<AddressDetail />} />
          <Route path="addresses/edit/:addressId" element={<AddressDetail />} />
        </Route>
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="dashboard" exact element={<Dashboard />} />
        <Route path="category" exact element={<AdminCategory />} />
        <Route path="products">
          <Route path="add" exact element={<AddProduct />} />
          <Route path="manage" exact element={<Products />} />
          <Route path="manage/edit/:id" element={<AddProduct />} />
        </Route>
        <Route path="slider" exact element={<AdminSlider />} />
        <Route path="banner" exact element={<AdminBanner />} />
        <Route path="user" exact element={<AdminUser />} />
        <Route path="order" exact element={<AdminOrder />} />
        <Route path="order/:orderId" exact element={<AdminDetail />} />
      </Route>
    </Routes>
  );
};

export default RouteConfig;
