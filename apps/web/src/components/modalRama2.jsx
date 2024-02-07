const ModalDetailOrder = (props) => {
    return (
      <div className="fixed inset-0 bg-opacity-80 flex flex-col justify-center items-center bg-slate-100 content-center gap-y-3 text-center">
        <div className="bg-white p-10 rounded-md flex flex-col shadow">
          <p className="mb-8 text-lg">{props.deskripsi}</p>
          <div className="flex justify-end gap-3">
            <button
              className="w-full bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400"
              onClick={props.onHandleModalClick}
            >
              {props.confirm}
            </button>
            <button
              className="w-full bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
              onClick={props.onHandleModalCancel}
            >
              {props.cancel}
            </button>
          </div>
        </div>
      </div>
    );
  };

  export {ModalDetailOrder}