import { CgSpinner } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader";

export const Loading=(props)=>{
    return <div className="fixed inset-0 bg-opacity-100 flex flex-col justify-center items-center bg-slate-100 content-center gap-y-3 text-center">
        <BarLoader size={50} color={"#F06105"} loading={props.loading}/>
        <p className="text-slate-600 animate-pulse text-center ">Loading...</p>
    </div> 
}

export const MiniLoading = (props)=>{
    
}