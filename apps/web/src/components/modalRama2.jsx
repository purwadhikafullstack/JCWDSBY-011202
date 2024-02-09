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

const ModalUserSettingAddress = (props) => {
   return <div className="fixed inset-0 bg-opacity-80 flex justify-center items-center bg-slate-100 gap-y-3 p-2">
      <div className="w-full bg-white p-5 rounded-md flex flex-col gap-y-2 md:w-[700px]">
        <div>
          <p className="font-semibold">Ubah alamat anda</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Provinsi</p>
          <select
            id="province"
            className="rounded-md w-full"
            onChange={props.onChangeProvince}
          >
            {props.provinces.map((val, id) => {
              return (
                <option key={id} value={val.id}>
                  {val.name}
                </option>
              );
            })}
          </select>
          <p>Kota/Kabupaten </p>
          <select
            id="city"
            className="rounded-md w-full"
            ref={props.refInput}
            onChange={props.onHandleChangeCity}
          >
            {props.cities
              ? props.cities.map((val, id) => {
                  return (
                    <option key={id} value={val.id}>
                      {val.name}
                    </option>
                  );
                })
              : ''}
          </select>
        </div>
        <p>Phone :</p>
        <input
          type="number"
          id="phone"
          inputMode="numeric"
          className="rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Masukkan nomor handphone anda"
          ref={props.refInput}
          onChange={(e) => {
            e.target.value;
          }}
        />
        <p>Alamat :</p>
        <input
          type="text"
          id="alamat"
          className="rounded-md"
          placeholder="Masukkan alamat anda"
          ref={props.refInput}
          onChange={(e) => {
            e.target.value;
          }}
        />
        <div className="flex justify-end gap-3">
          <button
            className="w-fit bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400"
            onClick={props.onHandleModalClick}
          >
            {props.confirm}
          </button>
          <button
            className="w-fit bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
            onClick={props.onHandleModalCancel}
          >
            {props.cancel}
          </button>
        </div>
      </div>
    </div>
  }
const ModalUserEditAddress = (props) => {
  console.log("ii lo",props.data);
   return <div className="fixed inset-0 bg-opacity-80 flex justify-center items-center bg-slate-100 gap-y-3 p-2">
      <div className="w-full bg-white p-5 rounded-md flex flex-col gap-y-2 md:w-[700px]">
        <div>
          <p className="font-semibold">Ubah alamat anda</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p>Provinsi</p>
          <select
            id="province"
            className="rounded-md w-full"
            defaultValue={props.data.prov_id}
            onChange={props.onChangeProvince}
          >
            {props.provinces.map((val, id) => {
              return (
                <option key={id} value={val.id}>
                  {val.name}
                </option>
              );
            })}
          </select>
          <p>Kota/Kabupaten </p>
          <select
            id="city"
            className="rounded-md w-full"
            // ref={props.refInput}
            defaultValue={props.data.city_id}
            onChange={props.onHandleChangeCity}
          >
            {props.cities
              ? props.cities.map((val, id) => {
                  return (
                    <option key={id} value={val.id}>
                      {val.name}
                    </option>
                  );
                })
              : ''}
          </select>
        </div>
        <p>Phone :</p>
        <input
          type="number"
          id="phone"
          inputMode="numeric"
          className="rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Masukkan nomor handphone anda"
          ref={props.refInput}
          defaultValue={props.data.phone}
          onChange={(e) => {
            e.target.value;
          }}
        />
        <p>Alamat :</p>
        <input
          type="text"
          id="alamat"
          className="rounded-md"
          placeholder="Masukkan alamat anda"
          ref={props.refInput}
          defaultValue={props.data.address}
          onChange={(e) => {
            e.target.value;
          }}
        />
        <div className="flex justify-end gap-3">
          <button
            className="w-fit bg-[#F06105] text-white rounded-md p-2 font-semibold hover:bg-orange-400"
            onClick={props.onHandleModalClick}
          >
            {props.confirm}
          </button>
          <button
            className="w-fit bg-slate-300 text-slate-800 rounded-md p-2  font-semibold hover:bg-slate-200"
            onClick={props.onHandleModalCancel}
          >
            {props.cancel}
          </button>
        </div>
      </div>
    </div>
  }
export { ModalDetailOrder, ModalUserSettingAddress, ModalUserEditAddress };
