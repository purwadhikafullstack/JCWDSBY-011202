import { useSelector } from 'react-redux';
import { VscAccount } from 'react-icons/vsc';
import { GiHamburgerMenu } from 'react-icons/gi';

const TopBarAdmin = (props) => {
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  return (
    <div>
      <div className="w-full mx-auto bg-orange-500 flex p-4 justify-between items-center">
        <div class="space-y-2 sm:hidden" onClick={props.onClick}>
          <GiHamburgerMenu />
        </div>
        <h1 className="sm:text-2xl font-bold text-white">
          Welcome, Super Admin
        </h1>
        <div className="flex items-center">
          <div className="mr-4">
            <h1 className="text-xs font-semibold text-white">
              {userGlobal.fullname}
            </h1>
            <h2 className="text-xs text-white">{userGlobal.role}</h2>
          </div>
          <VscAccount
            size={24}
            className="text-white hover:text-orange-200 transition-all duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBarAdmin;
