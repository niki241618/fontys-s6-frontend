import React from 'react';
import css from './css/BookPreview.module.css'
import {FaStar} from "react-icons/fa";
import {secToMin} from "../utils";
import {LuClock4} from "react-icons/lu";

const BookPreview = ({book, onClick}) => {
    return (
        <div data-e2e-test="book-item" className={css.wrapper} onClick={onClick}>
            <div className={css.cover}>
                <img className={css.image} src={book.coverUri} alt={book.title}/>
            </div>
            <div className={css.info}>
                <span data-e2e-test='book-name' className={css.title}>{book.name}</span>
                <p data-e2e-test='book-author'>{book.authors[0]}</p>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <FaStar color='#ffc107'/>
                        <div className='d-flex align-items-center'>
                            <span data-e2e-test='book-rating' className='ms-1'>{book.ratingInfo.averageRating}</span>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <LuClock4/>
                        <span className='ms-1'>{secToMin(book.length)} Minutes</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

BookPreview.defaultProps = {
    onClick: () => {},
}

export default BookPreview;