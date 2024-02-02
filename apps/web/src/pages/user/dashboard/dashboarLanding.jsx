import { useEffect, useState } from 'react';
import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import {
  DashboardSidebar,
  DashboardTitle,
} from '../../../components/dashboard';
import { Loading } from '../../../components/loadingComponent';

const DashboardLanding = () => {
  const [firstloading, setFirstLoading] = useState(false);
  const openLoading = (time) => {
    setFirstLoading(true);
    setTimeout(() => {
      setFirstLoading(false);
    }, time);
  };
  useEffect(()=>{
    openLoading(1500)
  },[])
  return (<>
      {firstloading ? <Loading /> : ''}
    <div>
      <TemporaryNavbar />
      <DashboardTitle title={'Profile'} subTitle={'User/Profile'} />
      <div className='flex justify-center gap-4'>
        <DashboardSidebar username={'Suhartono'} profPict={""}/>
        <div className="shadow-lg rounded-md md:w-[560px] lg:w-[800px] p-5">
            <p className='font-semibold text-xl mb-1'>Username</p>
            <p className='mb-2 text-slate-600 text-sm'>Silahkan ganti username anda</p>
            <input type="text" placeholder='Username baru' className='border-none w-full rounded-md bg-slate-100 mb-3'/>
            <p className='font-semibold text-xl mb-1'>Email</p>
            <p className='mb-2 text-sm text-slate-600'>Silahkan ganti Email anda, alamat email baru tidak boleh sama dengan user yang lain</p>
            <input type="text" placeholder='Email baru' className='border-none w-full rounded-md bg-slate-100 mb-3'/>
            <p className='font-semibold text-xl mb-1'>No Telepon</p>
            <p className='mb-2 text-sm text-slate-600'>Silahkan masukkan no telepon baru anda</p>
            <input type="text" placeholder='No telepon baru' className='border-none w-full rounded-md bg-slate-100 mb-10'/>
            <div className='flex gap-2 justify-end'>
                <button className='bg-[#F06105] px-4 py-2 rounded-md text-white hover:bg-orange-400 font-semibold'>Confirm</button>
                
                <button className='rounded-md px-5 py-2 bg-slate-300 text-slate-800 font-semibold hover:bg-slate-200'>Reset</button>
            </div>
        </div>
      </div>
      <TemporaryFooter />
    </div>
  </>
  );
};

export default DashboardLanding;
