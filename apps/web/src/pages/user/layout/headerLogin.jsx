import { useState } from 'react'
import { useSelector } from 'react-redux';
import './layout.css'

function HeaderLogin () {
    const[account, setAccount] = useState()
    const username = useSelector(state => state.auth.username)

    return (
        <div className="header">
            <p className='logo'>Logo</p>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>{username}</li>
            </ul>
        </div>
    )
}

export default HeaderLogin