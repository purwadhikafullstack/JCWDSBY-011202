import './layout.css'
import Footer from './footer'
import HeaderLogin from './headerLogin'

function LayoutLogin (props) {
    return (
        <div className='layout'>
            <HeaderLogin/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default LayoutLogin