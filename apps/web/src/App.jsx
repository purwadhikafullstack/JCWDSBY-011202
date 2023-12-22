import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/user/home/Home';

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
        <Route path="" />
        <Route path="" />
        <Route path="" />
        {/* ROUTES FEATURE : PRODUCT-MANAGEMENT MAS ADHON*/}
        <Route path="" />
        <Route path="" />
        <Route path="" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
