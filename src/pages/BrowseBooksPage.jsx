import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BookPreview from "../components/BookPreview";
import {useNavigate} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";

const BrowseBooksPage = () => {

    const {data: books, isLoading, error } = useFetch('/audiobooks')
    const navigate = useNavigate()

    if(isLoading)
        return <LoadingSpinner/>

    if(error)
        return null;

    return (
        <div className={'mb-4'}>
            <Container className='mt-3'>
                <Row className='d-flex justify-content-center pt-2'>
                    <Col xs={6}>
                        {/*<InputGroup className="mb-3">*/}
                        {/*    <FormControl*/}
                        {/*        placeholder="George Orwell 1984"*/}
                        {/*        aria-label="George Orwell 1984"*/}
                        {/*        aria-describedby="basic-addon2"*/}
                        {/*    />*/}
                        {/*    <Button variant="outline-secondary" id="button-addon2">*/}
                        {/*        Search*/}
                        {/*    </Button>*/}


                        {/*</InputGroup>*/}
                    </Col>
                </Row>
                <Row className='mt-4'>
                    {
                        books.map(book => (
                            <Col key={book.id} sm={3} className={'mt-4'}>
                                <BookPreview book={book} onClick={() => navigate(`/books/${book.id}`)}/>
                            </Col>
                        ))
                    }
                </Row>
            </Container>

        </div>
    );
};

export default BrowseBooksPage;