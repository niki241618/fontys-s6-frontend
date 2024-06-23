import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import logo from '../assets/logo.png'
import css from './Navigation.module.css'
import {useAuth0} from "@auth0/auth0-react";
import {MdOutlineAccountCircle} from "react-icons/md";

export default function Navigation()
{
    const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    return (
        <Navbar className={css.nav} bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand><Link to='/'><img style={{height: '40px'}} src={logo} alt={'logo'}/></Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as='div'><Link to='/'>Browse</Link></Nav.Link>
                    {isAuthenticated && <Nav.Link as='div'><Link to='/upload'>Upload</Link></Nav.Link>}
                    {/*{isAuthenticated && }*/}
                </Nav>
                <Nav>
                    <div onClick={async () => isAuthenticated ? navigate('/account') : loginWithRedirect()} className={css.account}>
                        <MdOutlineAccountCircle size={30}/>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}