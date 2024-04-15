import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import logo from '../assets/logo.png'
import css from './Navigation.module.css'
import {useAuth0} from "@auth0/auth0-react";
import {MdOutlineAccountCircle} from "react-icons/md";

export default function Navigation()
{
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <Navbar className={css.nav} bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand><Link to='/'><img style={{height: '40px'}} src={logo} alt={'logo'}/></Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as='div'><Link to='/'>Browse</Link></Nav.Link>
                    <Nav.Link as='div'><Link to='/upload'>Upload</Link></Nav.Link>
                    {/*{isAuthenticated && }*/}
                </Nav>
                <Nav>
                    <div onClick={loginWithRedirect} className={css.account}>
                        <MdOutlineAccountCircle size={30}/>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}