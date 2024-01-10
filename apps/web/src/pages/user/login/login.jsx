import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../../redux/loginAction';
import Layout from '../layout/layout';
import axios from 'axios';
import './login.css';

function Login() {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/accounts/login', {
                username,
                password,
            });

            const { success, findAccount, token } = response.data;

            if (success) {
                dispatch(loginSuccess(token, findAccount.username));
                if (findAccount.role === 'admin') {
                    navigate('admin-landing')
                } else {
                    navigate('/')
                }
            } else {
                console.log('LOGIN FAILED:', response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout className="login">
            <div className="loginContainer">
                <h1>Log In</h1>
                <ul>
                    <li>
                        <label htmlFor="">Username</label> <br />
                        <input type="text" placeholder="Type in your username" onChange={(e) => setUsername(e.target.value)} /> <br />
                    </li>
                    <li>
                        <label htmlFor="">Password</label> <br />
                        <div className="passwordWrapper">
                            <input
                                type={visible ? 'text' : 'password'}
                                placeholder="Type in your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className={`fa-solid fa-eye${visible ? '' : '-slash'}`} onClick={() => setVisible(!visible)}></i>
                        </div>
                    </li>
                </ul>
                <button className="forgotWrapper">
                    <button className="forgot">Forgot password?</button> <br />
                </button>
                <button className="buttonWrapper">
                    <button className="loginButton" onClick={handleLogin}>
                        Log In
                    </button>
                </button>
            </div>
        </Layout>
    )
}

export default Login;