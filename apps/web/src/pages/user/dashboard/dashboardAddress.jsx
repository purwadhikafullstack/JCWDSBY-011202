import { useEffect, useRef, useState } from 'react';
import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import {
  DashboardSidebar,
  DashboardTitle,
} from '../../../components/dashboard';
import { CiTrash } from 'react-icons/ci';
import axios from 'axios';
import {
  ModalUserEditAddress,
  ModalUserSettingAddress,
} from '../../../components/modalRama2';
import { RxComponentPlaceholder } from 'react-icons/rx';
import {
  AddressCardMain,
  AddressCardSub,
} from '../../../components/addressCard';
import { Loading } from '../../../components/loadingComponent';
import { API_CALL } from '../../../helper';
const DashboardAddress = (props) => {
  const ref = useRef();
  const [userAddress, setUserAddress] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [userProvince, setUserProvince] = useState(0);
  const [cities, setCities] = useState([]);
  const [userCity, setUserCity] = useState(0);
  const [userNewAddress, setUserNewAddress] = useState('');
  const [firstloading, setFirstLoading] = useState(false);
  const [userMainAddress, setUserMainAddress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState([]);
  const [idEdit, setIdEdit] = useState(0);
  const token = localStorage.getItem('token');
  const getUserAddress = async () => {
    try {
      const result = await API_CALL.get(`/checkout/userAddress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return setUserAddress(result.data.address);
    } catch (error) {
      console.error(error);
    }
  };
  const getUserMainAddressId = async () => {
    try {
      const result = await API_CALL.get(`/userSetting/main-address`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserMainAddress(result.data.address_id);
    } catch (error) {
      console.error(error);
    }
  };
  const getProvinces = async () => {
    const result = await API_CALL.get(`/provincesandcities/provinces`);
    setProvinces(result.data.data);
  };
  const getCity = async () => {
    try {
      const getCity = await API_CALL.get(
        `/userSetting/getCity/${userProvince}`,
      );
      setCities(getCity.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const onHandleChangeProvince = async () => {
    try {
      let doc = document.getElementById('province');
      setUserProvince(doc.value);
    } catch (error) {
      console.error(error);
    }
  };
  const onHandleChangeCity = () => {
    try {
      let doc = document.getElementById('city');
      setUserCity(doc.value);
    } catch (error) {
      console.error(error);
    }
  };
  const addNewAddress = async () => {
    try {
      const doc = document.getElementById('alamat');
      const doc2 = document.getElementById('phone');
      if (doc.value && doc2.value && userCity && userProvince) {
        openLoading(1500);
        const result = await API_CALL.post(
          `/userSetting/add-address`,
          {
            prov_id: userProvince,
            city_id: userCity,
            address: doc.value,
            phone: String(doc2.value),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        getUserAddress();
        setShowModal(false);
        document.body.style.overflow = 'auto';
      } else {
        alert('Silahkan lengkapi dahulu data alamat anda');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onHandleEditAddress = async () => {
    try {
      const doc = document.getElementById('alamat');
      const doc2 = document.getElementById('phone');
      if (userCity && doc.value && doc2.value && userProvince) {
        openLoading(1500);
        const result = await API_CALL.patch(
          `/userSetting/edit-address`,
          {
            prov_id: userProvince,
            city_id: userCity,
            address: doc.value,
            phone: String(doc2.value),
            addressId: dataEdit.id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setShowModalEdit(false);
        document.body.style.overflow = 'auto';
        getUserAddress();
        alert('Perubahan data berhasil disimpan');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const openLoading = (time) => {
    setFirstLoading(true);
    setTimeout(() => {
      setFirstLoading(false);
    }, time);
  };
  useEffect(() => {
    openLoading(1500);
    getUserAddress();
    getUserMainAddressId();
    getProvinces();
  }, []);
  useEffect(() => {
    getCity();
  }, [userProvince]);
  return (
    <div>
      {firstloading ? <Loading /> : ''}
      <TemporaryNavbar />
      <DashboardTitle title={'Alamat'} subTitle={'User/Alamat'} />
      <div className="flex justify-center gap-4">
        <DashboardSidebar username={'Suhartono'} profPict={''} />
        <div className="shadow-lg rounded-md md:w-[560px] lg:w-[800px] p-5">
          <p className="text-lg font-semibold mb-4">Alamat yang terdaftar :</p>
          <div className="flex flex-col gap-4  min-h-[320px]">
            {userAddress.length > 0 ? (
              userAddress.map((val, idx) => {
                if (val.id == userMainAddress) {
                  return (
                    <AddressCardMain
                      key={idx}
                      userAddress={userAddress[idx]}
                      onHandleDeleteMainAddress={async () => {
                        try {
                          openLoading(500);
                          const index = (mainId) => {
                            switch (mainId) {
                              case 0:
                                return 1;
                              default:
                                return 0;
                            }
                          };
                          const token = localStorage.getItem('token');
                          const result = await API_CALL.delete(
                            `/userSetting/delete-main-address?id=${
                              val.id
                            }&other=${userAddress[index(idx)].id}`,
                            {
                              headers: { Authorization: `Bearer ${token}` },
                            },
                          );
                          getUserAddress();
                          getUserMainAddressId();
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                      showModalForEdit={() => {
                        setShowModalEdit(true);
                        document.body.style.overflow = 'hidden';
                        setDataEdit(val);
                        setUserProvince(val.prov_id);
                        setUserCity(val.city_id);
                        setIdEdit(val.id);
                      }}
                    />
                  );
                }
              })
            ) : (
              <div className="bg-slate-100 rounded-md w-[full] h-[270px] flex justify-center items-center mb-4">
                <p className="text-slate-500">Belum ada alamat terdaftar</p>
              </div>
            )}
            {userAddress.length > 1
              ? userAddress.map((val, idx) => {
                  if (val.id != userMainAddress) {
                    return (
                      <AddressCardSub
                        key={idx}
                        userAddress={userAddress[idx]}
                        onHandleDeleteAddress={async () => {
                          try {
                            const token = localStorage.getItem('token');
                            const result = await API_CALL.delete(
                              `/userSetting/delete-address/${val.id}`,
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              },
                            );
                            openLoading(500);
                            getUserAddress();
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                        onHandleChangeMainAddress={async () => {
                          try {
                            const token = localStorage.getItem('token');
                            const result = await API_CALL.patch(
                              `/checkout/changeUserAddress`,
                              { address: val.id },
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              },
                            );
                            openLoading(500);
                            getUserAddress();
                            getUserMainAddressId();
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                        showModalForEdit={() => {
                          setShowModalEdit(true);
                          setDataEdit(val);
                          setUserProvince(val.prov_id);
                          setIdEdit(val.id);
                          setUserCity(val.city_id);
                        }}
                      />
                    );
                  }
                })
              : ''}
          </div>
          <div className="flex justify-end">
            <button
              className=" bg-[#F06105] text-white font-semibold px-2 rounded-md py-2 hover:bg-orange-400"
              disabled={false}
              onClick={() => {
                if (userAddress.length == 3) {
                  alert('Maksimal alamat yang terdaftar adalah 3');
                } else {
                  setShowModal(true);
                  document.body.style.overflow = 'hidden';
                }
              }}
            >
              Tambah Alamat
            </button>
          </div>
        </div>
      </div>
      <TemporaryFooter />
      {showModal ? (
        <ModalUserSettingAddress
          confirm={'Simpan Alamat'}
          cancel={'Cancel'}
          deskripsi={'Tambah Alamat Baru : '}
          provinces={provinces}
          cities={cities}
          onChangeProvince={onHandleChangeProvince}
          onHandleChangeCity={onHandleChangeCity}
          onHandleModalCancel={() => {
            setShowModal(false);
            ref.current.value = '';
            setUserCity('');
            setUserAddress('');

            document.body.style.overflow = 'auto';
          }}
          onHandleModalClick={addNewAddress}
        />
      ) : (
        ''
      )}
      {showModalEdit ? (
        <ModalUserEditAddress
          confirm={'Simpan Perubahan'}
          cancel={'Cancel'}
          deskripsi={'Edit alamat : '}
          provinces={provinces}
          cities={cities}
          data={dataEdit}
          onChangeProvince={onHandleChangeProvince}
          onHandleChangeCity={onHandleChangeCity}
          onHandleModalCancel={() => {
            setShowModalEdit(false);

            // ref.current.value = '';
            document.body.style.overflow = 'auto';
          }}
          onHandleModalClick={onHandleEditAddress}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default DashboardAddress;
