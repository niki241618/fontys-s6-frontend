import React, {useState} from 'react';
import {Button, Col, Container, FormCheck, Modal, Row, Spinner} from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import {useAuth0} from "@auth0/auth0-react";
import BookPreview from "../components/BookPreview";
import {useNavigate} from "react-router-dom";
import css from './css/ProfilePage.module.css';
import {toast} from "react-toastify";
import {deleteUserAccount} from "../API/userService";

const ProfilePage = () => {

    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false)
    const [userAcceptedDeletion, setUserAcceptedDeletion] = useState(false)
    const [isDeletionLoading, setIsDeletionLoading] = useState(false)

    const {user, logout} = useAuth0();
    const {data: books, isLoading, error } = useFetch('/audiobooks/user/' + user.sub)
    const navigate = useNavigate()

    const handleDeletion = async () => {
        try {
            setIsDeletionLoading(true)
            const response = await deleteUserAccount(user.sub)
            if(response.status === 200)
            {
                await logout()
            }
            else {
                toast.error("An error occurred. Please try again.")
                console.log(response)
            }
        }
        catch (e) {
            toast.error("An error occurred. Please try again.")
            console.error(e)
        }
        finally {
            setIsDeletionLoading(false)
        }
    }

    return (
        <Container>
            <div className={`${css.section} mt-5`}>
                <Row>
                    <Col>
                        <h3>Profile</h3>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Button onClick={() => logout()} variant='outline-danger'>Logout</Button>
                        <Button onClick={() => setShowDeleteUserModal(true)} variant='danger' className='ms-2'>Delete My Account</Button>
                    </Col>
                </Row>
            </div>
            <div className={css.section}>
                <Row>
                    <Col>
                        <div className={'d-flex justify-content-between align-items-center'}>
                            <h3>My Books</h3>
                            <Button variant="success" href={"/upload"}>Upload Book</Button>
                        </div>
                        <hr/>
                    </Col>
                </Row>
                <Row>
                    {
                        !isLoading && !error && books.length > 0 && books.map(book => (
                            <Col key={book.id} sm={3}>
                                <BookPreview book={book} onClick={() => navigate(`/books/${book.id}`)}/>
                            </Col>
                        ))
                    }
                    {
                        !isLoading && !error && books.length < 1 && <div>You don't have any books yet.</div>
                    }
                </Row>
            </div>

            <Modal show={showDeleteUserModal} onHide={() => setShowDeleteUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete My Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You are about to delete your account.</p>
                    <p>This action cannot be undone!</p>
                    <p>Following the <a href={"https://gdpr-info.eu"} target={"_blank"} rel="noopener noreferrer">GDPR rules</a>, this action will <strong>delete all of your data, including the books that you have uploaded.</strong></p>
                    <hr/>
                    <FormCheck
                        type={'checkbox'}
                        label={`I understand that this action is irreversible and I want to proceed.`}
                        checked={userAcceptedDeletion}
                        onChange={(e) => setUserAcceptedDeletion(e.target.checked)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={()=> setShowDeleteUserModal(false)}>
                        Close
                    </Button>
                    {
                        isDeletionLoading ?
                        <Spinner className='mx-5' variant={'danger'}/>
                            :
                        <Button variant="danger" onClick={handleDeletion} disabled={!userAcceptedDeletion}>
                            Permanently Delete My Account
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProfilePage;