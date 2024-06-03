import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";
import {Button, Col, Container, Row} from "react-bootstrap";
import css from './css/BooksPage.module.css';
import {MdPerson} from "react-icons/md";
import {LuClock4} from "react-icons/lu";
import {secToMin} from "../utils";
import {FaStar} from "react-icons/fa";
import {IoEarth} from "react-icons/io5";
import {BiSolidCategory} from "react-icons/bi";
import ArrowBack from "../components/ArrowBack";
import AudioPlayer from "../components/AudioPlayer";
import {deleteBook} from "../API/booksService";
import {toast} from "react-toastify";
import {useAuth0} from "@auth0/auth0-react";
import useClaims from "../hooks/useClaims";

const BookPage = () => {
    const { id } = useParams();
    const { data: book, isLoading, error } = useFetch(`/audiobooks/${id}`)
    const {user} = useAuth0();
    const {hasClaim} = useClaims()


    const navigate = useNavigate()

    if(isLoading)
        return <LoadingSpinner/>

    if(error)
        return null;

    const isBookOwned = user && book.ownerId === user.sub;
    const isAdmin = hasClaim('role:admin')

    const deleteTheBook = async () => {
        try {
            await deleteBook(id);
            toast.success('Book deleted successfully');
            navigate(-1);
        }
        catch (e)
        {
            toast.error(e.message);
        }
    }

    const BookInfoRowItem = ({icon, title, text, addition, addBorder = true}) => {
        return (
            <Col style={{borderRight: addBorder ? '1px solid #ddd' : ''}}>
                <span className='text-center' style={{fontWeight: 600}}>{title}</span>
                <div className='d-flex align-items-center'>
                    <div className={'d-flex align-items-center'}>
                        {icon}
                        <span className='ms-1'>{text}</span>
                    </div>
                    {addition && <span className={css.totalRatings}>{addition}</span>}
                </div>
            </Col>
        );
    }

    return (
        <Container className={css.wrapper}>
            <ArrowBack path={-1}/>
            <Row>
                <Col md={3} className={`mb-3 mb-md-0 ${css.imageColumn}`}>
                    <img src={book.coverUri} alt={book.title} className={css.image}/>
                </Col>
                <Col className='ms-2'>
                    {/*<Row>*/}
                    {/*    <Col>*/}
                    {/*        <h2>{book.name}</h2>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    <Row>
                        <Col>
                            <div className='d-flex justify-content-between'>
                                <h2 className={css.title}>{book.name}</h2>
                                {(isBookOwned || isAdmin) && <Button variant='danger' onClick={deleteTheBook}>Delete</Button>}
                            </div>
                            <div className='d-flex align-items-center mt-1'>
                                <MdPerson size={20}/>
                                <span>{book.authors[0]}</span>
                            </div>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <BookInfoRowItem icon={<LuClock4/>} title='Duration' text={`${secToMin(book.length)} Minutes`}/>
                        <BookInfoRowItem icon={<FaStar color='#ffc107'/>}
                                         title={`Rating`}
                                         text={`${book.ratingInfo.averageRating}`}
                                         addition={`(${(book.ratingInfo.averageRating).toLocaleString().replace(/,/g, ' ')})`}/>

                        <BookInfoRowItem icon={<IoEarth/>} title='Language' text={book.language}/>
                        <BookInfoRowItem icon={<BiSolidCategory/>} title='Genre' text={book.genre} addBorder={false}/>
                    </Row>
                    <hr/>
                    <Row className={css.info}>
                        <Col>
                            <span>{book.description}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr className='mt-4'/>
            <Row className='mt-4'>
                <Col>
                    <AudioPlayer fileName={book.audioFileName}/>
                </Col>
            </Row>

        </Container>
    );
};

export default BookPage;