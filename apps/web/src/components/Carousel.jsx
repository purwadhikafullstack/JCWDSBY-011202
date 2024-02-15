('use client');
import { Carousel } from 'flowbite-react';
import Carousel1 from '../assets/carousel1.jpg';
import Carousel2 from '../assets/carousel2.jpg';
import Carousel3 from '../assets/carousel3.jpg';
import Carousel4 from '../assets/carousel4.jpg';
import { Link } from 'react-router-dom';

function CarouselComponent() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 z-0">
      <Carousel className="w-full ">
        <Link to="/product-detail/Sharon Relax Sofa (Brown-Cream)">
          <img src={Carousel1} alt="..." className="w-full cursor-pointer" />
        </Link>
        <Link to="/product-detail/Chelsea Bed">
          <img src={Carousel2} alt="..." className="w-full cursor-pointer" />
        </Link>
        <Link to="product-detail/Wise Night Stand (Ivory): ">
          <img src={Carousel3} alt="..." className="w-full cursor-pointer" />
        </Link>
        <Link to="product-detail/Kokoro Coffee Table (White-Pink)">
          <img src={Carousel4} alt="..." className="w-full cursor-pointer" />
        </Link>
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
