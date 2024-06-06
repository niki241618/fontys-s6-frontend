import React, {useState} from 'react';
import css from '../css/UploadBookPage.module.css';
import {Button, Col, Container, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {LuBookUp} from "react-icons/lu";
import ListOfLanguagesComponent from "./ListOfLanguagesComponent";
import ListOfGenresComponent from "./ListOfGenresComponent";
import MaxFileSizeInput from "../../components/MaxFileSizeInput";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {uploadBook} from "../../API/booksService";
import {secToMin} from "../../utils";

const UploadBookPage = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [book, setBook] = useState({ audioFile: null, coverImage: null });

    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if (form.checkValidity()) {
            const formData = new FormData();

            formData.append('name', form.elements.title.value);
            formData.append('description', form.elements.description.value);
            formData.append('language', form.elements.language.value);
            formData.append('genre',form.elements.genre.value);
            formData.append('authors',[form.elements.author.value]);
            formData.append('coverImage', book.coverImage);
            formData.append('audioFile', book.audioFile);
            formData.append('length', book.length);

            uploadNewBook(formData);
        }
        setValidated(true);
    }

    async function uploadNewBook(book) {
        setIsUploading(true);
        try {
            const response = await uploadBook(book);

            const id = response.data;
            toast.success('Book uploaded successfully!')
            navigate(`/books/${id}`)
        }
        catch (e) {
            toast.error(e.message)
        }
        finally {
            setIsUploading(false);
        }
    }

    return (
        <div className={css.wrapper}>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs={10} md={8} lg={6}>
                        <div className={css.uploadBookContainer}>
                            <Container>
                                <Row className='align-items-center'>
                                    <Col xs={1}>
                                        <LuBookUp size={22}/>
                                    </Col>
                                    <Col>
                                        <h4 className='mb-0'>Upload Book</h4>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Upload a book to share with the community</p>
                                    </Col>
                                </Row>
                                <Form onSubmit={onSubmit} noValidate validated={validated}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control name={'title'}
                                                              type="text"
                                                              placeholder="Title of the book"
                                                              required
                                                              pattern=".*\S+.*"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <InputGroup hasValidation>
                                                    <Form.Control name='description' as="textarea" rows={4}
                                                                  className={css.descriptionField}
                                                                  placeholder="Description of the book" required
                                                                  minLength={30}/>
                                                    <Form.Control.Feedback type="invalid">
                                                        Minimum 30 characters
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Author</Form.Label>
                                                <Form.Control name='author' type='text' className={css.descriptionField}
                                                              placeholder="John Doe" required/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Language</Form.Label>
                                                <Form.Select name='language' defaultValue='English' aria-label="Select Language">
                                                    <ListOfLanguagesComponent/>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Genre</Form.Label>
                                                <Form.Select name='genre' aria-label="Select Genre">
                                                    <ListOfGenresComponent/>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <MaxFileSizeInput accept='.mp3,.wav'
                                                              label='Upload Book'
                                                              text='Maximum file size: 650 MB'
                                                              maxFileSizeInMB={650}
                                                              onFileSelected={file => {
                                                                  const audioElement = new Audio(URL.createObjectURL(file));
                                                                  audioElement.addEventListener('loadedmetadata', () => {
                                                                      const duration = Math.floor(audioElement.duration);
                                                                      setBook({
                                                                          ...book,
                                                                          audioFile: file,
                                                                          length: duration
                                                                      })
                                                                    });
                                                                  }
                                                              }
                                                              className="mb-3"
                                            />
                                        </Col>
                                        <Col xs={3}>
                                            <Form.Label>Duration</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="0 seconds"
                                                value={`${secToMin(book.length || 0)} Minutes`}
                                                aria-label="Disabled input example"
                                                readOnly
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <MaxFileSizeInput accept='.jpeg,.jpg,.png'
                                                              label='Cover Image'
                                                              text='Maximum file size: 1 MB'
                                                              maxFileSizeInMB={1}
                                                              onFileSelected={img => setBook({
                                                                  ...book,
                                                                  coverImage: img
                                                              })}
                                            />
                                        </Col>
                                    </Row>
                                    <hr/>
                                    {isUploading ?
                                        <Row className='mt-3 align-items-center'>
                                            <Col>
                                                <Form.Text muted>
                                                    Please wait while we upload your book.
                                                </Form.Text>
                                                <br/>
                                                <span className='text-danger'>Do not leave this page.</span>
                                            </Col>
                                            <Col sm={2} className='d-flex justify-content-end'>
                                                <Spinner variant={'success'} animation='border'/>
                                            </Col>
                                        </Row>
                                        :
                                        <Row>
                                            <Col className='d-flex justify-content-end'>
                                                <Button type='submit' variant="success">Upload</Button>
                                            </Col>
                                        </Row>
                                    }
                                </Form>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UploadBookPage;