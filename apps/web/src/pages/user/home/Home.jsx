import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    // (async () => {
    //   const { data } = await axios.get(
    //     `${import.meta.env.VITE_API_URL}/sample`,
    //   );
    //   setSampleData(data);
    // })();
  }, []);

  return (
    <>
      <h1 className="text-rose-500 font-bold">Hello World</h1>
    </>
  );
}

export default Home;
