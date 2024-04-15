import React from 'react';
import {Spinner} from "react-bootstrap";

const LoadingSpinner = ({text, variant, animation}) => {
    return (
        <div className='m-5 d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <Spinner variant={variant} animation={animation}/>
                {text && <p className='text-center'>{text}</p>}
            </div>
        </div>
    );
};

LoadingSpinner.defaultProps = {
    text: null,
    variant: 'primary',
    animation: 'border'
}

export default LoadingSpinner;