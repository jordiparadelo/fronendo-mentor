// Components
import {Footer} from './index'

function Layout({children}) {
    return (
        <>
            {children}
            <Footer/>
        </>
    );
}

export default Layout;