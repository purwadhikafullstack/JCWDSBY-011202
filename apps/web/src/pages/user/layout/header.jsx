import './layout.css'

function Header () {
    return (
        <div className="header">
            <p className='logo'>Logo</p>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>Log In</li>
                <li>Sign Up</li> 
            </ul>
        </div>
    )
}

export default Header