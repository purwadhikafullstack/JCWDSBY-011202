import Gallery1 from '../assets/gallery1.jpg';
import Gallery2 from '../assets/gallery2.jpg';
import Gallery3 from '../assets/gallery3.jpg';
import Gallery4 from '../assets/gallery4.jpg';

const HomeGallery = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center">Our Gallery</h1>
      <hr className="mt-6 font-bold text-2xl" />
      <div className="flex mt-4">
        <img
          src={Gallery1}
          alt=""
          className="w-5/12 h-auto p-2 animate-fade-in"
        />
        <div className="w-full flex flex-col p-2">
          <div className="h-full animate-fade-in">
            <img src={Gallery2} alt="" className="w-full h-full" />
          </div>
          <div className="flex w-full h-full pt-2">
            <div className="mr-2 animate-fade-in">
              <img src={Gallery3} alt="" className="w-full h-full" />
            </div>
            <div className="animate-fade-in">
              <img src={Gallery4} alt="" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeGallery;
