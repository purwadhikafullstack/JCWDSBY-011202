import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
const TemporaryFooter = () => {
  return (
    <div>
      <div className=" bottom-0 left-0 right-0 bg-[#F06105] p-4 text-white text-center ">
        <div className="flex justify-center items-center mb-4">
          <a
            href="https://www.facebook.com/"
            className="text-white mr-2 hover:text-gray-300"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/"
            className="text-white mr-2 hover:text-gray-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/"
            className="text-white hover:text-gray-300"
          >
            <FaLinkedin />
          </a>
        </div>
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        <p className="text-sm mt-2">
          Disclaimer: This is a sample application. The content is for
          demonstration purposes only.
        </p>
      </div>
    </div>
  );
};

export default TemporaryFooter;
