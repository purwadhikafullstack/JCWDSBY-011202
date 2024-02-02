export const orderCardNone = (props) => {
  // if (!props.data) {
    return (
      <div className="bg-slate-100 rounded-md w-[full] h-[300px] flex justify-center items-center mb-4">
        <p className="text-slate-500">Belum ada history pesanan</p>
      </div>
    );
  } 
  // else if (
  //   props.status == 'Menunggu Pembayaran' ||
  //   props.status == 'Menunggu Konfirmasi Pembayaran'
  // ) {
export const orderCardPembayaran = (props) => {
    return (
      <div className="sm:w-full shadow p-4 mb-2 rounded-md">
        <div className=" items-center flex gap-2 text-xs mb-3">
          <p className="font-semibold">Kursi</p>
          <p>29 Feb 2024</p>
          <p
            className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap bg-yellow-300`}
          >
            Menunggu Pembayaran
          </p>
          <p className=" truncate">INV/29012024/SUH/SUB/SUB</p>
        </div>
        <div className="flex justify-between mb-6">
          <div className="flex  gap-2 w-[370px]">
            <img
              src=""
              alt=""
              srcset=""
              className="rounded-sm h-[60px] w-[60px]"
            />
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
    );
  } 
export const orderCard = (props) => {
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
   return <div className="sm:w-full shadow p-4 mb-2 rounded-md">
      <div className=" items-center flex gap-2 text-xs mb-3">
        <p className="font-semibold">Kursi</p>
        <p>29 Feb 2024</p>
        <p
          className={`align-middle max-w-fit px-2 py-1 rounded-md overflow-hidden text-ellipsis whitespace-nowrap ${statusStyle(
            'Dibatalkan',
          )}`}
        >
          Dibatalkan
        </p>
        <p className=" truncate">INV/29012024/SUH/SUB/SUB</p>
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex  gap-2 w-[370px]">
          <img
            src=""
            alt=""
            srcset=""
            className="rounded-sm h-[60px] w-[60px]"
          />
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
    </div>;
  }
