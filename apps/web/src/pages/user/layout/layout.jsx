import './layout.css'
import Header from './header'
import Footer from './footer'

function Layout (props) {
    return (
        <div className='layout'>
            <Header/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default Layout