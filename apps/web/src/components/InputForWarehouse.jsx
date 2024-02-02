import { useEffect, useState } from 'react';
import axios from 'axios';

const InputForWarehouse = ({ onFormChange }) => {
  const [warehouse, setWarehouse] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [cities, setCities] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [geometry, setGeometry] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/provincesandcities/provinces',
        );
        setProvinces(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/provincesandcities/cities',
        );
        setCitiesList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/provincesandcities/cities?prov_id=${selectedProvince}`,
        );
        setCities(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedProvince]);

  useEffect(() => {
    const openCage = async () => {
      try {
        const selectedCityObject = citiesList[selectedCityIndex - 1];
        const cityNameForOpenCage = selectedCityObject
          ? selectedCityObject.name
          : '';

        console.log(cityNameForOpenCage);

        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${selectedAddress}%2C+99423+${cityNameForOpenCage}%2C+Indonesia&key=c4e250edc84e4f5c9f616a04b348274f`,
        );
        setGeometry(response.data.results[0].geometry);
      } catch (error) {
        console.log(error);
      }
    };
    openCage();
  }, [selectedProvince, selectedCityIndex, selectedAddress, cities]);

  useEffect(() => {
    console.log(selectedCityIndex);
    onFormChange({
      warehouse,
      selectedCityIndex,
      selectedProvince,
      selectedAddress,
      geometry,
    });
  }, [
    selectedAddress,
    selectedCityIndex,
    selectedProvince,
    selectedCityIndex,
    geometry,
  ]);

  return (
    <div>
      <div className="w-full mx-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Warehouse Name
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name="name"
          onChange={(e) => setWarehouse(e.target.value)}
        />
      </div>
      <div className="w-full mx-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Province
        </label>
        <select
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full mx-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          City
        </label>
        <select
          onChange={(e) => setSelectedCityIndex(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select City</option>
          {cities.map((city, index) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full mx-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
          Address
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name="address"
          onChange={(e) => setSelectedAddress(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputForWarehouse;
