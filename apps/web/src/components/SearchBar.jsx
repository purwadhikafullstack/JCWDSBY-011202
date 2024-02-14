import { CiSearch } from 'react-icons/ci';
const SearchBar = (props) => {
  return (
    <div>
      <div className="flex sm:w-full h-8 mx-0 sm:m-4 sm:mx-2 rounded bg-gray">
        <input
          className="w-full bg-transparent border-none sm:p-2 text-black-400 outline-none focus:outline-none bg-white rounded-s-full "
          type="search"
          name="search"
          placeholder={'Search'}
          onChange={props.onChange}
        />
        <button
          type="submit"
          className="bg-orange-600 px-4 py-2 text-white rounded-e-full"
        >
          <CiSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
