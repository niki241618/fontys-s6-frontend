import React from 'react';
import {FaArrowLeftLong} from "react-icons/fa6";
import {Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import css from './css/ArrowBack.module.css';

const ArrowBack = ({text, path}) => {
    const navigate = useNavigate()

    return (
        <Container className='my-2'>
            <Row>
                <Col className={css.wrapper} onClick={() => navigate(path)}>
                    <div className={css.arrowButton}>
                        <FaArrowLeftLong/>
                        <span className='ms-2'>{text}</span>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};

ArrowBack.defaultProps = {
    text: 'Back',
    path: -1
}

export default ArrowBack;