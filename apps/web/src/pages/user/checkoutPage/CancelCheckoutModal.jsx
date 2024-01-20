const CancelCheckoutModal = (props) => {
  return (
    <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex items-center flex-col justify-center text-lg">
      <div className="bg-white rounded-md">
          <p className="text-right pr-4 pt-1 font-semibold cursor-pointer"
          onClick={()=> {props.onHandleCancel()}}>x</p>
        <div className=" px-14 pb-10">
          <p className="mb-6 pt-4">
            Apakah anda yakin keluar dari halaman ini?
          </p>
          <div className="flex gap-2">
            <button className="w-full bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400">
              Ya
            </button>
            <button className="w-full bg- rounded-md p-2 bg-slate-300 text-slate-800 font-semibold hover:bg-slate-200"
            onClick={()=>{props.onHandleCancel()}}
            >
              Tidak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelCheckoutModal;
