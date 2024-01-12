import { useState, useEffect } from 'react';
import Layout from '../layout/layout';
import './register.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [visible, setVisible] = useState(false)

  const [passwordVerified, setPasswordVerified] = useState(true)

  const [accounts, setAccounts] = useState([])

  const [exists, setExists] = useState(false)

  const [prompt, setPrompt] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setPasswordVerified(false)
    } else {
      const findAccount = accounts.find((account) => account.username === username)

      if (findAccount) {
        setPrompt(true)
        setExists(true)
        navigate('/login')
        console.log(exists);
      } else {
        setExists(false)

        await axios.post('http://localhost:8000/api/accounts/create-account', {
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          role: 'user'
        })

        console.log('success register');

      }

      setPasswordVerified(true)
      setExists(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/accounts')
        setAccounts(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return (
    <Layout className='login'>
      <div className="loginContainer">
        <h1>Register</h1>
        <ul>
          <li>
            <label htmlFor="">Username</label> <br />
            <input type="text" placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
          </li>
          <li>
            <label htmlFor="">Email</label>
            <input type="text" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </li>
          <li>
            <label htmlFor="">Password</label> <br />
            <div className="passwordWrapper">
              <input type={visible ? 'text' : 'password'} placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
              <i className={`fa-solid fa-eye${visible ? '' : '-slash'}`} onClick={() => setVisible(!visible)}></i>
            </div>
          </li>
          <li>
            <label htmlFor="">Confirm Password</label> <br />
            <div className="passwordWrapper">
              <input type={visible ? 'text' : 'password'} placeholder='Confirm your password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </li>
          {!passwordVerified && (
            <p className='doNotMatch'>Passwords do not match</p>
          )}
          {exists && (
            <>
              <p className='doNotMatch'>Account already exists</p>
              {prompt && (
                <p className='promptLink' onClick={handlePrompt}>Click here to login</p>
              )}
            </>
          )}
        </ul>
        <button className="buttonWrapper">
          <button className='loginButton' onClick={handleRegister}>Register</button>
        </button>
      </div>
    </Layout>
  );
}

export default Register;
