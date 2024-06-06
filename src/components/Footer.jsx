import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import css from './css/Footer.module.css';

const Footer = () => {
    return (
        <footer className={css.wrapper}>
            <Container>
                <Row>
                    <Col>
                        <ul>
                            <li>
                                <Link to={'/privacy'}>Privacy</Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className={'justify-content-center'}>
                    <Col md={6}>
                        <hr/>
                        <p className='text-center'>© 2024 AudioBook Library</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;