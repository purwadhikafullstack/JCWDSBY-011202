import TemporaryNavbar from '../../../components/Temporary/Navbar';
import TemporaryFooter from '../../../components/Temporary/Footer';
import Carousel from '../../../components/Carousel';
import HomeGallery from '../../../components/HomeGallery';
import HomeProduct from '../../../components/HomeProduct';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8000/api/accounts/authcheck',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCurrentRole(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (currentRole === 'admin' || currentRole === 'superadmin') {
    navigate('/not-authorized');
  }

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <TemporaryNavbar />
      <div>
        <div className="w-full sm:w-[80vw] h-[auto] mx-auto sm:mt-8 ">
          <Carousel />
        </div>
        <div className="mt-8 w-full sm:w-8/12 mx-auto">
          <HomeGallery />
          <h1 className="mt-8 font-bold text-3xl text-center">
            Telusuri Produk Kami
          </h1>
          <hr className="mt-6" />
          <div>
            <HomeProduct />
          </div>
        </div>
      </div>
      <TemporaryFooter />
    </div>
  );
}

export default Home;
