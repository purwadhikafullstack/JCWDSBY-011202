import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import {
  DashboardSidebar,
  DashboardTitle,
} from '../../../components/dashboard';
import { CiTrash } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
const DashboardOrder = (props) => {
    const statusStyle = (status) => {
        switch (status) {
          case 'Diproses':
            return 'bg-blue-300';
          case 'Dikirim':
            return 'bg-blue-300';
          case 'Berhasil':
            return 'bg-green-300';
          case 'Dibatalkan':
            return 'bg-red-300 ';
          default:
            return 'bg-yellow-300 ';
        }
      };
  return (
    <div>
      <TemporaryNavbar />
      <DashboardTitle title={'Pesanan'} subTitle={'User/Pesanan'} />
      <div className="flex justify-center gap-4">
        <DashboardSidebar username={'Suhartono'} profPict={''} />
        <div className="shadow-lg rounded-md md:w-[560px] lg:w-[800px] p-5">
          <p className="text-lg font-semibold mb-4">Daftar Pesanan :</p>
          <div className="flex flex-col gap-4">
            {/* <div className='bg-slate-100 rounded-md w-[full] h-[300px] flex justify-center items-center mb-4'>
                    <p className='text-slate-500'>Belum ada history pesanan</p>
                </div> */}
            <div className="sm:w-full shadow p-4 mb-2 rounded-md">
              <div className=" items-center flex gap-2 text-xs mb-3">
                <p className="font-semibold">Kursi</p>
                <p>29 Feb 2024</p>
                <p className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap ${statusStyle("Dibatalkan")}`}>Dibatalkan</p>
                <p className=" truncate">INV/29012024/SUH/SUB/SUB</p>
              </div>
              <div className="flex justify-between mb-6">
                <div className='flex  gap-2 w-[370px]'>
                  <img src="" alt="" srcset="" className='rounded-sm h-[60px] w-[60px]' />
                  <div>
                  <p className=" truncate font-semibold">
                    Kursi Mahoni SG-Brown 1 Set
                  </p>
                  <p className="italic text-sm text-slate-600">
                    1 Barang x Rp 500.000
                  </p>

                  </div>
                </div>
                <div>
                  <p className="text-slate-600">Total Belanja</p>
                  <p className="font-semibold">Rp 500.000</p>
                </div>
              </div>
              <div className="justify-end text-sm flex gap-2">
                <button
                  className="border-[1px] rounded-md px-2 py-2 border-[#F06105] hover:text-[#F06105]"
                  onClick={() => {
                    let setBlock = document.getElementById('satu');
                    setBlock('');
                  }}
                >
                  <RxHamburgerMenu />
                </button>
                <div id={'satu'} className="hidden relative">
                  <ul className="absolute">
                    <li
                      className=" text-[#F06105]  font-semibold hover:text-orange-400"
                      disabled={false}
                    >
                      Detail Pesanan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="sm:w-full shadow p-4 mb-2 rounded-md">
              <div className=" items-center flex gap-2 text-xs mb-3">
                <p className="font-semibold">Kursi</p>
                <p>29 Feb 2024</p>
                <p className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap ${statusStyle("Berhasil")}`}>Berhasil</p>
                <p className=" truncate">INV/29012024/SUH/SUB/SUB</p>
              </div>
              <div className="flex justify-between mb-6">
                <div className='flex  gap-2 w-[370px]'>
                  <img src="" alt="" srcset="" className='rounded-sm h-[60px] w-[60px]' />
                  <div>
                  <p className=" truncate font-semibold">
                    Kursi Mahoni SG-Brown 1 Set
                  </p>
                  <p className="italic text-sm text-slate-600">
                    1 Barang x Rp 500.000
                  </p>

                  </div>
                </div>
                <div>
                  <p className="text-slate-600">Total Belanja</p>
                  <p className="font-semibold">Rp 500.000</p>
                </div>
              </div>
              <div className="justify-end text-sm flex gap-2">
                <button
                  className="border-[1px] rounded-md px-2 py-2 border-[#F06105] hover:text-[#F06105]"
                  onClick={() => {
                    let setBlock = document.getElementById('satu');
                    setBlock('');
                  }}
                >
                  <RxHamburgerMenu />
                </button>
                <div id={'satu'} className="hidden relative">
                  <ul className="absolute">
                    <li
                      className=" text-[#F06105]  font-semibold hover:text-orange-400"
                      disabled={false}
                    >
                      Detail Pesanan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="sm:w-full shadow p-4 mb-2 rounded-md">
              <div className=" items-center flex gap-2 text-xs mb-3">
                <p className="font-semibold">Kursi</p>
                <p>29 Feb 2024</p>
                <p className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap ${statusStyle("Menunggu Pembayaran")}`}>Menunggu Pembayaran</p>
                <p className=" truncate">INV/29012024/SUH/SUB/SUB</p>
              </div>
              <div className="flex justify-between mb-6">
                <div className='flex  gap-2 w-[370px]'>
                  <img src="" alt="" srcset="" className='rounded-sm h-[60px] w-[60px]' />
                  <div>
                  <p className=" truncate font-semibold">
                    Kursi Mahoni SG-Brown 1 Set
                  </p>
                  <p className="italic text-sm text-slate-600">
                    1 Barang x Rp 500.000
                  </p>

                  </div>
                </div>
                <div>
                  <p className="text-slate-600">Total Belanja</p>
                  <p className="font-semibold">Rp 500.000</p>
                </div>
              </div>
              <div className="justify-end text-sm flex gap-2">
                <button
                  className=" bg-[#F06105] text-white font-semibold px-2 rounded-md py-2 hover:bg-orange-400"
                  disabled={false}
                >
                  Upload bukti pembayaran
                </button>
                <button
                  className="border-[1px] rounded-md px-2 border-[#F06105] hover:text-[#F06105]"
                  onClick={() => {
                    let setBlock = document.getElementById('satu');
                    setBlock('');
                  }}
                >
                  <RxHamburgerMenu />
                </button>
                <div id={'satu'} className="hidden relative">
                  <ul className="absolute">
                    <li
                      className=" text-[#F06105]  font-semibold hover:text-orange-400"
                      disabled={false}
                    >
                      Detail Pesanan
                    </li>
                    <li className="rounded-md px-5 py-2 bg-slate-300 text-slate-800 font-semibold hover:bg-slate-200">
                      Batalkan pesanan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TemporaryFooter />
    </div>
  );
};

export default DashboardOrder;
