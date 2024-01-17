import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './layout.css'
import icon from '../../../assets/bussinesman.png'

function HeaderLogin() {
    const [username, setUsername] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/accounts/keep-login', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            const { success, username } = response.data

            if (success) {
                setUsername(username)
            } else {
                console.log('set username failed');
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            handleLogin()
        } else {
            console.log('no token');
        }

    }, []);

    useEffect(() => {
        console.log('iki username ', username);
    }, [username]);

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
    );
}

export default HeaderLogin;
