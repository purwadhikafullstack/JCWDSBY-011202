import { useState } from 'react';
import Layout from '../layout/layout';
import './register.css'

function Register() {
  const [visible, setVisible] = useState(false)
  const [passwordVerified, setPasswordVerified] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const checkPassword = () => {
    if (password !== confirmPassword) {
      setPasswordVerified(false)
    } else {
      setPasswordVerified(true)
    }
  }

  return (
    <Layout className='login'>
      <div className="loginContainer">
        <h1>Register</h1>
        <ul>
          <li>
            <label htmlFor="">Username</label> <br />
            <input type="text" placeholder='Enter your username' /> <br />
          </li>
          <li>
            <label htmlFor="">Email</label>
            <input type="text" placeholder='Enter your email' />
          </li>
          <li>
            <label htmlFor="">Password</label> <br />
            <div className="passwordWrapper">
              <input
                type={visible ? 'text' : 'password'}
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className={`fa-solid fa-eye${visible ? '' : '-slash'}`} onClick={() => setVisible(!visible)}></i>
            </div>
          </li>
          <li>
            <label htmlFor="">Confirm Password</label> <br />
            <div className="passwordWrapper">
              <input
                type={visible ? 'text' : 'password'}
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </li>
          {!passwordVerified && (
            <p className='doNotMatch'>Passwords do not match</p>
          )}
        </ul>
        <button className="buttonWrapper">
          <button className='loginButton' onClick={checkPassword}>Register</button>
        </button>
      </div>
    </Layout>
  );
}

export default Register;
