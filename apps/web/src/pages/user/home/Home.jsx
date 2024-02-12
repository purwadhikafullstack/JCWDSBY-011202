import TemporaryNavbar from '../../../components/Temporary/Navbar';
import TemporaryFooter from '../../../components/Temporary/Footer';
import Carousel from '../../../components/Carousel';
import HomeGallery from '../../../components/HomeGallery';
import HomeProduct from '../../../components/HomeProduct';
function Home() {
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
