import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layout/layout';
import './Home.css';
import background from './banner1.jpg';
import apart1 from './apart1.jpeg';
import apart2 from './apart2.jpeg'

const products = [
  { name: 'dummy product 1' },
  { name: 'dummy product 2' },
  { name: 'dummy product 3' },
  { name: 'dummy product 4' },
  { name: 'dummy product 5' },
  { name: 'dummy product 6' },
  { name: 'dummy product 7' },
  { name: 'dummy product 8' },
]

// function useProductRows(products, columnsPerRow) {
//   const [productRows, setProductRows] = useState([]);

//   useEffect(() => {
//     const numberOfRows = Math.ceil(products.length / columnsPerRow);
//     const rows = Array.from({ length: numberOfRows }, (_, index) =>
//       products.slice(index * columnsPerRow, (index + 1) * columnsPerRow)
//     );

//     setProductRows(rows);
//   }, [products, columnsPerRow]);

//   return productRows;
// }

function Home() {
  // const columnsPerRow = 4;
  // const productRows = useProductRows(products, columnsPerRow);

  return (
    <Layout>
      <div className="banner">
        <img src={background} alt="" />
      </div>
      <table className="categories">
        <tr>
          <td className='chair'>
            category
          </td>
          <td className='table'>
            category
          </td>
          <td rowSpan={2} className='painting'>
            category
          </td>
        </tr>
        <tr>
          <td colSpan={2} className='sofa'>
            category
          </td>
        </tr>
      </table>
      <div className="article">
        <img src={apart1} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptates repudiandae accusantium? Earum recusandae repudiandae perferendis repellendus! Consequuntur eos, excepturi voluptas natus maxime, sit praesentium enim beatae ratione quos perspiciatis.
        </p>
      </div>
      <div className="article2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias voluptates repudiandae accusantium? Earum recusandae repudiandae perferendis repellendus! Consequuntur eos, excepturi voluptas natus maxime, sit praesentium enim beatae ratione quos perspiciatis.
        </p>
        <img src={apart2} alt="" />
      </div>
      <table className="productsList">
        <tbody>
          {/* {productRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((product, columnIndex) => (
                <td key={columnIndex}>{product.name}</td>
              ))}
            </tr>
          ))} */}
        </tbody>
      </table>
    </Layout>
  );
}

export default Home;
