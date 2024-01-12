import { useState } from 'react';
import { useSelector } from 'react-redux';
import './layout.css'
import icon from '../../../assets/bussinesman.png'

function HeaderLogin() {
    const [account, setAccount] = useState()
    const username = useSelector(state => state.auth.username)

    return (
        <div className="header">
            <p className='logo'>Logo</p>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li><img src={icon} className="w-[25px]" alt="" /></li>
                <li>{username}</li>
            </ul>
        </div>
    )
}

export default HeaderLogin